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
