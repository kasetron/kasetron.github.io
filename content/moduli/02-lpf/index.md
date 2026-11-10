---
title: "02 · Digisound 80.6 Lowpass Filter (AS3320)"
weight: 3
status: "working"
summary: "AS3320 voltage-controlled lowpass with 1 V/oct tracking, external resonance and bypass."
cover: "photos/LPFDigi_pos.jpg"
designer: "Eddy Bergman"
source: "https://www.eddybergman.com/2020/03/synthesizer-build-part-23-digisound-80.html"
source_title: "Synthesizer Build part 23"
---

Lowpass filter around the AS3320 (a CEM3320 reissue), on ±15 V.

**Inputs:** three audio inputs (the first with a level pot), 1 V/oct, CV2 (with attenuator), external resonance.
**Controls:** coarse and fine frequency.
**Other:** a bypass switch that routes audio input 1 straight to the output. Two output stages as in Eddy's layout: the original level and a ×3 gain one.

## Notes from the build

Mostly Eddy's own warnings, which are worth repeating:

- Not a beginner's project: the stripboard layout needs exactly **55 holes** of width (some boards have 56) and good-quality copper strips.
- The 1 µF electrolytic at the input looks reversed but is correct (the input opamp is inverting).
- Trimmers: 100k nulls the output DC offset; 20k sets 1 V/oct tracking (by ear). The resistor in series with the AS3320 current-set pin should total about 1.5 k on ±15 V, about 1.2 k on ±12 V.
- Works without the 1 V/oct input, but tracking and sound are better with it patched.
