---
title: "03 · Output / Mixer"
weight: 4
status: "working"
summary: "Stereo output: pre-gain, FX send/return, line out, headphones and peak LEDs."
credit_note: "Reference: the \"Output\" module by MeeBilt Instruments (KiCad project from 2023: VU meter, balanced line driver, headphone amp), found online. Its schematic is kept in my private archive."
---

My own design for the end of the signal chain, on ±15 V. Parts: 2× TL074 and 1× NE5532.

## Signal flow

1. **Inputs:** L and R jacks. L is normalled to R, so a mono source on L feeds both channels.
2. **Pre-gain:** inverting TL074 stage, 100 k in, 68 k ∥ 10 p feedback (about −3 dB), then 10 µF non-polar coupling. The result is the "monitor" signal.
3. **FX send:** stereo 50 k linear pot after the monitor signal, with 1 k in series at the top and 1 k at the bottom, to a stereo jack.
4. **FX return:** AC-coupled TL074 non-inverting stage; a 10 k linear pot in the feedback loop sets the gain (unity up to roughly +25 dB).
5. **Sum:** monitor and FX return each go through 10 k into a common node (passive mix, no summing opamp).
6. **Line out:** stereo 50 k log pot, then TL074 inverting stage (10 k / 10 k), 1 k series resistor.
7. **Headphones:** stereo 50 k log pot, then NE5532 inverting stage (10 k / 10 k), 330 Ω series resistors.
8. **Peak LEDs:** one comparator per channel on the line output, with a 1N4148 and a 22 µF hold capacitor, driving a red LED.

Put 22 µF + 100 nF between each rail and ground, with the 100 nF close to the chips.

## Design notes

Figures below come from reading my own schematic, not from measurements. Check them on the bench.

**Levels**

- **FX send** range is about −0.2 dB to −34 dB (never fully off), not the −25 dB written on the schematic. With the 1 k / 50 k / 1 k network the minimum is 1k / 52k.
- **FX return** gain is 1 + 10k/470, so about 22× (+27 dB) at maximum, not +25 dB.
- **Overall level** from input to line out is about −11 dB at full volume: −3.3 dB from the pre-gain stage and about −7.6 dB from the passive sum. A ±5 V input reaches the line out at roughly ±1.5 V.
- **Peak LEDs:** at that level, dry signals may never reach the 4.9 V threshold written on the schematic. Measure where they actually light.
- **Headphones:** unity gain with 330 Ω in series. Fine for 100–600 Ω headphones; with 32 Ω ones expect about 21 dB less level.

**Possible improvements**

- **DC gain on the FX return:** the 470 Ω goes straight to ground, so the stage amplifies its own input offset by about 22×. A non-polar or electrolytic capacitor of about 22 µF in series with the 470 Ω brings the DC gain to 1 (corner around 15 Hz).
- **Passive sum:** the monitor and the FX return both feed one node through 10 k, which is also the load of the line and headphone pots. Moving one pot changes the level of the other by about 1 dB. A summing opamp would remove this, but costs another opamp section.

**Polarity with external effects**

Dry and wet signals both pass through exactly two inverting stages (the pre-gain stage and the line/headphone stage; the FX return stage does not invert), so the module itself keeps them in phase. The only polarity issue can come from the effect, since some (for example many analog delays and pedals) invert. If one does, you hear thinning or comb filtering when the effect's own dry signal is mixed in. To fix it, add a unity-gain inverter (10 k / 10 k, one spare opamp section) after the FX return stage, with an SPDT switch that selects direct or inverted.
