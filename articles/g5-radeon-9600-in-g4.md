## Background/History

For vintage Macintosh enthusiasts, sourcing an era-appropriate and capable graphics card for the PowerMac G4 architecture has become increasingly difficult and expensive. Historically, users upgrading their "Sawtooth," "Quicksilver," or "Mirrored Drive Doors" (MDD) systems sought out retail Mac Editions of the Radeon 9700 or 9800 Pro, or resorted to flashing PC variants. 

However, a largely undocumented and highly cost-effective upgrade path exists: utilizing an OEM ATI Radeon 9600 originally shipped with the PowerMac G5. Apple transitioned to dual-DVI outputs and an updated AGP standard for the G5, abandoning the proprietary Apple Display Connector (ADC). Because of structural and electrical differences, the G5's Radeon 9600 is not plug-and-play in a G4. Yet, with minor physical modifications and some careful masking, this card can be adapted to serve as an excellent, low-noise GPU upgrade for late-era G4 towers.

## Technical Details

The incompatibility between the G5 Radeon 9600 and the PowerMac G4 motherboard stems from two distinct design shifts in Apple's AGP implementation:

1. **Physical Clearance:** PowerMac G4 logic boards feature an inline ADC power connector situated directly behind the standard AGP slot. The OEM G5 Radeon 9600 lacks an ADC port (having moved strictly to DVI), but features an extended securing latch bracket that collides directly with the G4's ADC power slot, preventing the card from seating.
2. **Electrical Revisions (AGP 8x vs 4x):** The OEM G5 Radeon 9600 is an AGP 8x card. When inserted into the G4's AGP 4x slot, a signaling mismatch occurs on the bus interface. specifically, certain pins pull data that prevents the G4 from initiating the boot sequence, resulting in a black screen. This requires the isolation of specific contact pins to force the card to fall back to the AGP 4x standard.

## Installation/Usage Guide

**Disclaimer:** This process requires permanently modifying the graphics card. Proceed with caution.

1. **The Physical Modification:** To bypass the physical collision with the G4's logic board, the extended securing latch bracket at the rear of the card's AGP connector must be removed. Using a rotary tool (like a Dremel) or a fine-toothed hacksaw, carefully cut off the protruding plastic hook section. Ensure no fiberglass dust or debris remains on the PCB traces after cutting.
2. **The Electrical Modification (The Tape Trick):** To resolve the AGP bus incompatibility, you must isolate Pins 3 and 11 on the AGP connector. Using a precision blade and thin strips of Kapton tape (or high-quality electrical tape), carefully cover pin 3 and pin 11. This prevents the logic board from reading the incompatible AGP 8x voltage/detect signals, allowing the hardware to safely negotiate an AGP 4x connection. (Please refer to the external link for visuals).
3. **Installation:** With the latch bracket removed and the pins masked, firmly seat the Radeon 9600 into the PowerMac G4's AGP slot. Since this card utilizes dual DVI outputs, the legacy ADC logic board power delivery is safely bypassed. Connect your DVI display and power on the machine. 

## Performance Expectations

Once successfully retrofitted, the OEM G5 Radeon 9600 acts as a massive paradigm shift for a PowerMac G4 originally burdened by a Rage 128 Pro, Radeon 7500, or GeForce 4 MX. 

The Radeon 9600 provides full hardware support for Mac OS X 10.4 Tiger and 10.5 Leopard's Core Image technologies, rendering the desktop interface, Dashboard ripples, and window compositing flawlessly. In 3D applications and gaming, the card pairs beautifully with the G4's AltiVec processor. It offers phenomenal, stable framerates in hardware-taxing titles like *World of Warcraft* (1.12), *Halo: Combat Evolved*, and *Unreal Tournament 2004* at standard resolutions (1024x768 to 1280x1024), completely alleviating the GPU bottlenecks typical of early 2000s hardware configurations. Furthermore, as an OEM card, it does not require supplemental Molex power, keeping the system's thermal and acoustic footprint exceptionally low.