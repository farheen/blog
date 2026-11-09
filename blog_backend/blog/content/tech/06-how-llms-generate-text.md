title: How Large Language Models Generate Text, One Token at a Time
date: 2026-10-05
image: blog_images/tech-llm-tokens.png
---
Chat with an AI assistant and it can feel like it "thinks" in full sentences. Under the hood, though, a large language model (LLM) does something much simpler, repeated very many times: it **predicts the next token**. Here's a developer-friendly tour of how that works, without the heavy maths.

## Step 1: Tokenisation

Models don't see letters or words; they see **tokens**. A tokenizer splits text into frequently occurring chunks using an algorithm such as Byte-Pair Encoding (BPE):

```
"Tokenization is fascinating!"
→ ["Token", "ization", " is", " fasc", "inating", "!"]
→ [ 3404,   2065,     318,  12611,   7246,     0 ]
```

Common words become a single token; rare words get split into pieces. As a rough rule of thumb, one token is about ¾ of an English word. This is why LLM pricing and context limits are measured in tokens, and why models sometimes struggle with tasks like counting the letters in a word: they never actually saw the individual letters.

## Step 2: Embeddings

Each token ID is mapped to an **embedding**, a long vector of numbers (often thousands of dimensions). These vectors are learned during training so that tokens used in similar contexts end up near each other. The classic illustration is that `king − man + woman` lands near `queen`.

Since the model processes all tokens in parallel, it also needs to know their *order*, so **positional information** is added to each embedding.

## Step 3: The Transformer and attention

The heart of a modern LLM is the **Transformer**, introduced in the 2017 paper *"Attention Is All You Need"*. It's a stack of identical layers, and each one has two main parts.

### Self-attention

For every token, attention asks: *"Which other tokens in the context matter for understanding me?"*

Take this sentence: *"The developer fixed the bug because **it** was crashing production."* To understand "it", the model needs to connect it to "bug", not "developer".

Mechanically, each token produces three vectors:

- **Query (Q)**: what am I looking for?
- **Key (K)**: what do I contain?
- **Value (V)**: what information do I pass along?

Each token's query is compared with every other token's key (a dot product), turned into weights with a softmax, and used to blend the values together. Multiple **attention heads** do this in parallel, each free to learn a different kind of relationship (grammar, coreference, topic, and so on).

In a text-generating model, attention is **causal**: a token can only look at tokens *before* it, never ahead.

### Feed-forward network

After attention mixes information *between* tokens, a small neural network processes each token *individually*. This is where much of the model's stored "knowledge" is thought to live.

Stack dozens of these layers, and the representation of each token becomes richer and more context-aware as it rises through the network.

## Step 4: Predicting the next token

At the top, the final vector for the **last** token is projected onto the whole vocabulary, producing a score (logit) for every possible next token. A softmax turns those scores into probabilities:

```
"The capital of France is"
→  " Paris"   92.1%
→  " a"        2.3%
→  " the"      1.8%
→  ...
```

## Step 5: Sampling, and the loop

The model now *chooses* a token. Some common knobs:

- **Temperature**: low values (e.g. 0.2) make output focused and deterministic; high values (e.g. 1.0+) make it more varied and creative.
- **Top-p (nucleus) sampling**: only sample from the smallest set of tokens whose probabilities add up to *p* (say 0.9), which cuts off the long tail of unlikely tokens.

The chosen token is appended to the input, and the **whole process repeats** for the next token, and the next, until the model emits a stop token or hits a length limit. This loop is why responses *stream* in word by word.

To make it fast, implementations use a **KV cache**: the keys and values of previous tokens are stored, so each new step only computes attention for the newest token instead of reprocessing everything.

## How does it get so good?

1. **Pre-training**: the model learns next-token prediction on an enormous corpus of text. Predicting text well turns out to require learning grammar, facts, reasoning patterns, and code.
2. **Fine-tuning**: it's then trained on curated examples of helpful conversations.
3. **Reinforcement learning from feedback**: responses are rated (by humans, or by other models guided by written principles), and the model is tuned toward the preferred ones.

## Going deeper: why LLMs behave the way they do

**Prefill vs. decode explains the "pause, then stream" feel.** Generation has two phases. In *prefill*, the model processes your whole prompt at once, in parallel. That's limited by raw compute, and it's what you wait for before the first word appears (time to first token). In *decode*, it produces one token at a time, and each step must read all the model's weights plus the KV cache from GPU memory. That phase is limited by **memory bandwidth**, not compute, which is why output speed is quoted as tokens per second.

**Long context isn't free.** Attention compares every token with every other token, so its cost grows roughly with the *square* of the context length. The KV cache also grows linearly with every token in the conversation. This is why long prompts cost more, why providers offer **prompt caching** (reusing the prefill of a shared prefix), and why models can be less reliable at recalling details buried in the middle of a very long context.

**Temperature 0 isn't perfectly deterministic.** Even with greedy decoding, GPU arithmetic on floating-point numbers can produce slightly different results depending on how requests are batched together. When two tokens are nearly tied, a tiny difference can flip the choice, and the rest of the response diverges from there.

**Speculative decoding: guess fast, verify in bulk.** A small "draft" model quickly proposes several tokens, and the big model checks them all in a *single* parallel pass, keeping the ones it agrees with. Since checking is cheap compared to generating, this can speed output up several times without changing the final result.

## Why this matters for developers

- **Context windows are finite.** Everything (system prompt, chat history, documents) has to fit, measured in tokens.
- **Models can be confidently wrong.** They produce *plausible* continuations, so grounding them with retrieved documents (RAG) and verifying their output matters.
- **Prompting works because of attention.** Clear instructions and good examples literally change what the model attends to.

## Takeaway

An LLM is a giant function that, given a sequence of tokens, outputs a probability for every possible next token. Tokenise, embed, pass through many layers of attention and feed-forward networks, pick a token, repeat. The surprising part isn't the mechanism. It's how much capability emerges from doing that one simple thing at massive scale.
