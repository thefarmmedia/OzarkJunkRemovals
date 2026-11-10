# Writing a resource article

Create `src/content/resources/<url-slug>.md`. The page publishes at `/resources/<url-slug>/` and is added to the sitemap and the `/resources/` index automatically.

```md
---
title: What to Do With Leftover Garage Sale Items
description: Donate, sell or schedule a pickup — a practical guide for Springfield-area garage sale hosts. (max 170 chars)
published: 2027-04-01
updated: 2027-04-15        # optional
services: [junk-removal, garage-cleanouts]   # slugs from src/data/services.ts → related service cards
draft: false               # true = not built
---

Intro paragraph that answers the question directly.

## A clear H2 per sub-question

Real detail: what you've seen on jobs, local rules, photos (put images in src/assets and use Markdown images).
```

Quality bar (please keep it):
- Written from real experience: actual jobs, real photos, current local disposal rules with links to official sources.
- Answer the searcher's question in the first paragraph.
- Link to the relevant service page and to `/get-a-quote/`.
- No invented prices, statistics or customer stories.
- When the article is published, remove its title from `plannedArticles` in `src/data/resources.ts`, or keep it there; the index hides planned titles that match a published one.
