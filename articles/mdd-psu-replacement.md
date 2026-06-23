## Why the MDD PSU Fails

The Power Mac G4 MDD shipped with a custom Delta or Acbel supply rated at 360W. After twenty-plus years the electrolytic capacitors have aged out. Failure is gradual: first the machine gets louder than it used to be, then voltages drift, random kernel panics appear under load, and eventually it stops powering on or shuts down immediately after POST. The caps, not the transformer or MOSFETs, are almost always the culprit. A recap is theoretically possible but sourcing matched caps and dealing with the proprietary connector makes a direct replacement the practical call.

The MDD uses a **non-standard pinout** — it is not ATX. The main connector is a 24-pin housing with different signal assignments, plus a separate 4-pin auxiliary. You cannot drop in an ATX supply without rewiring.

## Choosing a Replacement Unit

The physical constraint is simple: you need something that fits the MDD's PSU bay. The original unit is approximately 150 × 86 × 63mm. The sweet spot is a **Flex ATX** (also called 1U Flex or SFF ATX) form factor — small enough to mount cleanly inside the case with a simple bracket or zip ties.

### What the community recommends

The unit most often cited in MDD restoration threads is the **FSP400-50FDB — a 400W Flex ATX 1U Gold-rated supply** from FSP Group. Solid reputation, genuine 80+ Gold efficiency, and its ratings are real rather than peak-burst marketing numbers. If you want the best-regarded option and are not price-sensitive, this is the community default.

**Ignore the "400W low ripple" framing you will see in community threads.** That spec is repeated so often it has become received wisdom, but it does not reflect what the machine actually needs. What matters is that the unit you choose is a *quality supply with honest sustained ratings on its 12V and 5V rails* — not a specific wattage number. A reputable 350W unit beats a cheap 400W unit on every rail that counts. Modern switching supplies at this price point all have acceptable ripple for this application. You are not powering sensitive measurement equipment.

### The better-value alternative

The FSP400-50FDB commands a premium largely due to its visibility in community discussions. Units like the **FSP350-51TAC** (350W, same Flex ATX form factor, same FSP platform) are substantially cheaper and are electrically the same supply wearing a less prominent badge. For most MDD configurations the 50W difference on paper is irrelevant — here is why.

## The MDD's Real Power Budget

The most demanding stock MDD is the dual 1.42 GHz G4 (PowerPC 7455, "Apollo"). Under full load across both CPUs, AGP graphics, and a drive or two, realistic sustained draw sits well within what a quality 350W unit delivers:

| Rail | Required (sustained) | FSP350-51TAC delivers |
|------|-----|----|
| +5V | ~10–14A | 16A |
| +12V | ~18–22A | 30A |
| +3.3V | ~6–8A | 14A |
| Total | ~250–310W | 350W sustained |

The margins are comfortable. **16A on 5V and 30A on 12V at 350W sustained is enough to run a dual 1.42 GHz MDD**. The limit only becomes a real concern with multiple spinning drives attached — and the problem there is not sustained draw, it is inrush at startup.

## The Startup Current Trap

This is what kills otherwise adequate builds. Mechanical hard drives have a substantial **inrush current spike at spin-up**: a 7,200 RPM 3.5-inch drive can draw 2–3A on the 12V rail for 1–2 seconds. With two or three drives starting simultaneously you can momentarily demand 6–10A extra on 12V before steady-state load is even established.

Modern PSUs are designed around solid-state storage. SSDs have near-zero inrush. As a result, modern units have tightened their over-current protection (OCP) thresholds at startup — headroom that older designs tolerated has been trimmed. A quality 350W supply that runs your MDD perfectly with an SSD may hard-shutdown during POST with two spinning drives attached because the OCP fires before voltages stabilise.

**Strong recommendation: use a Compact Flash or IDE-to-CF adapter as your boot drive.** A CF card on an IDE adapter draws effectively zero inrush current, costs very little, and is fast enough for OS X 10.5 boot volumes. If you keep mechanical drives for storage, use the "delayed start" jumper on each drive so they stagger their spinup rather than all spiking at once.

## Pinout Reference

This is where most of the work is. Below are both connectors side by side. Study these before cutting anything.

![ATX 24-pin Pinout](articles/ATX.jpg)

![MDD 24-pin Pinout](articles/MDD.jpg)

MDD pin 14 is `+25V` for Apple ADC displays. Your modern PSU has no 25V rail. Leave that slot empty unless you are running an ADC monitor.

## Method 1 — Pin-by-Pin Rearrangement (No Soldering)

Both the ATX 24-pin on your new PSU and the MDD motherboard connector use standard 0.1-inch (2.54mm) pitch housings with side-latching retention clips. You can extract each terminal and re-insert it into an MDD-pinout housing. No soldering, fully reversible.

You need a **SIM card removal tool**. Insert it into the side of the connector hole where the wire enters — you are pressing the metal retention tab inward, not pulling the wire. While holding the tab, pull gently on the wire from the back. The terminal slides out cleanly. Re-insert into the correct slot of a replacement MDD-pinout housing (bare Molex shells are cheap from any electronics supplier) until you feel the tab click.

The catch: FSP Flex ATX units ship with short cables — typically 200–250mm. Routing to the MDD motherboard connector (positioned centrally in the case) can be tight. If the cable run falls short you will need extensions, which partially defeats the elegance of this approach. The solder method below handles length properly.

## Method 2 — Cut and Solder (Preferred for Clean Builds)

Most experienced restorers prefer this. The result is one set of wires at the right length, terminated in the connectors the motherboard expects, no adapters in the path. You need: a soldering iron (25–40W), rosin-core solder, heatshrink tubing, wire strippers.

1. **Harvest the MDD connector shells.** Cut wires from the dead original PSU leaving 60–80mm on each connector. These housings are what your motherboard expects.
2. **Cut the ATX connectors off the new supply**, also leaving 60–80mm pigtails.
3. **Verify signals with a multimeter** if wire colours differ from ATX standard — PSU manufacturers are not always consistent. Probe with the PSU powered into a test load before cutting anything.
4. **Slide heatshrink onto each wire before soldering** — you cannot get it on afterwards.
5. **Solder ATX pigtail to MDD pigtail, signal-matched.** For rails with multiple parallel pins on the MDD side (+12V carries pins 10, 21, 22, 24; +5V carries pins 3, 4, 15), join all MDD wires for that rail to the equivalent ATX wires. Do not leave current-carrying pins floating.
6. **Shrink the tubing.** Every joint individually insulated. No bare conductors near each other or the case.
7. The `PS_ON` wire (ATX pin 14, green) connects to MDD pin 11. ATX PS_ON is pulled low to start — the MDD logic does exactly this on power button press, fully compatible.
8. MDD pin 14 (+25V ADC) receives no wire. Leave the slot empty.

**Cable length:** adding the MDD pigtails to the PSU pigtails gives you the extra length you need. Total run from PSU bay to motherboard main connector is typically 350–400mm. If combined pigtails fall short, splice in a section of 18 AWG wire for power pins and 22 AWG for signal lines.

## Fitting and First Boot

The Flex ATX unit is smaller than the original MDD PSU. Fabricate a simple L-bracket or use rubber spacers to hold it in the bay without rattling. Make sure the PSU fan has clear airflow — the MDD case fan provides good flow when the side door is closed, verify the Flex unit's intake is not blocked by cable bundles.

1. Inspect every joint — insulated, no bare conductors near case metal.
2. Connect only your CF adapter or SSD. No spinning drives yet.
3. Press power. The machine should chime and begin POST.
4. If it shuts down immediately or fails to chime, check in order: PS_ON or PWR_OK miswired, an uninsulated short, then (if drives are attached) OCP tripping on inrush.
5. Once stable, add cables one at a time and verify at each step.

A well-fitted modern Flex ATX unit runs noticeably quieter than the original MDD PSU — the original fan was aggressively loud — slightly cooler, and draws less wall power. The machine will be back to reliable daily use.

**Parts summary:** FSP350-51TAC (budget, same platform) or FSP400-50FDB (community gold standard). CF-to-IDE adapter for boot. 18 AWG for power splices, 22 AWG for signal. Rosin-core solder, assorted heatshrink. SIM tool for pin extraction if using the rearrangement method.

**Notes:**

You may also reference another article linked to the side where someone else has attempted the same modification. Credit to "http://atxg4.com/mdd.html" for the pinout images.
