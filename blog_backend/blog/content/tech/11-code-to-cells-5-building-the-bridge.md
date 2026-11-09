title: From Code to Cells, Part 5: Building the Bridge to a Biomedical Niche
date: 2026-11-09
image: blog_images/tech-code-to-cells-5.png
---
Curiosity got me started, but structure got me moving, and slowly. This was never a leap. It was a transition measured in years, with one foot firmly in software the whole time. In this final part of the series, I want to turn the story into something practical: what that slow transition actually looks like, a deliberate learning path, projects you can start with free data this month, the roles where software-plus-biomedical skills are most valuable, and why this combination makes such a powerful niche for an experienced technologist.

*Series: [1] The Plateau · [2] Wandering Across Disciplines · [3] What Software Already Knows · [4] What Software Doesn't Know · **[5] Building the Bridge***

## From T-shaped to π-shaped

You've probably heard of **T-shaped** professionals: broad general knowledge across many areas (the horizontal bar) plus deep expertise in one (the vertical stem). Fifteen years in software usually produces a strong T.

Moving into biomedical engineering adds a *second* deep stem, making you **π-shaped**: deep software engineering *and* real understanding of a medical domain, connected by your broad base.

Why does that matter? Because most teams in this field are split between two groups who struggle to understand each other: clinicians and scientists on one side, and engineers on the other. A person who can stand in both worlds, translating clinical needs into robust systems and engineering constraints into clinical language, is rare and disproportionately valuable.

## A transition measured in years, not months

The internet loves dramatic career-change stories: *"I quit my job and six months later I was a ..."* Mine looks nothing like that, and I think that's the healthier model for an experienced engineer with responsibilities.

The slow path moves through **bridge roles**, each one a small step from the last:

1. **Software engineer, curious on the side.** Same job, same title. The change is in what you read, what you build at weekends, and the questions you ask. This stage can last a year or more, and that's fine.
2. **Software engineer on a health-adjacent product.** You move to a team or company that touches health: a fitness app, an insurance platform, a hospital scheduling system, a pharmacy backend. Your daily work is still mostly familiar software, but now you're surrounded by domain vocabulary and domain people.
3. **Software engineer in health tech.** You join a company building clinical software, a medical device or a health data platform. You learn regulation and validation by living them, while your engineering experience keeps you valuable from day one.
4. **The niche.** Over time, your domain knowledge becomes as deep as your engineering. People start coming to you specifically because you understand both, and the niche has formed almost without you noticing.

Each step is a **reversible** move. If health tech turns out not to suit you, stage 2 is still a perfectly good software job. That's what makes the slow path sustainable: you never bet everything on a single jump, and you keep earning, learning and testing your interest at every stage.

It also means the transition doesn't need a dramatic start date. Looking back, I can't point to the day I "moved into biomedical engineering". I can only see that, year by year, the balance of my work and curiosity tilted further toward it.

## The learning path that worked for me

I didn't quit my job and enrol full-time. I built the bridge in layers, alongside work, and the layers overlapped for years rather than running neatly one after another. Treat the order below as a rough sequence, not a schedule.

### Layer 1: The language of the body

You can't build good tools for a cardiologist if you don't know what a QRS complex is. Start with **human physiology**, focusing on the systems most relevant to technology:

- The **cardiovascular system** (ECG, blood pressure, blood oxygen)
- The **nervous system** (EEG, nerve signals, brain imaging)
- The **respiratory system** (ventilation, breathing patterns)

Free university courses and introductory textbooks are perfect here. The goal isn't to become a doctor. It's to understand the vocabulary and the *why* behind the measurements.

### Layer 2: Maths with a purpose

Revisit the maths you may have skipped or forgotten, but anchored to real signals:

- **Signals and systems:** sampling, Fourier transforms, frequency response, filtering. Everything in Part 3's ECG pipeline lives here.
- **Probability and biostatistics:** distributions, hypothesis testing, confidence intervals, sensitivity and specificity, survival analysis.
- **Basic linear algebra** for imaging and machine learning.

It's remarkable how much more sense a Fourier transform makes when it's separating your heartbeat from power-line hum.

### Layer 3: Build real things with real data

This is where experienced engineers shine. Some excellent free resources:

- **PhysioNet:** a large, open collection of physiological recordings. The **MIT-BIH Arrhythmia Database** is the classic starting point for ECG work, with expert-annotated heartbeats you can test against.
- **MIMIC:** detailed, de-identified intensive-care data from a large US hospital. Access requires completing a short research-ethics course and agreeing to a data-use agreement, which is itself a good introduction to how health data must be handled.
- **The Cancer Imaging Archive (TCIA):** public medical-imaging collections in DICOM format.
- **Public FHIR test servers and synthetic patient generators** such as **Synthea**, which creates realistic but entirely fictional patient records.

Project ideas, in increasing order of ambition:

1. **Heartbeat detector:** implement R-peak detection on MIT-BIH, then measure its sensitivity and positive predictive value against the expert labels. Study where it fails.
2. **DICOM pipeline:** build a tool that ingests a public imaging collection, anonymises it properly (including checking for burned-in text), normalises it and stores it with full lineage.
3. **FHIR app:** generate synthetic patients with Synthea, load them into a FHIR server, and build a small dashboard showing a patient's vital-sign trends.
4. **Wearable experiment:** record your own PPG or ECG with an affordable open hardware kit and compare it against a consumer device. Document the noise, motion artifacts and disagreements.

Write about each project publicly. That body of work becomes your portfolio, and it proves you understand both the engineering *and* the domain.

### Layer 4: Learn the rules (ongoing)

Read, properly and at least once, the core ideas behind **IEC 62304**, **ISO 14971** and the FDA's materials on **Software as a Medical Device**, as introduced in Part 4. Learn the basics of health-data privacy laws relevant to your country, such as HIPAA in the United States, GDPR in Europe, or India's Digital Personal Data Protection Act.

Few engineers bother to do this before their first job in the field, which makes it a genuine differentiator.

### Layer 5: Find your people (ongoing)

The best insights came from conversations, not courses:

- **University biomedical engineering departments** often welcome experienced engineers as collaborators on research projects.
- **Health-tech meetups, hackathons and conferences** bring clinicians and engineers into the same room.
- **Open-source medical software** projects (in imaging, signal processing and health data standards) are always looking for skilled contributors.

Every conversation with a clinician teaches you what problems actually matter, and which ones only *seem* interesting from the outside.

### Optional: Formal study

A certificate or master's in biomedical engineering, health informatics or medical physics isn't required for many roles, but it can open doors, especially in research, regulated device companies, or countries where formal credentials carry more weight. My advice: **build projects first**. They'll tell you whether you need formal study, and which specialisation to pick if you do.

## Where the niche is

Here are the roles where a seasoned software engineer with biomedical understanding is especially valuable:

- **Medical AI engineering:** taking models from research notebooks to validated, monitored, regulated products.
- **Medical device software:** firmware and applications for monitors, pumps, imaging systems and implantables, built under IEC 62304.
- **Wearables and remote patient monitoring:** combining embedded constraints, signal quality and scalable cloud backends.
- **Health data platforms and interoperability:** FHIR-based architectures that connect hospitals, labs and apps securely.
- **Research software engineering:** turning lab scripts into reproducible, tested, shareable pipelines.
- **Quality, regulatory and safety engineering:** bridging engineering teams and regulators, where people who truly understand software are scarce.

## Advice for anyone standing where I stood

1. **Don't undersell your experience.** Architecture, testing, debugging and shipping are exactly what many biomedical teams lack.
2. **Go slowly, on purpose.** Side projects, reading and conversations first, then bridge roles. Years, not months, and every step reversible. Slow isn't a lack of commitment; it's how the knowledge compounds.
3. **Choose one sub-domain.** "Biomedical" is huge. Pick cardiology signals, imaging, neurotech or health data, and go deep before going broad.
4. **Be a beginner, out loud.** Your willingness to ask basic questions is what earns clinicians' trust.
5. **Respect the rigour.** Regulation and validation are not obstacles to good engineering. They *are* good engineering, with higher stakes.
6. **Remember why.** On the hard days, it helps to know that *"it works"* might mean someone's heart condition was caught early.

## Closing the series

Five parts ago, I described the quiet plateau that arrives after fifteen years in software. Looking back, that plateau wasn't the end of growth. It was an invitation to grow *across* instead of only *up*.

Interdisciplinary curiosity isn't a distraction from a technology career. For many of us, it's the most meaningful chapter. Mine sits where code meets the human body, and I'm only just getting started.

## Takeaway

Build the bridge slowly, through reversible bridge roles, and in layers: physiology, purposeful maths, real projects with open data, regulation, and people. Do it alongside your work over years, document everything publicly, and choose a focused sub-domain. The result is a rare π-shaped profile, and a career where your engineering experience directly helps people stay well.
