title: From Code to Cells, Part 1: The Plateau After 15 Years in Software
date: 2026-11-05
image: blog_images/tech-code-to-cells-1.png
---
Nobody warns you about the strange quiet that arrives somewhere in the second decade of a software career. You're good at your job. Production incidents no longer scare you. New frameworks take a weekend, not a quarter. And yet something has changed: the learning curve that once felt like a mountain now feels like a gentle slope. This series is about what happened when I stopped ignoring that feeling, and how it led me toward biomedical engineering. Not in one dramatic leap, but slowly, over years, one small reversible step at a time.

*This is Part 1 of a five-part series:*

1. *The Plateau After 15 Years in Software* (you are here)
2. *Wandering Across Disciplines*
3. *What Software Already Knows About Medicine*
4. *What Software Doesn't Know About Medicine*
5. *Building the Bridge to a Biomedical Niche*

## The steep years

The first ten years of a software career are a sprint up a cliff face. Every year brings a new layer:

- **Years 1–3:** syntax, tools, version control, and the shock of real codebases.
- **Years 3–6:** design patterns, databases, testing, and learning that most bugs are in the assumptions, not the code.
- **Years 6–10:** distributed systems, architecture trade-offs, mentoring others, and owning systems end to end.

In those years, being measurably better than last year is almost automatic. You can *feel* yourself growing.

## When "new" stops feeling new

Around year ten, something subtle happens. You start recognising patterns before you've finished reading the documentation:

- A new message broker? It's a log with consumers and offsets.
- A new frontend framework? State, rendering and events, arranged slightly differently.
- A new database? Let's look at its storage engine, its consistency model and its indexes.

This is mastery, and it's genuinely valuable. But it also means that most new technology is a **variation**, not a **revelation**. The marginal learning from the next framework is small.

There's a useful idea here about the *half-life of knowledge*. Framework-specific knowledge decays fast; much of what I knew about a popular JavaScript library in 2014 is useless today. But fundamentals such as data structures, networking, concurrency, statistics and systems thinking barely decay at all. After fifteen years, most of what you carry is the slow-decaying kind. That's exactly what makes you portable to other fields, although it rarely feels that way at the time.

## Three ways to respond to the plateau

I watched colleagues respond to this stage in three broad ways:

1. **Go up.** Move into management or architecture leadership, where the new challenges are people, strategy and organisations.
2. **Go deeper.** Specialise hard in one technical area, such as databases, compilers or security, until you're one of a few people who really understand it.
3. **Go sideways.** Take your engineering toolkit into a *different domain* and become the person who bridges two worlds.

None of these is better than the others. But option three is the least discussed, and in my experience the most underrated.

## The question changes

The biggest shift wasn't about skills. It was about the question I was asking.

For most of my career, the question was: ***"How do I build this?"*** At the plateau, it quietly became: ***"What is actually worth building?"***

When you can build almost anything, the choice of *what* starts to matter more than the *how*. I noticed that I was more excited by articles about pacemaker firmware, retinal-scan AI or hospital data standards than by yet another benchmark of web frameworks. The most interesting problems I was reading about weren't in tech blogs at all.

## The "adjacent possible"

There's a concept from biologist Stuart Kauffman, later popularised by author Steven Johnson, called the **adjacent possible**: at any moment, you can only reach the ideas and opportunities that are one step away from where you already stand. Each step you take opens up a new set of neighbouring possibilities.

Fifteen years of software had quietly expanded my adjacent possible. Data engineering sat next to statistics. Statistics sat next to clinical research. Machine learning sat next to medical imaging. Embedded systems sat next to medical devices. I didn't need to leap across a canyon; I just needed to take the next step and see what opened up.

Frans Johansson calls the payoff of this the **Medici effect**: breakthrough ideas tend to appear where disciplines intersect, because that's where assumptions from one field collide with problems in another. Many of the biggest recent advances in medicine, from deep-learning diagnostics to protein-structure prediction, came from exactly this kind of collision.

## Restlessness is data

If you're at this stage, here's the most important thing I learned: **the restlessness is not a problem to fix. It's information.**

Pay attention to it:

- Which articles do you read all the way to the end?
- Which conference talks outside your field do you watch "just because"?
- Which problems do you find yourself explaining to friends at dinner?

For me, the answers kept pointing at the human body: how it produces signals, how we measure it, and how software could help the people who care for it.

## What's next

In **Part 2**, I'll describe how that curiosity turned into a series of small detours (through statistics, machine learning, wearables and some very personal experiences with hospitals) and how those detours eventually lined up into a direction.

## Takeaway

The plateau isn't the end of growth; it's a signal that your growth has to come from somewhere new. Fifteen years in software leaves you with deep, slow-decaying fundamentals and a much larger adjacent possible than you realise. The question is no longer whether you *can* build things. It's what you want to build them *for*.
