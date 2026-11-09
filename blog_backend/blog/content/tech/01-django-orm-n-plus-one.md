title: The N+1 Query Problem: Why Your Django Page Is Secretly Making 200 Database Calls
date: 2026-11-09
image: blog_images/tech-n-plus-one.png
---
Your Django view looks innocent. It fetches a list of blog posts, loops over them in a template, and prints each author's name. Locally it's instant. In production, with a few hundred rows and a database on another machine, the page takes three seconds. The culprit is almost always the same thing: the **N+1 query problem**.

## What's actually happening

Django's ORM is *lazy*. When you write:

```python
posts = Post.objects.all()
```

no SQL runs yet. The query only executes when you iterate. That part is great. The trouble starts with related objects:

```python
for post in posts:
    print(post.author.name)
```

The first line of the loop triggers **one** query to get all posts. But `post.author` is a foreign key, and Django doesn't know you'll need it, so it fetches each author *on demand*, one query per post. With 200 posts, that's 1 + 200 = **201 queries**. Hence the name: N+1.

Each query might take only 2 ms, but add network latency to a hosted Postgres instance and you're quickly into seconds.

## How to see it

You can't fix what you can't see. Three easy ways to spot it:

1. **django-debug-toolbar**: shows every query per request, with duplicates highlighted.
2. **`connection.queries`** in the shell (with `DEBUG=True`):

```python
from django.db import connection, reset_queries
reset_queries()
list(p.author.name for p in Post.objects.all())
print(len(connection.queries))
```

3. **`assertNumQueries`** in tests, which is my favourite because it stops regressions:

```python
def test_post_list_is_efficient(self):
    with self.assertNumQueries(2):
        self.client.get("/api/posts/")
```

## The fix: tell Django what you need up front

### `select_related` for foreign keys and one-to-one

```python
posts = Post.objects.select_related("author")
```

This adds a SQL `JOIN`, so posts and authors come back in a **single query**. Use it when following a relationship that points to *one* object.

### `prefetch_related` for many-to-many and reverse foreign keys

```python
posts = Post.objects.prefetch_related("tags")
```

A JOIN here would multiply rows (one per tag), so Django instead runs **one extra query** for all tags matching the post IDs, then stitches the results together in Python. That's 2 queries total, regardless of N.

### `Prefetch` objects for control

Need only published comments, ordered by date?

```python
from django.db.models import Prefetch

posts = Post.objects.prefetch_related(
    Prefetch(
        "comments",
        queryset=Comment.objects.filter(is_published=True).order_by("-created_at"),
    )
)
```

## The Django REST Framework trap

DRF makes this especially easy to miss. A nested serializer like this:

```python
class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    tags = TagSerializer(many=True)
```

will happily trigger N+1 for *both* fields. The serializer has no idea how the queryset was built. Fix it in the view:

```python
class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.select_related("author").prefetch_related("tags")
```

## Other quick wins

- **`.only()` / `.defer()`**: skip loading big text columns (like full blog content) on list pages.
- **`.values_list("id", flat=True)`**: when you just need IDs, don't build model instances at all.
- **`.exists()` instead of `len(qs) > 0`**: the database stops at the first match.
- **`.count()` instead of `len(qs)`**: a `COUNT(*)` beats pulling every row into memory.

## Going deeper: the traps that survive the "fix"

Adding `prefetch_related` isn't the end of the story. These are the cases that catch even experienced Django developers:

**1. Filtering a prefetched relation throws the cache away.**

```python
posts = Post.objects.prefetch_related("comments")
for post in posts:
    post.comments.filter(is_published=True)  # new query, every time!
```

The prefetch cache only answers `post.comments.all()`. Any `.filter()`, `.order_by()` or `.count()` on the manager builds a *new* queryset and goes back to the database. Push the filter into a `Prefetch(..., queryset=...)`, or filter in Python: `[c for c in post.comments.all() if c.is_published]`.

**2. Counting is a different problem.** If you only need "3 comments" on a card, don't prefetch thousands of comment rows just to call `len()`. Let the database count:

```python
from django.db.models import Count
posts = Post.objects.annotate(comment_count=Count("comments"))
```

But beware: two `Count` annotations over *different* multi-valued relations in the same query multiply each other's rows and give wrong numbers. Use `Count(..., distinct=True)` or subqueries.

**3. `select_related` can be too eager.** Each JOIN widens every row. Chaining `select_related("author__profile__company__country")` onto a big list can transfer more bytes than the N+1 version did. Combine it with `.only()` to fetch just the columns you render.

**4. Nullable foreign keys become `LEFT OUTER JOIN`s**, which some planners optimise less aggressively. That's usually fine, but worth knowing when you're reading `EXPLAIN` output.

**5. Make the bug impossible, not just fixed.** Tools like `django-zen-queries` let you mark a block (like template rendering) as *query-free*, so any accidental lazy load raises an exception in development instead of silently slowing production.

## Takeaway

The ORM is a fantastic abstraction, but abstractions leak. Whenever you write a loop over a queryset that touches a related field, pause and ask: *"How many queries will this make?"* A single `select_related` can turn a 3-second page into a 30-millisecond one, and that's one of the most satisfying performance fixes in web development.
