# kasetron.github.io

A [Hugo](https://gohugo.io/) site with two goals:

1. **Learn Hugo** (layouts, page bundles, archetypes, image processing, deploy with GitHub Actions).
2. **Document my electronics and DIY projects**, mainly a self-built modular synthesizer made largely from salvaged parts.

Live: <https://kasetron.github.io>

## Layout

```
hugo.toml                     site settings
content/modules/NN-name/      a module: index.md + photos/ + schematics/ (PDF)
content/demos/<name>/         audio/video demos
content/workshop/<name>/      side projects (repairs, cases, panels)
archetypes/                   templates used by `hugo new`
layouts/  assets/             HTML templates and CSS
archive/NN-name/kicad/        KiCad projects (backed up in git, not published)
archive/NN-name/third-party/  third-party material: on disk only, git-ignored
.github/workflows/hugo.yml    build and deploy on every push to main
```

## Common tasks

Requires Hugo **extended** ≥ 0.147 (`brew install hugo`, `winget install Hugo.Hugo.Extended`).

```sh
hugo server -D                          # live preview on localhost:1313 (-D shows drafts)
hugo --gc --minify -d /tmp/site-check   # test build, same as CI

hugo new --kind modules modules/08-name # new module
hugo new --kind demos demos/name        # new demo
hugo new --kind workshop workshop/name  # new workshop project
```

- **Module front matter:** `status` (`planned|building|working`), `summary`, `cover` (e.g. `photos/front.jpg`), `designer`/`source`/`source_title` for the credit box (without `source` it reads "Original design").
- **Photos:** put them in `photos/` next to `index.md`; they show up in the gallery automatically, and in the text use `![caption](photos/x.jpg)`. Shrink them to ~2000 px first (`magick mogrify -resize "2000x2000>" *.jpg`); Hugo makes the thumbnails.
- **Schematics:** PDFs in `schematics/`, listed at the bottom of the page.
- **Video/audio:** YouTube (iframe) for video; mp3 in the demo folder for audio. GitHub rejects files over 100 MB.
- **New section:** create `content/<section>/_index.md`, add the link in `layouts/_default/baseof.html` and, to show it on the home page, its name in `layouts/index.html`.
- **Publish:** `git add . && git commit -m "..." && git push`. The site updates after about a minute.

## Deploy (one-time setup)

Public repo named exactly `kasetron.github.io`, then *Settings → Pages → Source: GitHub Actions*. If the first run fails because Pages was not enabled yet, re-run it from *Actions*.
