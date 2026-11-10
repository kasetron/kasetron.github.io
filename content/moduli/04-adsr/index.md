---
title: "04 · Precision ADSR (Kassutronics)"
weight: 5
status: "working"
summary: "ADSR around a 7555 with opamp precision rectifiers, so the envelope reaches 0 V."
designer: "Eddy Bergman"
source: "https://www.eddybergman.com/2025/04/Kassutronic-precision-adsr.html"
source_title: "Kassutronics Precision ADSR"
credit_note: "Derived from the Kassutronics design."
---

ADSR envelope with a 7555 and opamp-based precision rectifiers in the charge and discharge paths. This removes the diode drop that stops the envelope short of 0 V in the Yusynth / René Schmitz versions. Runs on ±12 V or ±15 V.

## Notes from the article

- Use a real **ICM7555 (CMOS)**, not a standard NE555.
- Attack, decay and release need **log** pots (1 M). The attenuverter needs a linear 100 k; a log one misbehaves.
- Use a **tantalum** for C3 (1 µF): offset drops from about 90 mV to 10–20 mV.
- Peak is set by the 7555's 2/3 threshold: about 8.4 V on ±12 V, about 10 V on ±15 V.
- If the envelope doesn't rise with attack fully closed, change R8 from 100 Ω to 330 Ω.
- If triggering is unreliable, add a 10 k pulldown on the gate input.
- Follow the pot wiring diagram (drawn from the back of the pots).
- Tie the output jack ground straight to the ground rail.
