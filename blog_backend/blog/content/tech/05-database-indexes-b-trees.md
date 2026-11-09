title: Database Indexes Explained: How a B-Tree Finds One Row in a Million
date: 2026-10-12
image: blog_images/tech-btree-index.png
---
You add an index, and a query drops from 4 seconds to 4 milliseconds. It feels like magic, but it's really just a very well-designed data structure: the **B-tree**. Knowing how it works helps you decide *which* indexes to create, and why some of them never get used.

## The problem: a full table scan

Without an index, a query like this:

```sql
SELECT * FROM blog WHERE author = 'Farheen';
```

forces the database to read **every row** and check the condition. For a million rows, that's a million comparisons and potentially a lot of disk reads. This is a **sequential scan**.

## The idea: a sorted lookup structure

Think of the index at the back of a textbook. Terms are sorted alphabetically, and each points to a page number. You don't read the whole book; you jump straight to the right place.

A database index does the same: it keeps a **sorted** copy of a column's values, each pointing to the location of the full row.

## Why a B-tree, not a binary tree?

A binary search tree gives O(log₂ n) lookups, which is about 20 steps for a million rows. But each step might be a separate **disk read**, and disk reads are slow.

A **B-tree** fixes this by making each node *wide*. A node is sized to fit one disk page (typically 8 KB in Postgres) and holds hundreds of keys. So instead of a tall, skinny tree, you get a short, fat one:

```
                    [ M ]
           /                   \
     [ D  H ]                 [ R  W ]
    /   |   \               /    |    \
 [A-C][E-G][I-L]        [N-Q] [S-V] [X-Z]
```

With ~300 keys per node, a tree just **3 levels deep** can index ~27 million rows. Finding any value takes 3–4 page reads, and the top levels are almost always cached in memory anyway.

Most databases actually use a **B+ tree** variant, where all the real data pointers live in the leaf nodes, and leaves are linked to their neighbours. That linked list is what makes **range queries** fast:

```sql
SELECT * FROM blog
WHERE published_date BETWEEN '2024-01-01' AND '2024-12-31';
```

Find the first matching leaf, then walk sideways until you pass the end date.

## Composite indexes and the leftmost-prefix rule

An index on multiple columns is sorted by the first column, then the second within that, and so on, like a phone book sorted by last name, then first name.

```sql
CREATE INDEX idx_blog_category_date ON blog (category, published_date);
```

This index helps with:

- `WHERE category = 'Tech'` ✅
- `WHERE category = 'Tech' AND published_date > '2025-01-01'` ✅
- `WHERE category = 'Tech' ORDER BY published_date DESC` ✅ (no separate sort needed!)

But **not** with:

- `WHERE published_date > '2025-01-01'` ❌ (you can't use a phone book to find everyone named "Sara")

**Column order matters.** Put equality-filtered columns first, then range or sort columns.

## When indexes don't help

- **Low selectivity**: an index on a column with two values (like `is_published`) rarely helps. If the query returns 50% of the table, scanning is cheaper than jumping around.
- **Functions on the column**: `WHERE LOWER(email) = '...'` can't use a plain index on `email`. Create an **expression index** on `LOWER(email)` instead.
- **Leading wildcards**: `LIKE '%django%'` can't use a B-tree. Look at full-text search or trigram indexes.

## Indexes aren't free

Every index must be updated on each `INSERT`, `UPDATE`, and `DELETE`, and it takes disk space. A write-heavy table with ten indexes will feel it. Index for the queries you actually run, not every column "just in case".

## Doing it in Django

```python
class Blog(models.Model):
    category = models.CharField(max_length=50, db_index=True)
    published_date = models.DateTimeField()

    class Meta:
        indexes = [
            models.Index(fields=["category", "-published_date"]),
        ]
```

## Always check with EXPLAIN

Don't guess, ask the database:

```sql
EXPLAIN ANALYZE
SELECT * FROM blog WHERE category = 'Tech' ORDER BY published_date DESC;
```

Look for `Index Scan` (good) versus `Seq Scan` (maybe bad, on large tables), and compare estimated rows with actual rows. In Django, `queryset.explain()` gives you the same output.

## Going deeper: indexes that experts reach for

**Covering indexes skip the table entirely.** A normal index lookup is two steps: find the entry in the index, then fetch the row from the table (the "heap"). If the index already contains every column the query needs, the database can answer from the index alone. That's an **index-only scan**. In Postgres you can add non-key columns just for this:

```sql
CREATE INDEX idx_blog_cat_date ON blog (category, published_date DESC)
  INCLUDE (title);
```

Now a "latest Tech titles" list never touches the table.

**Partial indexes fix the low-selectivity problem.** If 98% of posts are published and you constantly query the 2% of drafts, index only those:

```sql
CREATE INDEX idx_blog_drafts ON blog (updated_at) WHERE is_published = false;
```

It's tiny, fast, and almost free to maintain. Django supports it with `models.Index(..., condition=Q(is_published=False))`.

**Random UUID keys are hard on B-trees.** With an auto-incrementing ID, every insert goes to the rightmost leaf, which stays hot in memory. With random UUIDv4 keys, each insert lands on a *random* leaf, causing page splits, half-empty pages, and cache misses all over the index. **UUIDv7** fixes this by putting a timestamp first, so new keys are roughly sorted and you keep the benefits of UUIDs without the write penalty.

**Why the planner sometimes ignores your index.** On a spinning disk or cloud volume, sequential reads are far cheaper than random ones. The planner estimates how many rows match from table statistics. If the estimate is high enough, a sequential scan really is faster. If the estimate is *wrong* (stale statistics after a bulk import), run `ANALYZE blog;` before blaming the index.

## Takeaway

A B-tree is a shallow, wide, sorted tree designed around how disks work. It turns "read everything" into "read three pages". Index the columns you filter and sort on, mind the column order in composite indexes, and let `EXPLAIN` be your guide.
