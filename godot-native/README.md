# Raddykall Puzzle — native Godot rebuild

This directory is a **new native game project**, built with Godot 4 and GDScript. It is not an HTML page, a WebView, Phaser, or a CSS reskin. The existing app remains untouched on `main` while this version is validated.

## Open and run

1. Install Godot 4.3 or newer.
2. Import `godot-native/project.godot` in the Godot Project Manager.
3. Run the main scene.

The current vertical slice implements a responsive portrait layout, a 9×9 block board, three selectable pieces, tap-to-place interaction, line clearing, scoring, a restart dialog, and a dedicated bottom ad placeholder. It is a foundation, not yet the complete production game.

## Visual resources

The `assets/ui/` folder reuses selected licensed Casual Mobile UI artwork already in this repository: button textures, pause/shop/settings/star icons, and achievement badges. Keep the matching third-party license and attribution with any release. Space backgrounds and particles from the Kenney packs should be imported selectively after checking their exact license and mobile memory cost; do not load entire packs at runtime.

## Architecture direction

- **Game rules:** GDScript model, separate from UI drawing and input.
- **Presentation:** native Godot Control nodes, responsive containers, no DOM/CSS layout.
- **Rendering:** Godot mobile-compatible GL renderer; start with 2D layered visuals and authored sprites, not expensive full-screen effects.
- **Persistence:** next milestone — versioned save data and migration from existing local-save keys.
- **Modes:** next milestones — Infinite, Levels, Gem Kingdom, daily puzzle, missions, shop/themes, settings, language support.
- **Android:** export preset, native AdMob bridge/plugin, consent flow and adaptive banner integration require a dedicated Android build and device verification.

## Acceptance gates before replacing the current app

1. Headless project import and scene parse pass.
2. No clipping on narrow/short Android screens; board and controls stay above the reserved banner and Android safe areas.
3. Touch placement, invalid moves, line clears, restart and score are repeatable without UI overlap.
4. Assets load without missing-resource errors and their licenses are included.
5. Android debug build installs and runs on a physical device.
6. Ads are tested with Google's test ad unit before any production ad unit is enabled.
7. Existing save data and all required modes are migrated and regression-tested.

Do not merge this branch into `main` until these gates are met. A successful headless parse is not proof of Android rendering, performance, or ad delivery.
