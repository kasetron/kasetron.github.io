---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
weight: 99          # ordine nell'elenco moduli
status: "planned"   # planned | building | working
summary: "One-line description."
cover: "photos/foto.jpg"   # foto di copertina (opzionale)
date: {{ .Date }}
---

## Overview

## Build log

### {{ now.Format "2006-01-02" }}

## Notes
