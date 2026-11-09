title: From Code to Cells, Part 3: What Software Already Knows About Medicine
date: 2026-11-07
image: blog_images/tech-code-to-cells-3.png
---
The biggest fear when moving into a new field after fifteen years is starting from zero. Here's the good news I discovered: in biomedical engineering, a remarkable amount of the day-to-day work is software engineering wearing a lab coat. Signals are time series. Medical images are files with metadata and pipelines. Health records are APIs. Patient safety is reliability engineering with the highest stakes imaginable. This part maps the bridges, with code.

*Series: [1] The Plateau · [2] Wandering Across Disciplines · **[3] What Software Already Knows** · [4] What Software Doesn't Know · [5] Building the Bridge*

## Bridge 1: Biosignals are streaming data

An **electrocardiogram (ECG)** records the heart's electrical activity as a voltage over time, usually sampled a few hundred times per second. To a software engineer, that's just a numeric time series. The classic first task is finding each heartbeat, specifically the tall spike called the **R-peak** inside the **QRS complex**.

Real ECGs are messy, so a typical pipeline looks like this:

1. **Remove baseline wander.** Breathing and body movement make the whole signal drift slowly up and down. A high-pass filter at around 0.5 Hz removes it.
2. **Remove power-line interference.** Mains electricity adds a hum at exactly 50 Hz (or 60 Hz, depending on the country). A narrow notch filter takes it out.
3. **Emphasise the QRS complex.** Most of a QRS's energy sits roughly between 5 and 15 Hz, so a band-pass filter helps it stand out.
4. **Detect peaks** with a minimum distance between beats, because the heart can't physiologically beat twice in 200 ms.

```python
import numpy as np
from scipy.signal import butter, filtfilt, iirnotch, find_peaks

FS = 360  # samples per second

def detect_r_peaks(ecg):
    b, a = butter(2, [5, 15], btype="bandpass", fs=FS)
    filtered = filtfilt(b, a, ecg)

    b, a = iirnotch(50, Q=30, fs=FS)
    filtered = filtfilt(b, a, filtered)

    energy = np.diff(filtered) ** 2  # sharpen steep slopes
    peaks, _ = find_peaks(
        energy,
        height=np.percentile(energy, 98) * 0.3,
        distance=int(0.2 * FS),  # refractory period: at most 300 bpm
    )
    return peaks

def heart_rate_bpm(peaks):
    rr_intervals = np.diff(peaks) / FS  # seconds between beats
    return 60 / np.mean(rr_intervals)
```

This simplified detector echoes the classic **Pan–Tompkins algorithm**, published in 1985 and still a standard reference today. Notice how familiar the concerns are: filtering noise, choosing thresholds, handling edge cases, and validating against labelled data. The time between beats (**RR intervals**) even gives you **heart-rate variability**, a widely studied indicator of stress and autonomic health.

If you've ever built a monitoring or anomaly-detection system, you already have the instincts for this work.

## Bridge 2: Medical imaging is a data-engineering problem

Every CT, MRI and X-ray in a hospital is stored and transmitted in **DICOM** (Digital Imaging and Communications in Medicine). DICOM is both a file format and a network protocol. Each file contains pixel data plus hundreds of metadata tags: patient details, scanner model, slice thickness, pixel spacing and more.

```python
import pydicom

ds = pydicom.dcmread("scan_slice_042.dcm")
print(ds.Modality)        # e.g. "CT"
print(ds.PixelSpacing)    # millimetres per pixel: vital for measuring anything
print(ds.SliceThickness)
image = ds.pixel_array    # a NumPy array, ready for analysis
```

Before any AI model can help a radiologist, engineers must solve classic data problems:

- **Anonymisation:** patient identifiers live in many tags, not just the obvious ones. Worse, some images have names or dates **burned into the pixels** themselves, so removing metadata alone isn't enough.
- **Normalisation:** CT values are in Hounsfield units, where water is 0 and air is about −1000. Different scanners and protocols produce different intensity ranges and resolutions.
- **Versioning and lineage:** which scans, from which hospitals, were used to train which model version? That question matters enormously later, as we'll see in Part 4.

This is ETL, data quality and data governance, all skills experienced engineers already have.

## Bridge 3: Health records are APIs

Healthcare interoperability has a reputation for being painful, and historically it was. But the modern standard, **HL7 FHIR** (Fast Healthcare Interoperability Resources), will look very familiar to any backend developer: REST endpoints and JSON resources.

A heart-rate measurement in FHIR is an `Observation`:

```json
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "8867-4",
      "display": "Heart rate"
    }]
  },
  "subject": { "reference": "Patient/123" },
  "effectiveDateTime": "2026-11-07T09:30:00+05:30",
  "valueQuantity": {
    "value": 72,
    "unit": "beats/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}
```

The domain knowledge is in the details: **LOINC** codes identify *what* was measured, **SNOMED CT** codes describe clinical concepts like diagnoses, and **UCUM** gives units an unambiguous machine-readable form. The engineering, though (API design, pagination, authentication with OAuth 2.0 and SMART on FHIR, schema validation, versioning), is exactly the work backend developers do every day.

## Bridge 4: Reliability engineering is patient safety

In ordinary software, an outage costs money and reputation. In clinical software, failures can harm people. But the *techniques* are the ones site-reliability engineers already know: redundancy, monitoring, alerting, graceful degradation, and careful change management.

One example shows how directly experience transfers: **alarm fatigue**. Studies of hospital monitoring have reported that a large majority of bedside alarms, in some studies well over 70%, are false or don't need action. Staff become desensitised, and real emergencies can be missed.

Any engineer who has been paged at 3 a.m. for a meaningless alert knows this problem intimately. The fixes are the same ideas we use in on-call design: smarter thresholds, combining multiple signals before alerting, suppressing duplicates, and constantly measuring which alerts are actually actionable.

## Bridge 5: Testing, traceability and reproducibility

Research code in labs is often a single script that worked once on one person's laptop. Experienced engineers bring things labs badly need:

- **Automated tests** for analysis pipelines.
- **Reproducible environments** with containers and pinned dependencies.
- **CI pipelines** that rerun analyses when data or code changes.
- **Clear documentation** and code review.

These don't sound glamorous, but they're often the difference between research that can be trusted and built on, and research that can't.

## The mindset that transfers best

Beyond specific skills, fifteen years of software builds a mental habit that's gold in biomedical work: **systems thinking**. You instinctively ask *"What happens when this fails? What are the edge cases? Who depends on this output, and what will they do with it?"* Those are exactly the questions that make medical technology safe.

## What's next

It's tempting to stop here and conclude that software engineers can simply walk into medicine. They can't. In **Part 4**, I'll cover the instincts from the software world that actively work *against* you in healthcare, and the humbling lessons about regulation, evidence and biology that every engineer in this field has to learn.

## Takeaway

You're not starting from zero. Biosignals are time series, medical images are data pipelines, health records are APIs, and patient safety is reliability engineering. Fifteen years of software gives you a powerful head start. You just need to learn the domain's vocabulary, and its stakes.
