## Why the MDD PSU Fails

The Power Mac G4 MDD usually shipped with a custom Samsung or AcBel supply rated at around 400W[cite: 1]. After twenty-plus years the electrolytic capacitors have aged out[cite: 1]. Failure is gradual: first the machine gets louder than it used to be, then voltages drift, random kernel panics appear under load, and eventually it stops powering on or shuts down immediately after POST[cite: 1]. The caps, not the transformer or MOSFETs, are almost always the culprit[cite: 1]. A recap is theoretically possible but sourcing matched caps and dealing with the proprietary connector makes a direct replacement the practical call[cite: 1].

The MDD uses a **non-standard pinout** — it is not ATX[cite: 1]. The main connector is a 24-pin housing with different signal assignments, plus a separate 4-pin auxiliary[cite: 1]. You cannot drop in an ATX supply without rewiring[cite: 1].

---

## Choosing a Replacement Unit: The Group-Regulation Trap

The physical constraint is simple: you need something that fits the MDD's PSU bay[cite: 1]. The original unit is approximately 150 × 86 × 63mm[cite: 1]. The sweet spot is a **Flex ATX** (also called 1U Flex or SFF ATX) form factor — small enough to mount cleanly inside the case with a simple bracket or zip ties[cite: 1].

### Why the Community is Wrong About FSP

If you read the MDD restoration threads, the unit most often cited is the **FSP400-50FDB** (or the cheaper FSP350-51TAC)[cite: 1]. **Avoid these.** 

The community defaults to these because they are 400W and Gold-rated[cite: 1], but they completely misunderstand how these modern budget units are built. Many modern consumer ATX supplies cut corners by using **group regulation**. They link the +12V and +5V rails onto the exact same regulating circuit. 

A vintage G4 pulls massive, sudden transient loads from the +5V rail during boot for legacy logic and IDE drives, while barely touching the +12V rail. Under this severe cross-load, a group-regulated controller gets totally confused. It tries to split the difference, dragging the +5V rail too low and spiking the +12V rail too high, immediately pushing the voltages outside the required 5% ATX tolerance and forcing the unit to drop out. 

### What to Look For: Independent Regulation (DC-to-DC)

You do not need to buy a specific brand, but you *must* buy a power supply with the correct internal architecture. 

**The eBay Reality Check:** You will almost *never* see terms like "independent regulation" or "DC-to-DC converter" in an eBay title or description. Recyclers and sellers just list the form factor and the wattage. To do this right, you need to find a listing, grab the exact manufacturer model number off the sticker (e.g., Delta `DPS-300AB`), and hunt down the official PDF spec sheet from the manufacturer online. Only pull the trigger once that official spec sheet confirms the minor rails are independently regulated.

The secret to a stable G4 power supply isn't total wattage—it is **independent regulation**. When shopping for a replacement, you must look for units that explicitly feature **DC-to-DC converters** for the minor rails. This means the power supply takes the primary 12V power and uses dedicated, independent circuits to step it down to 5V and 3.3V. 

Because they treat the rails completely separately, DC-to-DC units handle the massive, unbalanced legacy +5V cross-loads of the G4 effortlessly without dropping voltage stability. High-quality industrial OEM boards (like those from Delta Electronics or HiPro) often use this topology by default, but any modern server-grade or high-end SFF supply that explicitly lists DC-to-DC regulation will work. A dense 250W or 300W independently regulated unit will run a G4 flawlessly, while a modern "400W" group-regulated consumer board will die during POST.

---

## The MDD's Real Power Budget

The most demanding stock MDD is the dual 1.42 GHz G4 (PowerPC 7455, "Apollo")[cite: 1]. Under full load across both CPUs, AGP graphics, and a drive or two, realistic sustained draw sits well within what a quality independently regulated unit delivers[cite: 1]:

| Rail | Required (sustained) | Quality DC-to-DC Supply delivers |
|------|-----|----|
| +5V | ~10–14A[cite: 1] | 16A+ |
| +12V | ~18–22A[cite: 1] | 25A+ |
| +3.3V | ~6–8A[cite: 1] | 14A+ |
| Total | ~250–310W[cite: 1] | 300W–350W sustained |

The margins are comfortable[cite: 1]. **A sustained, independently regulated supply is more than enough to run a dual 1.42 GHz MDD**. The limit only becomes a real concern with multiple spinning drives attached — and the problem there is not sustained draw, it is inrush at startup[cite: 1].

---

## The Startup Current Trap

This is what kills otherwise adequate builds[cite: 1]. Mechanical hard drives have a substantial **inrush current spike at spin-up**: a 7,200 RPM 3.5-inch drive can draw 2–3A on the 12V rail for 1–2 seconds[cite: 1]. With two or three drives starting simultaneously you can momentarily demand 6–10A extra on 12V before steady-state load is even established[cite: 1].

Modern PSUs are designed around solid-state storage[cite: 1]. SSDs have near-zero inrush[cite: 1]. As a result, modern units have tightened their over-current protection (OCP) thresholds at startup — headroom that older designs tolerated has been trimmed[cite: 1]. A quality supply that runs your MDD perfectly with an SSD may hard-shutdown during POST with two spinning drives attached because the OCP fires before voltages stabilise[cite: 1].

**Strong recommendation: use a Compact Flash or IDE-to-CF adapter as your boot drive.**[cite: 1] A CF card on an IDE adapter draws effectively zero inrush current, costs very little, and is fast enough for OS X 10.5 boot volumes[cite: 1]. If you keep mechanical drives for storage, use the "delayed start" jumper on each drive so they stagger their spinup rather than all spiking at once[cite: 1].

---

## Pinout Reference

This is where most of the work is[cite: 1]. Below are both connectors side by side[cite: 1]. Study these before cutting anything[cite: 1].

![ATX 24-pin Pinout](articles/ATX.jpg)[cite: 1]

![MDD 24-pin Pinout](articles/MDD.jpg)[cite: 1]

MDD pin 14 is `+25V` for Apple ADC displays[cite: 1]. Your modern PSU has no 25V rail[cite: 1]. Leave that slot empty unless you are running an ADC monitor[cite: 1].

---

## Method 1 — Pin-by-Pin Rearrangement (No Soldering)

Both the ATX 24-pin on your new PSU and the MDD motherboard connector use standard 0.1-inch (2.54mm) pitch housings with side-latching retention clips[cite: 1]. You can extract each terminal and re-insert it into an MDD-pinout housing[cite: 1]. No soldering, fully reversible[cite: 1].

You need a **SIM card removal tool**[cite: 1]. Insert it into the side of the connector hole where the wire enters — you are pressing the metal retention tab inward, not pulling the wire[cite: 1]. While holding the tab, pull gently on the wire from the back[cite: 1]. The terminal slides out cleanly[cite: 1]. Re-insert into the correct slot of a replacement MDD-pinout housing (bare Molex shells are cheap from any electronics supplier) until you feel the tab click[cite: 1].

The catch: Many Flex ATX units ship with short cables — typically 200–250mm[cite: 1]. Routing to the MDD motherboard connector (positioned centrally in the case) can be tight[cite: 1]. If the cable run falls short you will need extensions, which partially defeats the elegance of this approach[cite: 1]. The solder method below handles length properly[cite: 1].

---

## Method 2 — Cut and Solder (Preferred for Clean Builds)

Most experienced restorers prefer this[cite: 1]. The result is one set of wires at the right length, terminated in the connectors the motherboard expects, no adapters in the path[cite: 1]. You need: a soldering iron (25–40W), rosin-core solder, heatshrink tubing, wire strippers[cite: 1].

1. **Harvest the MDD connector shells.**[cite: 1] Cut wires from the dead original PSU leaving 60–80mm on each connector[cite: 1]. These housings are what your motherboard expects[cite: 1].
2. **Cut the ATX connectors off the new supply**, also leaving 60–80mm pigtails[cite: 1].
3. **Verify signals with a multimeter** if wire colours differ from ATX standard — PSU manufacturers are not always consistent[cite: 1]. Probe with the PSU powered into a test load before cutting anything[cite: 1].
4. **Slide heatshrink onto each wire before soldering** — you cannot get it on afterwards[cite: 1].
5. **Solder ATX pigtail to MDD pigtail, signal-matched.**[cite: 1] For rails with multiple parallel pins on the MDD side (+12V carries pins 10, 21, 22, 24; +5V carries pins 3, 4, 15), join all MDD wires for that rail to the equivalent ATX wires[cite: 1]. Do not leave current-carrying pins floating[cite: 1].
6. **Shrink the tubing.**[cite: 1] Every joint individually insulated[cite: 1]. No bare conductors near each other or the case[cite: 1].
7. The `PS_ON` wire (ATX pin 14, green) connects to MDD pin 11[cite: 1]. ATX PS_ON is pulled low to start — the MDD logic does exactly this on power button press, fully compatible[cite: 1].
8. MDD pin 14 (+25V ADC) receives no wire[cite: 1]. Leave the slot empty[cite: 1].

**Cable length:** adding the MDD pigtails to the PSU pigtails gives you the extra length you need[cite: 1]. Total run from PSU bay to motherboard main connector is typically 350–400mm[cite: 1]. If combined pigtails fall short, splice in a section of 18 AWG wire for power pins and 22 AWG for signal lines[cite: 1].

---

## Fitting and First Boot

The Flex ATX unit is smaller than the original MDD PSU[cite: 1]. Fabricate a simple L-bracket or use rubber spacers to hold it in the bay without rattling[cite: 1]. Make sure the PSU fan has clear airflow — the MDD case fan provides good flow when the side door is closed, verify the Flex unit's intake is not blocked by cable bundles[cite: 1].

1. Inspect every joint — insulated, no bare conductors near case metal[cite: 1].
2. Connect only your CF adapter or SSD[cite: 1]. No spinning drives yet[cite: 1].
3. Press power[cite: 1]. The machine should chime and begin POST[cite: 1].
4. If it shuts down immediately or fails to chime, check in order: PS_ON or PWR_OK miswired, an uninsulated short, then (if drives are attached) OCP or cross-load voltage drift tripping the unit[cite: 1].
5. Once stable, add cables one at a time and verify at each step[cite: 1].

A well-fitted modern Flex ATX unit runs noticeably quieter than the original MDD PSU — the original fan was aggressively loud — slightly cooler, and draws less wall power[cite: 1]. The machine will be back to reliable daily use[cite: 1].

**Parts summary:** Any high-quality power supply featuring independent regulation / DC-to-DC converters on the 5V rail (e.g., industrial Delta/HiPro units; avoid group-regulated ATX designs). CF-to-IDE adapter for boot[cite: 1]. 18 AWG for power splices, 22 AWG for signal[cite: 1]. Rosin-core solder, assorted heatshrink[cite: 1]. SIM tool for pin extraction if using the rearrangement method[cite: 1].

**Notes:**

You may also reference another article linked to the side where someone else has attempted the same modification[cite: 1]. Credit to "http://atxg4.com/mdd.html" for the pinout images[cite: 1].