---
title: "05 · AD/AR envelope (7555)"
weight: 6
status: "working"
summary: "Simple AD/AR envelope generator with a 7555 timer."
designer: "Eddy Bergman"
source: "https://www.eddybergman.com/2020/02/synthesizer-extras-no-01-adar-using-7555.html"
source_title: "Synthesizer Extras no. 01 – AD/AR using 7555"
credit_note: "Circuit by Thomas Henry, adapted by Eddy."
---

Envelope generator that works as **AD** with a trigger (the attack always completes, then decay) or as **AR** with a gate (holds while the key is down, then releases). A gate, if present, overrides the manual button. Designed for ±15 V.

## Notes from the article

- Output buffers are important. Without them, low-impedance loads (some filters) can make the circuit hang with the release never starting.
- On ±12 V change R7 from 2k2 to 3k3.
- In trigger mode keep the attack slightly open: fully closed, the pulse ends before reaching full voltage. Gate mode doesn't have this problem.
- Use a log pot for attack. A standard electrolytic is fine for the 4.7 µF attack cap (no bipolar needed); adding caps in parallel lengthens the attack.
- Use the updated layouts, not the first two on the page. The layout spans only 21 strips, so be careful on 24-strip board.
- A NE555 works instead of the 7555 but is noisier and draws more power.
- Measured by Eddy: attack ~0.7 ms to ~6 s, decay ~0.25 ms to ~30 s.
