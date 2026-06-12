## The G4 iMovie Lockout

Apple's decision to implement a strict minimum processor and GPU requirement on iMovie '09 was a point of frustration for many. They arbitrarily restricted the software to Intel Macs and G5s, meaning G4 users were left relying on the aging iMovie HD 6. However, testing reveals that iMovie '09 runs efficiently on top-tier G4 setups. The actual hardware requirement is not the G5 processor itself, but rather a GPU that supports **Core Image** and Quartz Extreme, which rely on specific OpenGL pixel shader capabilities. If your G4 is equipped with a capable graphics card, you can bypass the block.

## How the Hex Edit Works

Historically, the vintage Apple community discovered that the software simply executes a hardcoded processor check at launch. By modifying the `MacOS` binary inside the application package using a hex editor, users can change the PowerPC instruction that initializes the check (`mflr r0`) into a return command (`blr`). This forces the hardware check function to void itself and instantly pass, completely circumventing the G5/Intel restriction and allowing your Core Image GPU to handle the rendering.

## Installation Guide

Here is the complete guide to enabling this on your G4:

1. Download the **iLife '09 Install DVD** from the Archive.org link provided in the side panel.
2. Run the installer. You will likely receive a warning message stating that iMovie '09 is not compatible with your system. Ignore this prompt and proceed with the installation.
3. Once installed, close the application. Open the system updater and download any available combo updates for iMovie/iLife to ensure you are on the latest build.
4. Download the pre-patched **iMovie.app** from the second Archive.org link in the side panel.
5. Navigate to your `/Applications` folder and replace the unpatched iMovie application entirely with this modified version.

## Performance Expectations

Launch the application and it should open on your older GPU without displaying any error prompts. Thanks to this patch, you can **now edit full 1080p content in raw on the G4** perfectly smoothly. Enjoy leaving iMovie HD 6 behind!
