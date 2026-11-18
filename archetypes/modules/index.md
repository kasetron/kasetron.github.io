---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
status: "planned"          # planned | building | working
summary: "One-line description."
cover: "photos/front.jpg"  # optional card photo
# designer / source / source_title: credit box (delete `source` for an original design)
date: {{ .Date }}
---

## Overview

## Build log

### {{ now.Format "2006-01-02" }}

## Notes
