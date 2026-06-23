## Why the MDD PSU Fails

The Power Mac G4 MDD usually shipped with a custom Samsung or AcBel supply rated at around 400W. After twenty-plus years the electrolytic capacitors have aged out. Failure is gradual: first the machine gets louder than it used to be, then voltages drift, random kernel panics appear under load, and eventually it stops powering on or shuts down immediately after POST. The caps, not the transformer or MOSFETs, are almost always the culprit. A recap is theoretically possible but sourcing matched caps and dealing with the proprietary connector makes a direct replacement the practical call.

The MDD uses a **non-standard pinout** — it is not ATX. The main connector is a 24-pin housing with different signal assignments, plus a separate 4-pin auxiliary. You cannot drop in an ATX supply without rewiring.

---

## Choosing a Replacement Unit: The Group-Regulation Trap

If we are doing this properly, we are not fabricating L-brackets, cutting holes in the case, or strapping a bare metal box to the chassis with zip-ties. The correct engineering approach is a **sleeper transplant**: gutting the original Apple power supply enclosure and mounting the internal circuit board of a modern, high-quality SFF supply inside it.

To do this, you need a donor unit with a PCB small enough to fit inside the Apple enclosure (roughly 150 × 86 × 63mm). A server-grade **Flex ATX** or **SFF** supply is the perfect donor, provided you buy the right architecture.

### Why the Community is Wrong About FSP

If you read the MDD restoration threads, the unit most often cited is the **FSP400-50FDB** (or the cheaper FSP350-51TAC). **Avoid these.** The community defaults to these because they are 400W and Gold-rated, but they completely misunderstand how these modern budget units are built. Many modern consumer ATX supplies cut corners by using **group regulation**. They link the +12V and +5V rails onto the exact same regulating circuit. 

A vintage G4 pulls massive, sudden transient loads from the +5V rail during boot for legacy logic and IDE drives, while barely touching the +12V rail. Under this severe cross-load, a group-regulated controller gets totally confused. It tries to split the difference, dragging the +5V rail too low and spiking the +12V rail too high, immediately pushing the voltages outside the required 5% ATX tolerance and forcing the unit to drop out. 

### What to Look For: Independent Regulation (DC-to-DC)

You do not need to buy a specific brand, but you *must* buy a power supply with the correct internal architecture. 

**The eBay Reality Check:** You will almost *never* see terms like "independent regulation" or "DC-to-DC converter" in an eBay title or description. Recyclers and sellers just list the form factor and the wattage. To do this right, you need to find a listing, grab the exact manufacturer model number off the sticker (e.g., Delta `DPS-300AB`), and hunt down the official PDF spec sheet from the manufacturer online. Only pull the trigger once that official spec sheet confirms the minor rails are independently regulated.

The secret to a stable G4 power supply isn't total wattage—it is **independent regulation**. When shopping for a replacement, you must look for units that explicitly feature **DC-to-DC converters** for the minor rails. High-quality industrial OEM boards (like those from Delta Electronics or HiPro) often use this topology by default. A dense 250W or 300W independently regulated unit will run a G4 flawlessly, while a modern "400W" group-regulated consumer board will die during POST.

---

## The MDD's Real Power Budget

The most demanding stock MDD is the dual 1.42 GHz G4 (PowerPC 7455, "Apollo"). Under full load across both CPUs, AGP graphics, and a drive or two, realistic sustained draw sits well within what a quality independently regulated unit delivers:

| Rail | Required (sustained) | Quality DC-to-DC Supply delivers |
|------|-----|----|
| +5V | ~10–14A | 16A+ |
| +12V | ~18–22A | 25A+ |
| +3.3V | ~6–8A | 14A+ |
| Total | ~250–310W | 300W–350W sustained |

The margins are comfortable. **A sustained, independently regulated supply is more than enough to run a dual 1.42 GHz MDD**. 

---

## The Startup Current Trap

This is what kills otherwise adequate builds. Mechanical hard drives have a substantial **inrush current spike at spin-up**: a 7,200 RPM 3.5-inch drive can draw 2–3A on the 12V rail for 1–2 seconds. With two or three drives starting simultaneously you can momentarily demand 6–10A extra on 12V before steady-state load is even established.

Modern PSUs have tightened their over-current protection (OCP) thresholds at startup. A quality supply that runs your MDD perfectly with an SSD may hard-shutdown during POST with two spinning drives attached because the OCP fires before voltages stabilise.

**Strong recommendation: use a Compact Flash or IDE-to-CF adapter as your boot drive.** A CF card on an IDE adapter draws effectively zero inrush current. If you keep mechanical drives for storage, use the "delayed start" jumper on each drive so they stagger their spinup.

---

## The Board Transplant and Loom Swap

This is not a bodge. We are not splicing pigtails together with heatshrink, and we are not using adapters. The goal is to install the new power supply PCB inside the original Apple enclosure and solder the original Apple wiring loom directly to the output pads of the new board.

**WARNING: LETHAL VOLTAGES.** The primary capacitors on a power supply can hold a lethal mains-voltage charge long after the unit is unplugged. **DO NOT attempt to manually discharge these capacitors.** Handle the PCBs strictly by their edges. Do not touch the solder traces on the bottom of the board, and never bridge the capacitor pins. 

**DISCLAIMER:** This modification involves exposing mains-voltage circuitry. The assistance of a qualified electrical engineer is strongly advised. Proceed entirely at your own risk.

### 1. Gut the Donors
* Carefully open the dead MDD power supply and extract the PCB, handling it only by the edges. 
* Open your new SFF/Flex ATX donor supply and extract its PCB in the same manner. 
* Keep the heavy, transparent plastic isolation sheets from both units. You will need them to prevent the new board from shorting against the Apple metal chassis.

### 2. Desolder the Looms
You are going to need a powerful soldering iron (preferably a desoldering gun or an iron with a heavy chisel tip). Industrial power supply PCBs have massive, thick copper ground planes that soak up heat instantly. 
* Carefully desolder the ATX wire loom from the output pads of your new donor board. Clean the through-holes.
* Completely desolder the Apple wire loom from the dead MDD board, keeping the loom completely intact. 

### 3. Map the Pads
Before soldering anything, you must map the output pads on your new donor board. Do not assume the pad layout. Trace the old ATX wires you just removed or use a multimeter to verify which output pads correspond to:
* `+12V`
* `+5V`
* `+3.3V`
* `GND` (Ground)
* `+5VSB` (5V Standby / Trickle)
* `PS_ON` (Power On - usually pulled low to start)
* `PWR_OK` (Power Good signal)

### 4. Solder the Apple Loom to the New Board
Below are the MDD and ATX pinout references to help you map the Apple loom wires to the correct voltage pads on your new board. 

![ATX 24-pin Pinout](articles/ATX.jpg)
![MDD 24-pin Pinout](articles/MDD.jpg)

Take the intact Apple wire loom and solder the ends directly into the corresponding voltage and signal pads on the new donor PCB. 
* Group the heavy-gauge wires by voltage (all +12V together, all +5V together, all GND together) and solder them into the heavy output trace holes.
* **MDD pin 11** connects to the `PS_ON` pad on the new board.
* **MDD pin 14** is `+25V` for Apple ADC displays. Your modern board has no 25V rail. Clip and isolate this wire, or remove it from the loom entirely unless you plan on engineering a separate boost converter circuit.

### 5. Chassis Modification and Mounting
The new PCB will likely have mounting holes in different locations than the Apple board.
1.  Place the new PCB inside the empty MDD metal enclosure. Mark the location of the new mounting holes.
2.  Drill out the new mounting locations on the bottom of the Apple chassis. You may need to tap new brass standoffs or use secure nylon mounting hardware.
3.  **CRITICAL:** Lay down the plastic high-voltage isolation sheet between the metal chassis and the bottom of the new PCB. Ensure no solder joints or component legs on the bottom of the board can pierce the plastic and short to the case.
4.  Mount the board securely, route the loom cleanly out of the original chassis exit hole, and attach the original Apple fans (splicing them to an internal 12V rail or fan header on the new board).
5.  Close up the Apple enclosure.

## Fitting and First Boot

Because you used the original Apple enclosure, the power supply will slide directly back into the G4 chassis and lock into place perfectly. Because you swapped the loom directly at the PCB level, there is no messy bundle of spliced wires blocking airflow. 

1. Slide the rebuilt PSU back into the MDD.
2. Connect only your CF adapter or SSD. No spinning drives yet.
3. Press power. The machine should chime and begin POST.
4. If it shuts down immediately or fails to chime, check in order: `PS_ON` or `PWR_OK` miswired, or an internal short to the chassis casing.

You now have a fully reliable, independently regulated, modern power supply sitting stealthily inside a factory-original Apple enclosure. 

**Parts summary:** Any high-quality power supply featuring independent regulation / DC-to-DC converters on the minor rails (e.g., industrial Delta/HiPro SFF units; avoid group-regulated ATX designs). High-mass soldering iron/desoldering tool. Nylon standoffs or mounting hardware. 

**Notes:**

You may also reference another article linked to the side where someone else has attempted the same modification. Credit to "http://atxg4.com/mdd.html" for the pinout images.