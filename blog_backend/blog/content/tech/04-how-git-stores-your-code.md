title: Inside the .git Folder: How Git Actually Stores Your Code
date: 2026-10-19
image: blog_images/tech-git-internals.png
---
Most of us use Git every day through a handful of commands (`add`, `commit`, `push`, and the occasional panicked `reset`). But underneath, Git is a surprisingly simple and elegant system: a **content-addressable key-value store** with a version-control interface built on top. Understanding it makes scary operations like rebasing and resetting much less scary.

## Everything is an object

Git stores four kinds of objects in `.git/objects`:

- **blob**: the contents of a file (no name, no permissions, just bytes)
- **tree**: a directory listing, mapping names to blobs or other trees
- **commit**: a pointer to a root tree, parent commit(s), author, and message
- **tag**: an annotated, named pointer to another object

Each object is identified by the **SHA hash of its contents**. Same content means the same hash, every time, on every machine.

## Seeing it for yourself

Make a fresh repo and look around:

```bash
git init demo && cd demo
echo "hello" > greeting.txt
git add greeting.txt
find .git/objects -type f
```

You'll see one file like `.git/objects/ce/013625030ba8dba906f756967f9e9ca394464a`. That's your blob. The first two hex characters are the folder name, which keeps directories small. Inspect it:

```bash
git cat-file -t ce0136   # → blob
git cat-file -p ce0136   # → hello
```

Now commit and inspect the commit:

```bash
git commit -m "Add greeting"
git cat-file -p HEAD
```

```
tree 4d5fc...
author Farheen <...> 1731150000 +0530
committer Farheen <...> 1731150000 +0530

Add greeting
```

And the tree it points to:

```bash
git cat-file -p HEAD^{tree}
# 100644 blob ce0136...    greeting.txt
```

That's the whole model: **commit → tree → blobs (and sub-trees)**.

## Why this design is so clever

### Deduplication for free

If 50 commits contain the same unchanged `README.md`, they all point to the *same* blob. Git doesn't store "diffs" at the object level. It stores snapshots, but identical content is shared. (For disk efficiency, Git later compresses similar objects into **packfiles** using delta compression, but that's an optimisation, not the model.)

### Integrity is built in

A commit's hash depends on its tree, which depends on every blob's hash, and it also includes the parent commit's hash. Change a single byte anywhere in history and every hash after it changes. That's why you can't quietly tamper with Git history, and why rewriting history (rebase, amend) always produces *new* commit IDs.

## Branches are just sticky notes

Here's the part that surprises people most:

```bash
cat .git/refs/heads/main
# 8f3a2b1c...
```

A branch is a **41-byte text file containing a commit hash**. That's it. Creating a branch is nearly free, which is why Git encourages branching so heavily.

`HEAD` is another tiny file, usually pointing to a branch:

```bash
cat .git/HEAD
# ref: refs/heads/main
```

When you commit, Git creates the new commit object and moves the branch file to point at it. When `HEAD` points directly at a commit instead of a branch, you're in the infamous **detached HEAD** state. It just means "new commits won't be recorded on any branch".

## Demystifying common commands

With this model, commands become easy to reason about:

- **`git commit`**: create blobs/trees for the staged content, create a commit pointing at them, move the current branch forward.
- **`git branch feature`**: write a new file in `refs/heads/` with the current commit hash.
- **`git reset --soft HEAD~1`**: move the branch pointer back one commit. Nothing is deleted.
- **`git rebase`**: replay your commits on a new base, creating *new* commit objects with new parents. The originals still exist until garbage-collected.
- **`git reflog`**: a log of where `HEAD` has pointed. It's your safety net for finding "lost" commits after a bad reset or rebase.

## Going deeper: things that surprise even daily Git users

**You can compute a hash without Git.** The ID isn't the hash of the file alone. Git hashes a small header plus the content: `blob <size>\0<content>`. So:

```bash
printf 'blob 6\0hello\n' | shasum
# ce013625030ba8dba906f756967f9e9ca394464a
```

That's exactly the hash `git add` produced earlier. Content addressing is that simple.

**Git doesn't track renames.** There's no "rename" object anywhere. When you run `git log --follow` or see `renamed:` in `git status`, Git is *guessing* after the fact by comparing blob similarity (50% by default). Rename a file *and* heavily edit it in the same commit, and Git may lose its history. Rename in one commit and edit in the next.

**Empty folders can't exist.** A tree is a list of entries pointing to blobs. A directory with no files has no entries, so there's nothing to store. That's why people commit `.gitkeep` files.

**The staging area is a real file.** `.git/index` is a binary snapshot of the next tree you're about to commit, with cached file timestamps. Those timestamps are why `git status` is fast: Git only re-hashes files whose metadata changed.

**"Deleted" commits stick around.** Unreachable objects survive until `git gc` prunes them (by default after two weeks), and reflog entries for unreachable commits last 30 days. If you rebased away something important, `git reflog` plus `git branch rescue <hash>` will get it back.

**SHA-1 is being phased out.** After researchers produced a practical SHA-1 collision in 2017, Git hardened its SHA-1 implementation against that attack and added SHA-256 repositories (`git init --object-format=sha256`). Because every object refers to others by hash, switching algorithms means rewriting every ID in the repository, which is why the migration is slow.

## Takeaway

Git is a hash-addressed object database plus some movable pointers. Commits are immutable snapshots, branches are cheap labels, and almost nothing is truly lost for at least a couple of weeks. The next time Git does something confusing, try `git cat-file -p` and `git reflog`. Peeking at the raw objects usually makes the mystery disappear.
