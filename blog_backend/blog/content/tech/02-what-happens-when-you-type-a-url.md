title: What Really Happens When You Type a URL and Press Enter
date: 2026-11-02
image: blog_images/tech-url-journey.png
---
It's the classic interview question, and for good reason: answering it well touches networking, security, operating systems, and browser internals all at once. Let's walk through what happens in the half-second between pressing Enter on `https://example.com/blog` and seeing a page.

## 1. The browser parses what you typed

First the browser decides: is this a URL or a search query? `example.com/blog` looks like a URL, so it gets normalised to `https://example.com/blog`. Many browsers also check the **HSTS preload list**, a built-in list of sites that must *only* be loaded over HTTPS, so they never even attempt plain HTTP.

## 2. DNS: turning a name into an address

Computers don't route by names, they route by IP addresses. To find the IP for `example.com`, the browser checks a chain of caches, stopping at the first hit:

1. The browser's own DNS cache
2. The operating system's cache (and `/etc/hosts`)
3. The router
4. Your ISP's (or a public) **recursive resolver**, such as `1.1.1.1` or `8.8.8.8`

If nobody has it cached, the resolver does the real work:

- Ask a **root server**: "Who handles `.com`?"
- Ask the **.com TLD server**: "Who handles `example.com`?"
- Ask example.com's **authoritative nameserver**: "What's the IP?"

The answer comes back with a **TTL** (time to live), which tells everyone along the way how long they may cache it.

## 3. Opening a connection: TCP

With an IP in hand, the browser opens a TCP connection to port 443 using the **three-way handshake**:

```
Client → SYN       → Server
Client ← SYN-ACK   ← Server
Client → ACK       → Server
```

That's one full network round trip before a single byte of real data is sent. (Newer HTTP/3 replaces TCP with **QUIC** over UDP, merging the transport and encryption handshakes to save time.)

## 4. Making it secure: the TLS handshake

Because it's `https`, the browser and server now negotiate encryption. In TLS 1.3, roughly:

1. The client sends the cipher suites it supports plus a key share.
2. The server picks a cipher, sends its own key share and its **certificate**.
3. The browser verifies the certificate chain up to a trusted **Certificate Authority**, and checks that the domain matches and the certificate hasn't expired.
4. Both sides derive the same symmetric session key, and everything from now on is encrypted.

TLS 1.3 does this in **one** round trip, down from two in TLS 1.2.

## 5. The HTTP request

Finally, the actual request:

```http
GET /blog HTTP/2
Host: example.com
User-Agent: Mozilla/5.0 ...
Accept: text/html
Accept-Encoding: gzip, br
Cookie: sessionid=abc123
```

## 6. The server side

On the other end, a lot can happen:

- A **load balancer** or CDN edge receives the request. If the CDN has a cached copy, it may answer immediately.
- Otherwise the request is forwarded to an application server (say, **Gunicorn running Django**).
- Django runs its **middleware**, matches the URL in `urls.py`, calls the view, which might query the database and render a template or serialise JSON.
- The response goes back with a status code (`200 OK`), headers (`Content-Type`, `Cache-Control`, `Set-Cookie`), and a body.

## 7. The browser renders the page

Now the browser turns bytes into pixels:

1. **Parse HTML** → build the **DOM** tree.
2. **Parse CSS** → build the **CSSOM**.
3. Discover `<script>`, `<link>`, `<img>` tags and fetch them (often in parallel, over the same HTTP/2 connection).
4. Combine DOM + CSSOM → **render tree** (only visible elements).
5. **Layout**: compute the size and position of every box.
6. **Paint**: fill in pixels for text, colours, borders, images.
7. **Composite**: layers are assembled, often on the GPU, and shown on screen.

JavaScript can interrupt this at any point. A plain `<script>` tag blocks HTML parsing until it downloads and runs, which is why `defer` and `async` exist.

## 8. And for a React app?

For a single-page app, the HTML is often a near-empty `<div id="root">`. The real content appears only after the JavaScript bundle downloads, React runs, and the components fetch their data from an API. That means *another* round of DNS, TCP, TLS, and HTTP, this time to the backend. This is why techniques like server-side rendering, code splitting, and preconnect hints matter so much for perceived speed.

## Going deeper: the details that decide real-world speed

**The 14 KB rule.** A brand-new TCP connection can't use your full bandwidth straight away. **Slow start** begins with an initial congestion window of about 10 packets (roughly 14 KB) and doubles it each round trip. If your critical HTML and inline CSS fit in that first ~14 KB, the browser can start rendering after a single round trip. At 15 KB it needs a second one. On a 200 ms mobile connection, that one extra kilobyte costs you 200 ms.

**HTTP/2 fixed head-of-line blocking, and then it came back.** HTTP/2 multiplexes many requests over one TCP connection, so a slow response no longer blocks the others *at the HTTP layer*. But TCP delivers bytes strictly in order. If one packet is lost, *every* stream waits for its retransmission. That's the real reason HTTP/3 moved to QUIC over UDP: each stream is ordered independently, so one lost packet only stalls its own stream.

**0-RTT is fast but replayable.** TLS 1.3 lets a returning client send data in its very first packet using a resumed session. The catch: an attacker who captures that packet can *replay* it. So servers should only accept 0-RTT for idempotent requests like `GET`, never for "transfer money".

**Happy Eyeballs.** Many hosts have both IPv4 and IPv6 addresses. Rather than wait for a broken IPv6 path to time out, browsers race the two, giving IPv6 a head start of about 250 ms, and use whichever connects first.

**Preconnect is free latency.** For a React app that calls an API on another domain, this one line in your HTML starts DNS, TCP and TLS while the JavaScript is still downloading:

```html
<link rel="preconnect" href="https://api.example.com" crossorigin>
```

## Takeaway

A "simple" page load involves name resolution, at least a couple of network round trips, cryptography, a server stack, and a rendering pipeline. Every performance trick, from CDNs and caching to HTTP/2 and lazy loading, is just shaving time off one of these steps.
