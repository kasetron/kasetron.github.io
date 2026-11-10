# kasetron.github.io

Build log of a DIY modular synthesizer, as a [Hugo](https://gohugo.io/) site with the goal of learning how to use it.
Almost every module follows a design by [Eddy Bergman](https://www.eddybergman.com/); each page links the original article.

The folder is self-contained (no absolute paths, no external theme): copy it between machines as-is,
**including hidden files** (`.github/`, `.gitignore`).

## Contents

1. [Folder layout](#folder-layout)
2. [Set up a new machine](#set-up-a-new-machine)
3. [Preview locally](#preview-locally)
4. [Everyday tasks](#everyday-tasks): modules, photos, schematics, audio, video, demos, workshop, new sections
5. [Publish on GitHub Pages](#publish-on-github-pages-first-time)
6. [Update the live site](#update-the-live-site)
7. [Troubleshooting](#troubleshooting)

## Folder layout

```
hugo.toml                                site settings (title, URL)
content/_index.md                        home page text
content/modules/<NN-name>/index.md       a module page (markdown + front matter)
content/modules/<NN-name>/photos/        its photos (published)
content/modules/<NN-name>/schematics/    its schematic PDFs (published, listed on the page)
content/demos/<name>/                    a demo (audio/video) of one or more modules
content/workshop/<name>/                 a related project (repair, case, panels, tools)
archive/<NN-name>/kicad/                 KiCad projects: kept in git as backup, not on the website
archive/<NN-name>/third-party/           third-party images/PDFs (Bergman, MeeBilt...): on disk only, git-ignored
archetypes/                              templates used by `hugo new`
layouts/  assets/                        page templates and CSS
.github/workflows/hugo.yml               builds and publishes the site on every push
```

`public/` and `resources/` are generated: never edit them, they are git-ignored.

## Set up a new machine

1. Install **Hugo extended** (0.147 or newer):
   - Windows: `winget install Hugo.Hugo.Extended`
   - macOS: `brew install hugo`
   - Linux: distro package (check `hugo version` is recent enough) or a binary from <https://github.com/gohugoio/hugo/releases> (the file named `hugo_extended_...`).
2. Install **git**.
3. Check: `hugo version` must say `extended`.

## Preview locally

From this folder:

```
hugo server -D
```

Open <http://localhost:1313>. The page reloads on every save; stop with Ctrl+C.
`-D` also shows drafts (pages with `draft: true`).

To check that a full build works, exactly as GitHub will do it:

```
hugo --gc --minify -d /tmp/site-check     # on Windows use a folder like C:\temp\site-check
```

Errors and warnings are printed; no output besides the summary table means all good.

## Everyday tasks

### Add a module

```
hugo new --kind modules modules/XX-name
```

This creates `content/modules/XX-name/index.md`. Then:

- Edit the front matter at the top of `index.md`:
  - `weight`: modules are listed **newest first**, so give it a number higher than all the others.
  - `status`: `planned`, `building` or `working`.
  - `summary`: the one-liner shown on the card.
  - `cover`: path of the card photo, e.g. `photos/front.jpg` (optional).
  - `designer`, `source`, `source_title`: fill the credit box at the top of the page. For an original design delete `source` (and `designer`): the box then says "Original design by kasetron".
  - `credit_note`: optional extra line in the credit box (e.g. "circuit by X, layout by Y").
- Write the page below the front matter in markdown.

### Photos

Put them in the module's `photos/` folder (create it if missing).

- Show one inside the text: `![caption text](photos/psu_5.jpg)`.
- Every photo in `photos/` also appears automatically in the "All photos" gallery at the bottom of the page, so you don't have to list them.
- Phone photos are huge. Shrink them before adding, to about 2000 px on the long side
  (e.g. with ImageMagick: `magick mogrify -resize "2000x2000>" *.jpg`). Hugo makes the thumbnails by itself.

### Schematics and other files

Put PDFs in the module's `schematics/` folder: they are published and listed under "Schematic" at the bottom of the page.
KiCad projects go in `archivio/<NN-name>/kicad/` (not published, see the privacy note below).

### Demos: audio and video

```
hugo new --kind demos demos/vco-basics
```

Edit the front matter (`module:` is the folder name of the module it belongs to, it creates a link) and add the media:

- **YouTube** (recommended for video, it keeps the repo small): upload as *Unlisted* or *Public*, then in the page use *Share → Embed* and paste the `<iframe ...>` code.
- **Audio file** in the same folder: `<audio controls src="demo.mp3"></audio>`
- **Small video file** in the same folder: `<video controls width="100%" src="demo.mp4"></video>`

GitHub refuses files larger than 100 MB, and the repo should stay under about 1 GB. Use mp3 (not wav) and YouTube for long videos.

### Workshop projects

```
hugo new --kind workshop workshop/wooden-case
```

Same as a module, but simpler: title, date, summary, optional `cover`, text, photos in the same folder.

### Add a whole new section

(For example "Tutorials".)

1. Create `content/tutorials/_index.md` with this content:
   ```
   ---
   title: "Tutorials"
   ---
   Short intro text.
   ```
2. Add pages as `content/tutorials/<name>/index.md`. They get the same simple layout as Workshop.
3. Add the link to the menu: in `layouts/_default/baseof.html` add `<a href="{{ "/tutorials/" | relURL }}">Tutorials</a>` next to the other links in `<nav>`.
4. To also show the latest entries on the home page, add `"tutorials"` to the `slice "demos" "workshop"` list in `layouts/index.html`.

### Rename or reorder

- Order of modules: the `weight` number in each module's front matter (higher = nearer the top).
- Order of demos and workshop entries: the `date` in the front matter (newest first).
- To rename a module folder, rename it and fix its `title`. Nothing else links to it by name, except `module:` in demos.

## Publish on GitHub Pages (first time)

The site lives at **https://kasetron.github.io**. This works because the repo is named exactly `kasetron.github.io`
in the `kasetron` account.

1. **Check what will go public.** The repo has to be public for a free account, and everything in it is visible, not only the
   website. Third-party material is ignored.
2. **Create the repository** on GitHub, signed in as `kasetron`: *New repository*, name **`kasetron.github.io`**, **Public**,
   the repo must start empty.
3. **Set your identity** in this folder:
   ```
   git init -b main
   git config user.name  "kasetron"
   git config user.email "email"
   ```
4. **Make the first commit** and check what is in it:
   ```
   git add .
   git status
   git commit -m "Initial site"
   ```
5. **Connect and push.** Use one of:
   - **GitHub CLI** (easiest): install `gh`, run `gh auth login` and follow the prompts, then
     `git remote add origin https://github.com/kasetron/kasetron.github.io.git` and `git push -u origin main`.
   - **Personal access token**: GitHub → *Settings → Developer settings → Personal access tokens*, create one with the `repo`
     scope (or a fine-grained one with *Contents: read and write* on this repo). Use it as the password when git asks.
   - **SSH key**: add your key under *Settings → SSH and GPG keys*, and use the remote `git@github.com:kasetron/kasetron.github.io.git`.
6. **Turn on Pages**: on GitHub open the repo → *Settings → Pages → Build and deployment → Source: **GitHub Actions***.
7. **Run the build**: open the *Actions* tab. The first run (started by your push) may have failed because Pages was not enabled yet:
   open it and press **Re-run all jobs**. After about a minute it turns green and the site is live at <https://kasetron.github.io>.

## Update the live site

After any change (new page, photo, fix):

```
hugo server -D                      # look at it first
git add .
git commit -m "Add VCA photos"
git push
```

A minute later the live site is updated. You never run `hugo` for the live site: GitHub builds it (`.github/workflows/hugo.yml`).

## Troubleshooting

- **Red cross in the Actions tab:** open the failed run and read the red step. If it is "Get Pages site failed", Pages is not enabled (step 6). If it is a Hugo error, run `hugo --gc --minify -d /tmp/site-check` locally: you get the same message.
- **Site shows 404 after a green build:** *Settings → Pages* must say the source is GitHub Actions, and the repo name must be exactly `kasetron.github.io`.
- **Page missing from the site:** check the front matter is between the two `---` lines, and that there is no `draft: true`.
- **Image not shown:** the path is relative to the page's folder (`photos/name.jpg`) and file names are case-sensitive on GitHub (Linux): `IMG.JPG` is not `img.jpg`.
- **`hugo` says "this feature requires the extended version":** install the `extended` build.
- **Push rejected for file size:** a file over 100 MB. Remove it, recompress, or host it elsewhere (YouTube for video).
