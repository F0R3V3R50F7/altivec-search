## The G4 Lineup at a Glance

Apple produced the Power Mac G4 from 1999 through 2004, spanning a wide range of clock speeds, chassis designs, and logic board revisions. The machines are commonly grouped by their industrial design generation:

- **PCI Graphics (1999)** — 350, 400, 450 MHz. The original G4 towers. PCI graphics slot, no AGP.
- **AGP Graphics (1999–2000)** — 400, 450, 500 MHz. First with AGP 2x. Sawtooth logic board.
- **Gigabit Ethernet (2000–2001)** — 400, 450, 500, dual 450, dual 500 MHz. AGP 4x.
- **Digital Audio (2001)** — 466, 533, dual 533, 667, 733, dual 800 MHz. Improved audio, AGP 4x.
- **Quicksilver (2001–2002)** — 733 MHz to dual 1 GHz. Revised cosmetics, same chassis as Digital Audio.
- **MDD / Wind Tunnel (2002–2003)** — 867 MHz to dual 1.42 GHz. New chassis, DDR RAM, ATA/100. The last G4 tower.

There is also a **Mirror Drive Door FW800** revision (early 2003) which added FireWire 800 and is generally considered the most desirable single variant produced.

## The Sub-900 MHz Usability Wall

This is the most important practical constraint to understand before buying. Mac OS X 10.4 Tiger is the last version of OS X that runs acceptably on a G4 below 900 MHz. Above Tiger, the demands of the operating system itself — Spotlight indexing, Core Image compositing, the increased base memory footprint of Leopard — combine to make a slower G4 genuinely painful to use for anything beyond a terminal window and a text editor.

On a sub-900 MHz machine running Leopard (10.5), launching a modern-for-that-era application like Logic Pro, iMovie, or even a reasonably loaded web page in TenFourFox involves noticeable, sometimes extended waiting. The machine is not broken — it is simply outmatched by what is being asked of it. Tiger runs better because it is a lighter system, but Tiger itself is now old enough that some software you may want simply will not install on it.

**If your intention is to run Leopard and do anything productive on it — including creative software, audio work, or even comfortable daily use — you should be looking at 900 MHz as a hard floor, and honestly 1 GHz or above as a practical minimum.** Machines below that threshold are interesting to own and useful for specific purposes, but set expectations accordingly before buying.

The implication for the lineup above: the entire PCI Graphics generation, the AGP Graphics generation, and the lower-spec Gigabit Ethernet and Digital Audio machines are in the "Tiger only for productivity" category. That is not a condemnation — Tiger is a solid and well-supported system for PowerPC — but know what you are getting into.

## Early Models and the CPU Clamp Problem

This is less widely understood than it should be, and it has destroyed a significant number of machines that otherwise look perfectly fine on the outside.

Every Power Mac G4 tower **except the MDD** — spanning PCI Graphics, AGP Graphics, Gigabit Ethernet, Digital Audio, and Quicksilver — uses a CPU heatsink mounting design that applies mechanical stress directly to the CPU daughter card and, through it, to solder joints on the logic board. The heatsink retention clips pull down against the card from above. Over decades of thermal cycling — heating up, cooling down, expanding, contracting — the cumulative mechanical stress cracks solder joints on the CPU card itself and on the logic board connectors beneath it.

The failure mode is insidious. The machine may POST intermittently, fail to recognise one CPU in a dual configuration, crash under load but run fine at idle, or simply refuse to boot on some days and work on others. By the time the failure is obvious and consistent, the damage is often done to multiple points simultaneously and is not economically repairable.

**These models should be avoided by anyone who is not an industry professional with the tools and knowledge to assess, rework, and monitor the hardware.** A machine in this generation that appears to work today may not work next week, and there is no reliable visual inspection that can tell you which side of that line a specific unit sits on without proper equipment.

The MDD is a complete chassis departure and features a supporting braket which seems to mitigate the issue. If avoiding this issue entirely is your priority, **buy an MDD**.

## The MDD as the Target Machine

For most people reading this site, the **Mirror Drive Door** is the machine to aim for. It is the most capable G4 tower Apple built, it runs Leopard properly, it uses a completely redesigned chassis that does not share the heatsink stress problem of earlier generations, and it is still findable in working condition.

One thing to be prepared for on any MDD you buy: the original power supply is almost certainly dead or dying by now. These machines are over twenty years old and the capacitors in the original PSU have had their time. Do not let a dead PSU put you off a unit that is otherwise in good shape — it is a straightforward repair, the replacement parts are cheap, and there is a full guide covering the MDD PSU replacement on this site. Factor it into your budget rather than your decision.

### Key specs that make the MDD the right choice:

- DDR PC2700 RAM — significantly more bandwidth than the SDRAM in earlier machines
- ATA/100 bus — faster storage throughput than earlier models
- AGP 4x Pro slot — accepts the best GPU cards available for G4
- Dual CPU configurations up to dual 1.42 GHz in the final revision
- The FW800 model adds FireWire 800, useful for fast external storage

## Dual CPU — Does It Matter?

Yes, meaningfully so, but the way it helps depends on what you are running. The G4 fully supports symmetric multiprocessing and Mac OS X was genuinely built around it — the kernel schedules threads across both CPUs and it was a real selling point of the platform. But SMP and single-threaded application speed are two different things.

A single-threaded application is one sequential stream of execution. No matter how capable the SMP implementation, that one thread can only run on one CPU at a time — the second CPU cannot make it go faster because there is nothing to distribute. What the second CPU *does* do is absorb the operating system's own background work — Spotlight, the window server, background application activity — leaving the first CPU more available for what you are actually doing in the foreground. The practical result is that a dual 867 MHz MDD feels noticeably more fluid than a single 867 MHz MDD under the same workload, even though neither CPU is running any faster per thread.

Where a dual G4 genuinely accelerates work is in software explicitly written to use multiple threads simultaneously. Logic Pro distributes DSP plug-in processing across both CPUs in real time — on a dual machine you can run significantly more simultaneous plug-in instances before the system clips compared to a single CPU at the same clock speed. iMovie offloads render and export work across both CPUs, cutting processing times on video projects considerably. Compiling code, batch processing, and any other workload that can be decomposed into parallel tasks all benefit directly and proportionally.

If you are choosing between a single and dual configuration at similar prices, the dual is the better buy for daily use regardless of your workload — and if audio or video is involved, it is not a close call.

## RAM

The MDD takes standard PC2100 and PC2700 depending on the model, up to 2GB total across four slots. This is cheap and readily available. Max it out — Leopard appreciates having 2GB and runs noticeably better than it does on 512MB or 1GB.

Earlier G4 machines use PC133 SDRAM (168-pin), also still available but a different type entirely — do not mix them up when ordering. Check which generation you have before buying RAM.

## Graphics

The GPU situation on G4 towers is limited but workable. The best cards Apple fitted from the factory were the **Radeon 9000 Pro** and **Radeon 9800 Pro** (Mac edition). If you find an MDD with a 9800 Pro, that is the ceiling for G4 AGP graphics and worth keeping. The more common cards — Radeon 9000, GeForce4 Ti, GeForce3 — are functional but noticeably slower in anything GPU-accelerated.

Original factory GPU cards from this era are old enough that failures are not uncommon. If a machine you are considering has a cheap or unknown GPU in it, factor in the cost of a known-good Radeon 9000 Pro at minimum. Flashed PC cards exist but require careful research to confirm compatibility with a specific machine — some work well, some do not.

A good compramise between performance and price is the Radeon 9600 from the PowerMac G5. With some modifications, this card can be easily made to fit and run in the G4. Please refer to our article on the Radeon 9600 for instructions. It is recommended to strap a fan to these pasive cards since they **DO-NOT** favor running hot and have been known for premature faliure. 

## On Noise — Debunking the "Wind Tunnel" Reputation

The G4 tower has a reputation for being loud. Having owned and serviced multiple machines across the full lineup, a properly serviced G4 is not a loud machine. The noise people associate with these computers is almost always a servicing issue, not an inherent design problem.

What *is* a design problem is the airflow direction Apple chose from the factory. Take a look at the orientation of the fans and think about which way the air actually moves. On the first 18 models, the side case fan is oriented to exhaust rather than intake — it is working against the natural convective flow inside the case rather than with it. The CPU fan direction across all models is similarly worth questioning. Neither of these makes the machine loud outright, but they mean thermals are worse than they need to be, which means fans work harder than they need to, which is where the noise reputation comes from.

**The fix costs nothing.** On the first 18 models, flip the side case fan around so it becomes an intake. On all models, flip the CPU fan so it exhausts away from the heatsink rather than blowing down onto it. These two changes improve thermals and reduce noise simultaneously.

### Grinding fans

A grinding or rattling fan means a dry bearing — common on machines that have been stored for years. Peel back the sticker label on the back of the fan hub to expose the bearing access point, and apply one or two drops of machine oil. WD-40 will do the job if that is all you have to hand. Reseat the sticker and run the machine — the grinding should stop immediately.

The exception is fans marked as **SUNON MagLev** (magnetic levitation bearing). These cannot be oiled — they do not use a conventional bearing race. If a SUNON MagLev fan is grinding, it needs replacing outright. That said, these were fitted because they are high quality and tend to outlast conventional sleeve bearing fans in the first place.

## What to Actually Check When Buying

If you are evaluating a specific machine in person or asking a seller questions:

- **Which model and clock speed?** Confirm it is at or above 900 MHz if Leopard is the goal. Get the exact model identifier if possible (e.g. PowerMac3,6 for dual 1.42 GHz MDD).
- **Does it POST cleanly every time?** Intermittent boot failures on any non-MDD G4 tower are a red flag for the CPU clamp stress problem.
- **How much RAM, and what type?** An MDD with 512MB is usable but you will want to upgrade. An MDD with 2GB is ready to go.
- **What GPU is installed?** Radeon 9000 Pro or 9800 Pro are the targets. Anything else note the model and check it is functional.
- **Has the PSU been replaced?** On an MDD, a replaced PSU is a positive — it means someone has already done the most likely maintenance item. An untouched original PSU on an MDD is not a dealbreaker but budget accordingly.
- **Does it have the FW800 logic board?** The early 2003 MDD revision adds FireWire 800 to the rear panel. If you need fast external storage over FireWire, this is the version to look for.
- **What storage is fitted?** Original ATA hard drives of this vintage are old enough to be unreliable. A machine with an IDE SSD or CF adapter already fitted is preferable. If it has original spinning drives, they will need replacing.

## Summary Recommendation

**Target an MDD.** It is the only G4 tower that does not have the CPU clamp problem and the only one with the headroom to run Leopard properly. Dual CPU is preferable. Budget for a PSU replacement and 2GB of RAM if not already present — those two things transform the machine.
