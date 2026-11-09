title: useEffect Demystified: Dependency Arrays, Stale Closures, and Infinite Loops
date: 2026-10-26
image: blog_images/tech-useeffect.png
---
`useEffect` is probably the most-used and most-misunderstood hook in React. Once you understand the one mental model behind it, most of the bugs it causes become obvious. Here's that model, plus the four bugs I see most often.

## The mental model: synchronisation, not lifecycle

Forget `componentDidMount` and `componentDidUpdate`. An effect says:

> "After rendering, keep *this outside thing* in sync with *these values*."

The dependency array is the list of "these values". React compares each one with its value from the previous render (using `Object.is`), and re-runs the effect if anything changed.

```jsx
useEffect(() => {
  document.title = `${count} new messages`;
}, [count]);
```

- **No array**: runs after *every* render.
- **`[]`**: runs once after the first render (and cleans up on unmount).
- **`[a, b]`**: runs when `a` or `b` changes.

## Bug #1: the infinite loop

```jsx
const [blogs, setBlogs] = useState([]);

useEffect(() => {
  fetch("/api/blog/")
    .then((r) => r.json())
    .then((data) => setBlogs(data));
}); // ← no dependency array!
```

Render → effect runs → `setBlogs` → re-render → effect runs again → forever. Add `[]` so it only fetches once.

A sneakier version uses an object or function as a dependency:

```jsx
const filters = { category: "Tech" }; // new object every render!

useEffect(() => {
  fetchBlogs(filters);
}, [filters]); // always "changed", so it loops
```

Objects are compared by *reference*, and a new object literal is created on every render. Fix it by depending on primitives (`[filters.category]`), moving the object outside the component, or wrapping it in `useMemo`.

## Bug #2: the stale closure

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // `count` is always 0 here!
  }, 1000);
  return () => clearInterval(id);
}, []);
```

The counter goes to 1 and stops. Why? The effect ran once, and its callback *closed over* the `count` from the first render, which was `0`. Every tick computes `0 + 1`.

The fix is a **functional update**, which always receives the latest state:

```jsx
setCount((c) => c + 1);
```

This is exactly why the `react-hooks/exhaustive-deps` ESLint rule exists. It would have flagged the missing `count` dependency. Don't silence that rule; it's almost always right.

## Bug #3: forgetting cleanup

Effects that subscribe to something must unsubscribe:

```jsx
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);
```

Without the returned cleanup function, every remount adds *another* listener. In development, React 18+ **Strict Mode deliberately mounts, unmounts, and remounts** components to surface exactly this kind of bug. If your effect breaks when run twice, it's missing a cleanup.

## Bug #4: race conditions when fetching

Imagine a blog page that fetches by `id`. The user clicks post 1, then quickly post 2. If the response for post 1 arrives *last*, the page shows the wrong post.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/blog/${id}/`, { signal: controller.signal })
    .then((r) => r.json())
    .then(setBlog)
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

  return () => controller.abort();
}, [id]);
```

When `id` changes, the cleanup aborts the in-flight request before the new one starts, so stale responses never land.

## You might not need an effect

Many effects shouldn't exist at all:

- **Derived data**: don't store `filteredBlogs` in state and sync it with an effect. Just compute it during render: `const techBlogs = blogs.filter((b) => b.category === "Tech");`
- **Responding to events**: if something happens because the user clicked a button, put that logic in the click handler, not in an effect watching state.
- **Data fetching at scale**: libraries like TanStack Query or SWR handle caching, deduplication, retries, and race conditions for you.

## Going deeper: what the docs mention only in passing

**Effects run after paint.** React commits the DOM, the browser paints, and *then* `useEffect` runs. If your effect measures an element and repositions it (tooltips, popovers), the user can see a one-frame flicker. `useLayoutEffect` runs *before* paint, at the cost of blocking it, so use it only for measure-then-mutate work.

**The "I want the latest value but don't want to re-run" problem.** Say you log analytics when a chat room connects, and the log includes the current theme. Putting `theme` in the deps reconnects the room on every theme change, but leaving it out gives you a stale theme. React's answer is `useEffectEvent`: a function that always sees the latest props and state but isn't a dependency.

```jsx
const onConnected = useEffectEvent(() => {
  logVisit(roomId, theme); // always the current theme
});

useEffect(() => {
  const conn = connect(roomId);
  conn.on("connected", onConnected);
  return () => conn.disconnect();
}, [roomId]); // theme changes no longer reconnect
```

**Resetting state when a prop changes? Use `key`, not an effect.** A common pattern is an effect that clears a comment box when `postId` changes. It works, but it renders once with stale state first. Instead:

```jsx
<CommentBox key={postId} postId={postId} />
```

A new `key` tells React this is a *different* component instance, so all its state starts fresh, with no effect and no extra render.

**Dependencies are compared with `Object.is`.** That means `NaN` equals `NaN` (no loop), but `0` and `-0` are different. More practically, any array, object or function created during render is "new" every time. If you find yourself wrapping half your component in `useCallback` just to calm an effect, it's usually a sign the logic belongs in an event handler instead.

## Takeaway

Think of `useEffect` as *synchronising with something outside React*. Be honest in your dependency array, always clean up after yourself, and before writing an effect, ask whether plain render-time code would do the job.
