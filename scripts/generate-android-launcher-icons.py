#!/usr/bin/env python3
"""Generate legacy and adaptive Android launcher icons from the user-provided Raddykall logo."""
from collections import deque
from pathlib import Path
from PIL import Image
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/branding/raddykall-launcher-source.jpg"
RES = ROOT / "android/app/src/main/res"
BACKGROUND = (9, 13, 42, 255)
DENSITIES = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
ADAPTIVE_DENSITIES = {"mdpi": 108, "hdpi": 162, "xhdpi": 216, "xxhdpi": 324, "xxxhdpi": 432}
ANDROID_NS = "http://schemas.android.com/apk/res/android"
ET.register_namespace("android", ANDROID_NS)


def remove_outer_white(image: Image.Image) -> Image.Image:
    """Make only near-white pixels connected to the border transparent."""
    image = image.convert("RGBA")
    pix = image.load()
    width, height = image.size
    queue = deque()
    seen = bytearray(width * height)

    def is_border_white(x: int, y: int) -> bool:
        r, g, b, _ = pix[x, y]
        return min(r, g, b) >= 190 and max(r, g, b) - min(r, g, b) <= 48

    for x in range(width):
        for y in (0, height - 1):
            idx = y * width + x
            if not seen[idx] and is_border_white(x, y):
                seen[idx] = 1
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            idx = y * width + x
            if not seen[idx] and is_border_white(x, y):
                seen[idx] = 1
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        r, g, b, _ = pix[x, y]
        pix[x, y] = (r, g, b, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= width or ny >= height:
                continue
            idx = ny * width + nx
            if not seen[idx] and is_border_white(nx, ny):
                seen[idx] = 1
                queue.append((nx, ny))
    return image


def centered(source: Image.Image, size: int, fill: tuple[int, int, int, int], scale: float) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), fill)
    art_size = max(1, int(size * scale))
    art = source.resize((art_size, art_size), Image.Resampling.LANCZOS)
    canvas.alpha_composite(art, ((size - art_size) // 2, (size - art_size) // 2))
    return canvas


def save_adaptive_xml(path: Path, round_icon: bool = False) -> None:
    tag = "adaptive-icon"
    root = ET.Element(tag)
    ET.SubElement(root, "background", {f"{{{ANDROID_NS}}}drawable": "@color/ic_launcher_background"})
    ET.SubElement(root, "foreground", {f"{{{ANDROID_NS}}}drawable": "@mipmap/ic_launcher_foreground"})
    ET.indent(root, space="    ")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text('<?xml version="1.0" encoding="utf-8"?>\n' + ET.tostring(root, encoding="unicode") + "\n", encoding="utf-8")


def main() -> None:
    if not SOURCE.is_file():
        raise SystemExit(f"Missing launcher image: {SOURCE}")
    original = Image.open(SOURCE).convert("RGB")
    source = remove_outer_white(original)
    # Legacy icons use a dark, full-bleed background; the adaptive foreground keeps
    # the white outside corners transparent so Android can apply its launcher mask.
    for density, size in DENSITIES.items():
        folder = RES / f"mipmap-{density}"
        folder.mkdir(parents=True, exist_ok=True)
        icon = centered(source, size, BACKGROUND, 1.0)
        icon.convert("RGB").save(folder / "ic_launcher.png", optimize=True)
        icon.convert("RGB").save(folder / "ic_launcher_round.png", optimize=True)

    for density, size in ADAPTIVE_DENSITIES.items():
        folder = RES / f"mipmap-{density}"
        folder.mkdir(parents=True, exist_ok=True)
        foreground = centered(source, size, (0, 0, 0, 0), 0.82)
        foreground.save(folder / "ic_launcher_foreground.png", optimize=True)

    adaptive_dir = RES / "mipmap-anydpi-v26"
    save_adaptive_xml(adaptive_dir / "ic_launcher.xml")
    save_adaptive_xml(adaptive_dir / "ic_launcher_round.xml")
    values = RES / "values"
    values.mkdir(parents=True, exist_ok=True)
    (values / "ic_launcher_background.xml").write_text(
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<resources>\n    <color name="ic_launcher_background">#090D2A</color>\n'
        '</resources>\n',
        encoding="utf-8",
    )

    required = [
        RES / "mipmap-mdpi/ic_launcher.png",
        RES / "mipmap-xxxhdpi/ic_launcher_round.png",
        RES / "mipmap-mdpi/ic_launcher_foreground.png",
        adaptive_dir / "ic_launcher.xml",
        adaptive_dir / "ic_launcher_round.xml",
        values / "ic_launcher_background.xml",
    ]
    missing = [str(p) for p in required if not p.is_file() or p.stat().st_size < 20]
    if missing:
        raise SystemExit("Launcher icon generation failed: " + ", ".join(missing))
    print("OK: legacy and adaptive Raddykall launcher icons generated for all Android densities.")


if __name__ == "__main__":
    main()
