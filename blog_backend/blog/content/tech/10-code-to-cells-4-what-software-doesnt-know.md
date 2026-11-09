title: From Code to Cells, Part 4: What Software Doesn't Know About Medicine
date: 2026-11-08
image: blog_images/tech-code-to-cells-4.png
---
In Part 3, I celebrated how much of a software engineer's toolkit transfers into biomedical engineering. This part is the necessary counterweight. Some of the instincts that made me successful in software were exactly wrong for medicine. Learning to unlearn them was the most humbling, and most valuable, part of the whole transition.

*Series: [1] The Plateau · [2] Wandering Across Disciplines · [3] What Software Already Knows · **[4] What Software Doesn't Know** · [5] Building the Bridge*

## Lesson 1: "Move fast and break things" breaks people

Software culture celebrates speed: ship early, iterate, roll back if needed. In medicine, the "thing" that breaks might be a person, and you can't roll back a missed diagnosis.

That's why software that diagnoses, monitors or treats patients is often regulated as a medical device in its own right, known as **Software as a Medical Device (SaMD)**. Regulators such as the US FDA and the EU's Medical Device Regulation (MDR) expect manufacturers to follow recognised standards, including:

- **IEC 62304:** the life cycle for medical device software: planning, requirements, architecture, implementation, verification, release and maintenance.
- **ISO 14971:** risk management: identifying hazards, estimating risks, and showing how each one is controlled.
- **ISO 13485:** the quality management system the whole organisation operates under.

IEC 62304 also sorts software into **safety classes** based on the worst harm a failure could contribute to: **Class A** (no injury possible), **Class B** (non-serious injury) and **Class C** (death or serious injury). The higher the class, the more rigour each activity requires.

At first, I saw all this as bureaucracy. Then I read it properly, and realised it's mostly **excellent engineering practice, written down and enforced**: traceability from each requirement to its design, its tests and the risks it mitigates. Most of us have worked on projects that would have been far better with half this discipline.

## Lesson 2: Every npm package is a medical-device component

Here's a detail that genuinely changed how I think about dependencies. IEC 62304 has a term for third-party software you didn't build under your own controlled process: **SOUP**, *Software Of Unknown Provenance*.

That open-source charting library? SOUP. Your web framework? SOUP. Every transitive dependency under it? Also SOUP.

For each one, you need to document what it does in your system, what its known issues are, and how you've assessed and controlled the risk if it fails. Suddenly, the casual `npm install` of a 300-dependency tree looks very different. It's the same discipline the software industry is now rediscovering under the name "software supply chain security", except medical devices have required it for years.

## Lesson 3: Accuracy is not clinical usefulness

In machine learning, we celebrate accuracy. In medicine, accuracy alone can be dangerously misleading.

Consider a screening test with **95% sensitivity** (it catches 95% of people who have the disease) and **95% specificity** (it correctly clears 95% of people who don't). Sounds excellent. Now apply it to a condition that affects **1%** of the population being screened.

Out of 10,000 people:

- 100 have the disease → the test correctly flags **95** of them.
- 9,900 don't → but 5% of them, **495** people, are wrongly flagged.

So of the 590 positive results, only 95 are real. The **positive predictive value** is about **16%**: most people told *"you might have this"* are actually healthy, and each may face anxiety, follow-up tests, and sometimes risky procedures.

The model didn't change. The **prevalence** did. This is why clinicians care about sensitivity, specificity, predictive values and, above all, whether a result **changes a clinical decision for the better**, not just whether a number on a benchmark is high.

## Lesson 4: Models learn shortcuts you never intended

Software engineers know that systems do what you *told* them to, not what you *meant*. Machine learning takes this to another level.

In a well-known 2018 study, researchers found that deep-learning models trained to detect pneumonia on chest X-rays could also identify *which hospital* an image came from, and that differences in disease rates between hospitals could inflate performance. Scanner type, image markers and even the way patients were positioned (for example, sicker patients imaged lying down with portable machines) can all become shortcuts that look like intelligence on a test set and fail in a new hospital.

The engineering lessons:

- **External validation** on data from other sites and populations is essential, not optional.
- **Dataset lineage** (Part 3's DICOM versioning problem) becomes a safety issue.
- **Monitoring after deployment** matters, because patient populations, scanners and clinical practice all drift over time.

Regulators are adapting too: the FDA has published guidance on **predetermined change control plans**, which let manufacturers describe in advance how an AI model will be updated and validated after approval, instead of treating every retrain as an entirely new device.

## Lesson 5: Bias can live in the hardware

Remember the light-based pulse sensors from Part 2? Research published in the *New England Journal of Medicine* in 2020 found that pulse oximeters overestimated blood-oxygen levels more often in Black patients than in white patients, meaning dangerously low oxygen levels were missed more often.

The cause wasn't a bug in the code. It was in the physics and in the data: how light interacts with skin pigmentation, and which people were included when the devices were calibrated. For an engineer, it's a sobering reminder that **fairness has to be designed in from the sensor upward**, and that "it works on our test group" means nothing if the test group doesn't look like the people who will use it.

## Lesson 6: Biology is not deterministic

Software trains you to expect that the same input gives the same output. Bodies don't work like that.

A "normal" resting heart rate varies widely between healthy adults. Blood pressure changes with posture, time of day, caffeine, stress, and even the act of being measured by a doctor, a well-documented phenomenon called **white-coat hypertension**. Drugs affect people differently based on genetics, age, weight and other medications.

So you have to start thinking in **distributions, ranges and uncertainty** rather than single correct answers. Good biomedical software doesn't just output a number. It communicates confidence, flags poor-quality input (a noisy signal, a misplaced sensor), and knows when to say *"I can't tell. Ask a human."*

## Lesson 7: The user is a clinician under pressure

Finally, the users. A clinician may be making a decision in seconds, at the end of a twelve-hour shift, with three other alarms going off. A beautiful dashboard full of numbers can make things *worse*.

**Usability is a safety requirement.** The relevant standard here is **IEC 62366**, which applies usability engineering to medical devices: understanding real use environments, foreseeable mistakes, and testing designs with representative users. Coming from consumer software, where a confusing button costs a conversion, this was a powerful shift. Here, a confusing button can cost a dose.

## Being a beginner again

The emotional side of this phase deserves honesty. After fifteen years as the person with answers, it's uncomfortable to sit in a room with clinicians and not understand half the vocabulary.

What helped most:

- **Ask the "obvious" questions.** Clinicians usually enjoy explaining their work, and the obvious questions are often where engineering assumptions hide.
- **Shadow real workflows** whenever possible. Watching ten minutes of a real ward round teaches more than ten hours of reading requirements.
- **Treat regulation as a teacher**, not an obstacle. Each requirement exists because something once went wrong.

## What's next

Knowing what transfers and what doesn't, how do you actually make the move? In **Part 5**, the final part, I'll share a structured learning path, practical projects you can start this month, and why this combination of skills becomes such a powerful niche.

## Takeaway

Medicine raises the stakes on everything software engineers think they know. Regulation encodes hard-won lessons, accuracy depends on context, models and sensors can carry hidden bias, biology is uncertain, and usability is safety. Unlearning a few software instincts doesn't diminish your experience. It's what makes that experience trustworthy in a place where it truly matters.
