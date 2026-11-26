# akashtrehan.com

Source for my personal blog — experiences, projects, and CTF write-ups.

**Live site:** [www.akashtrehan.com](https://www.akashtrehan.com)

Built with [Jekyll](https://jekyllrb.com/) and deployed to GitHub Pages via GitHub
Actions.

## Local development

Requires Ruby 3.4+ and [Bundler](https://bundler.io/).

```sh
bundle install    # install gems
npm run dev       # serve at http://localhost:3000 with live reload
```

`npm run dev` wraps `bundle exec jekyll serve --livereload --drafts`, so Node isn't
required to develop locally.

## Build & test

```sh
npm run build     # build the site into _site/
npm test          # build + link-check with html-proofer
```

## Series

A multi-part series is one file in `_series/` plus two lines of front matter in each
of its posts. Each post then gets a box listing every part and a card for the next
one, its cards on the listing pages get a label, and the series gets a page at
`/series/<file name>/`.

`_series/my-series.md`:

```yaml
---
title: My Series
links:                 # optional, shown on the series page
  - title: Companion sample on GitHub
    url: https://github.com/...
    icon: fab fa-github
planned:               # optional, parts that are not written yet
  - part: 2
    title: The second part
    blurb: One line about it.
unit: Level            # optional, default "Part"
show_total: false      # optional, drops the "of N"; for open-ended series
---

Intro shown at the top of the series page.
```

In each post:

```yaml
series: my-series      # the file name in _series/
series_part: 1
```

- Parts are ordered by `series_part`, not by date.
- A planned part disappears once a post has the same `series_part`.
- `series_title` on a post gives it a shorter name in the box.
- `bundle exec rake test`, which CI runs, fails on an unknown `series`, a
  `series_part` that is not a whole number, or two posts sharing one.
