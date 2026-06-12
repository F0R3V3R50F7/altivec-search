## Can a G4 Run WoW?

Absolutely! Vanilla WoW was designed for hardware from 2004. With tweaks, you'll get playable framerates.

## Installation Guide

First, visit [solocraft.org](http://solocraft.org) and navigate to the "How to Play" section to download the Windows client. Use one of the three download mirrors provided on the side layout panel.

Once downloaded, open the directory and delete the Windows executable `wow.exe` file and the `wtf` folder. Next, download the old PowerPC `World of Warcraft.app` (the archive.org link will be provided in the side panel) and drop it directly into your game directory. You should essentially be left with just that `.app` bundle and the `data` folder.

Launch the game, log into your account, and then close it immediately. This generates the necessary configuration files for the next step.

## Performance Tweaks & Configuration

To get this running smoothly on our beloved PowerPC hardware, we need to optimize the settings. Open your newly generated `Config.wtf` and add or replace the contents with the following parameters:

```
SET preferredFullscreenMode "1"
SET hwDetect "0"
SET gxColorBits "24"
SET gxDepthBits "24"
SET gxResolution "1280x800"
SET gxMultisampleQuality "0.000000"
SET fullAlpha "1"
SET doodadAnim "0"
SET lodDist "70"
SET SmallCull "0.040000"
SET DistCull "350.000000"
SET farclip "477"
SET specular "1"
SET particleDensity "0.4"
SET unitDrawDist "150.000000"
SET spellEffectLevel "1"
SET Gamma "1.000000"
SET weatherDensity "0"
SET ffxGlow "0"
SET uiScale "0.85999995470047"
SET useUiScale "1"
SET ffxDeath "0"
SET DesktopGamma "1"
SET frillDensity "32"
SET pixelShaders "1"
SET ffxSpecial "0"
SET gxVertexCache "1"
SET showVsync "0"
SET horizonfarclip "150"
SET gxMultisample "2"
SET shadowLevel "0"
SET anisotropic "2"
```

## Why These Settings?

If you're using a period-accurate GPU like the Radeon 9600, you have to play to the hardware's specific strengths. Modern systems rely on cheap, brute-force raw resolution to achieve a clean image. However, older cards like the 9600 have excellent native hardware support for multisampling and anisotropic filtering, but limited fill-rate and VRAM bandwidth. By running the game at a lower resolution (1280x800) combined with native `gxMultisample "2"` and `anisotropic "2"`, you offload the anti-aliasing work to the GPU's dedicated hardware. This gives you a crisp, clean image natively without the massive frame rate penalty that rendering at a higher resolution would cause.

## Conclusion

Now you can relaunch the game and play. You'll be raiding Molten Core on your G4 in no time.
