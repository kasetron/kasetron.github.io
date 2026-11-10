---
title: "06 · VCA-1 (AS3080)"
weight: 7
status: "working"
summary: "Linear VCA / 3-input mixer around the AS3080 OTA."
designer: "Eddy Bergman"
source: "https://www.eddybergman.com/2024/04/VCA-1%20for%20stripboard.html"
source_title: "VCA-1 for stripboard"
credit_note: "Circuit by Thomas Henry (Birth of a Synth), stripboard layout by Eddy."
---

Linear VCA that doubles as a three-channel mono mixer, around the AS3080 OTA, with a single TL074. Designed for ±15 V; Eddy also ran it on ±12 V with no changes.

## Notes from the article

- Three audio inputs, each through 100 k; Eddy used only one. Optional AC/DC switches with 220 nF caps.
- **Initial** pot holds the VCA open without an envelope. Beyond about 1 o'clock the audio is at maximum and the VCA no longer closes completely.
- Negative voltages on the envelope input are rejected: the VCA stays closed until the envelope goes above 0 V.
- Only one trimmer, to remove the DC offset at the output. To set it: scope on the output, switch on DC, audio in and an LFO on the envelope input, adjust until the waveform is centred on 0 V.
- TL074 pin numbers on the schematic differ from the real chip. Check them before wiring.
- Feeding an audio-rate signal instead of the envelope gives a ring-mod-like effect.
