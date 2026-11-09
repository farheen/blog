title: From Code to Cells, Part 2: Wandering Across Disciplines
date: 2026-11-06
image: blog_images/tech-code-to-cells-2.png
---
Career changes rarely begin with a decision. They begin with detours: an article you can't stop thinking about, a side project that turns out more interesting than your day job, a question that won't leave you alone. In Part 1, I described the plateau that arrives after a decade or more in software. This part is about the wandering that followed, and how a handful of unrelated curiosities slowly lined up into a direction.

*Series: [1] The Plateau · **[2] Wandering Across Disciplines** · [3] What Software Already Knows · [4] What Software Doesn't Know · [5] Building the Bridge*

## Detour 1: From dashboards to experimental design

Like many engineers, I drifted into data work: pipelines, dashboards, reports for stakeholders. At first it was plumbing. Then the questions got harder.

*"Did the new feature increase engagement, or did engagement go up because it was the holiday season?"*

To answer questions like that honestly, I had to learn about **control groups, confounding variables, selection bias and statistical power**. And here's what surprised me: this is precisely the vocabulary of **clinical research**. An A/B test is a small cousin of a randomised controlled trial. The same mistakes that make a product experiment misleading, such as stopping early when results look good or slicing data until something is "significant", are the ones that make a medical study unreliable.

Without meaning to, I'd started learning the language of evidence-based medicine.

## Detour 2: The best ML papers were about medicine

Machine learning was the next detour. I started reading papers to understand techniques, and I kept noticing that an astonishing number of the most compelling applications were medical:

- Deep-learning models reading **retinal photographs** to detect diabetic retinopathy.
- Algorithms detecting **arrhythmias** from single-lead ECGs recorded by consumer devices.
- Models assisting pathologists by scanning gigapixel **tissue slides**.
- And the landmark: **AlphaFold**, which predicted protein structures with accuracy that stunned structural biologists, and whose creators shared the 2024 Nobel Prize in Chemistry with protein designer David Baker.

What hooked me wasn't just the accuracy figures. It was the *difficulty* of the surrounding engineering: messy data from different hospitals, labels that experts disagree on, and the huge gap between "works on a benchmark" and "helps a real patient". Those were problems I knew how to think about.

## Detour 3: The device on my wrist

The third detour was literally strapped to my arm. My smartwatch reported my heart rate, blood oxygen and sleep stages. As an engineer, I wanted to know: *how does it actually know that?*

The answer is **photoplethysmography (PPG)**. The watch shines green or red/infrared light into your skin and measures how much is reflected back. With every heartbeat, the volume of blood in your capillaries changes slightly, so the amount of light absorbed changes too. The result is a faint, wave-like signal riding on top of a lot of noise.

And the noise is the interesting part:

- **Motion artifacts:** when you swing your arm while running, the sensor shifts against the skin, producing changes much larger than the pulse itself. Watches often use the accelerometer to estimate and subtract this motion.
- **Skin and physiology:** skin tone, tattoos, temperature and blood flow to the extremities all affect how light travels through tissue.
- **Placement:** a loose strap can turn a clean signal into garbage.

So that confident number on the screen is really the output of a signal-processing and estimation pipeline making its best guess. I suddenly wanted to understand that pipeline deeply, and to know when to trust it.

## Detour 4: When healthcare becomes personal

The last detour wasn't intellectual at all. Sooner or later, everyone spends time in hospitals with people they love. You sit in waiting rooms, watch monitors beep, see nurses typing the same information into multiple systems, and hear doctors say *"we're waiting for the results to come through."*

As a software person, you can't help noticing:

- Alarms going off constantly, many of which staff have learned to ignore.
- Systems that clearly don't talk to each other.
- Brilliant, overworked people fighting their tools instead of being helped by them.

Those experiences changed healthcare from an abstract "domain" into something concrete: a place where software either quietly helps people or quietly fails them.

## Connecting the dots

For a while these felt like separate interests: statistics here, machine learning there, wearables as a hobby, hospitals as life. Then I tried a simple exercise that I'd recommend to anyone feeling restless in their career.

**Keep a curiosity log.** For a month, write down:

1. Every article, talk or paper you finished *voluntarily*.
2. Every question you looked up "just because".
3. Every problem you explained to someone else with enthusiasm.

Then look for clusters. Mine was almost embarrassingly obvious: **signals from the human body, the data they produce, and the software that interprets them.** Biomedical engineering wasn't a random destination. It was where all my detours already pointed.

## Breadth before depth

One lesson from this phase: **wandering is not wasted time.** In a fast-moving industry, it's tempting to treat any learning that doesn't serve your current job as a distraction. But this wandering is how you discover which adjacent field fits *your* existing strengths and *your* genuine interests, and you need both for a career shift to last.

And give it time. My detours didn't happen in one inspired month; they were spread across several years, overlapping with demanding work and family life. That slow pace was a feature: interests that survive years of competing priorities are the ones worth building a career on.

The key is to keep the detours small and cheap: a book, an online course, a weekend project with an open dataset, a coffee with someone who works in the field. You're running experiments on your own curiosity before committing to anything.

## What's next

Once I knew where I was heading, I had to work out what I was bringing with me. In **Part 3**, I'll look at the surprising amount of biomedical engineering that is, underneath, ordinary software engineering, from ECG signal pipelines to medical-imaging formats and healthcare APIs.

## Takeaway

Interdisciplinary interest rarely arrives as a single moment of clarity. It builds from small detours that look unrelated until you step back. Follow the questions you can't stop asking, keep the experiments cheap, and look for the pattern. For me, the pattern led straight to the place where code meets the human body.
