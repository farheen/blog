title: Lodestar
image: project_images/lodestar.png
---
**An AI legal research assistant that answers only from real case law, cites every passage it uses, and checks its own citations.**

Legal chatbots have a well-known failure: they invent cases that sound real. Lodestar is designed around that risk. It never answers from memory. It first retrieves real passages from a case-law database, then generates an answer grounded only in those passages, and finally verifies every citation and quotation before the lawyer sees it.

### How it works

**Ingest → Retrieve → Answer → Verify**

- **Ingest:** tens of thousands of court opinions from the Caselaw Access Project, extended with newer opinions from CourtListener. Each case keeps its majority, concurring and dissenting opinions, its citations, and every case it cites.
- **Hybrid retrieval:** keyword search (BM25) and semantic embedding search are merged with Reciprocal Rank Fusion, with an optional cross-encoder re-ranker. Cases the question names or cites are pinned first, and authorities cited by several top results are promoted, since that is usually the leading case on the point.
- **Grounded answers:** Claude receives numbered passages and must cite each one it relies on, quote only verbatim, and say so when the passages don't answer the question. Answers stream in live.
- **Automatic verification:** every cited case is checked against the database, every passage reference must exist, and every quotation must appear word for word. Anything that fails is highlighted in red.
- **Treatment signals:** the case viewer shows how often later cases cite a decision and flags nearby language such as "overruled" or "abrogated", as a prompt to check a full citator.

### Built for real legal work

- Filters by jurisdiction, court and date range
- Secure sign-in with lockout after repeated failed attempts, plus an audit log
- An option to keep confidential question text out of logs, because questions can contain client confidences
- A retrieval evaluation suite (recall@8 and MRR on expert-style questions), so every search change is measured rather than guessed
- An automated test suite and Docker deployment

### Tech stack

Python · FastAPI · SQLite FTS5 · FAISS · Sentence Transformers · Claude API · Server-Sent Events · Docker · pytest

### The journey

Lodestar began as a PyTorch and BERT prototype for understanding legal text. It evolved into a retrieval-augmented system once it became clear that, in law, **being verifiably right matters more than sounding fluent**.

*Lodestar is a research aid, not legal advice. The source code is private; I'm happy to walk through the design on request.*
