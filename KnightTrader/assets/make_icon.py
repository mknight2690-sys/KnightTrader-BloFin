"""
Generate KnightTrader BloFin icons — gold shield on dark glass (matches in-app brand).
"""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent

GOLD_TOP = (245, 197, 66)
GOLD_BOTTOM = (232, 160, 32)
BG_TOP = (17, 22, 30)
BG_BOTTOM = (9, 12, 16)
CHECK = (11, 13, 16)
RIM = (245, 197, 66, 110)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_rgb(c1, c2, t: float):
    return tuple(int(lerp(c1[i], c2[i], t)) for i in range(3))


def cubic_bezier(p0, p1, p2, p3, steps: int = 24):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        u = 1 - t
        x = (
            u * u * u * p0[0]
            + 3 * u * u * t * p1[0]
            + 3 * u * t * t * p2[0]
            + t * t * t * p3[0]
        )
        y = (
            u * u * u * p0[1]
            + 3 * u * u * t * p1[1]
            + 3 * u * t * t * p2[1]
            + t * t * t * p3[1]
        )
        pts.append((x, y))
    return pts


def shield_points(size: int, pad: float = 0.22):
    """Sample the in-app SVG shield path (all points scaled to the canvas)."""
    s = size
    ox = s * pad
    oy = s * pad
    scale = s * (1 - 2 * pad) / 24.0

    def pt(x, y):
        return (ox + x * scale, oy + y * scale)

    def curve(p0, p1, p2, p3, steps: int = 28):
        return cubic_bezier(pt(*p0), pt(*p1), pt(*p2), pt(*p3), steps=steps)

    points = [pt(12, 2), pt(4, 6), pt(4, 12)]
    points.extend(curve((4, 12), (4, 17.25), (7.5, 22.15), (12, 23.5))[1:])
    points.extend(curve((12, 23.5), (16.5, 22.15), (20, 17.25), (20, 12))[1:])
    points.extend([pt(20, 6), pt(12, 2)])
    return points


def render_icon(size: int, *, tray: bool = False) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    margin = max(1, int(size * 0.06))
    radius = max(2, int(size * 0.22))
    box = (margin, margin, size - margin, size - margin)

    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(tile)
    for y in range(box[1], box[3]):
        t = (y - box[1]) / max(1, box[3] - box[1] - 1)
        color = lerp_rgb(BG_TOP, BG_BOTTOM, t)
        tdraw.line([(box[0], y), (box[2], y)], fill=color + (255,))
    tdraw.rounded_rectangle(box, radius=radius, outline=RIM, width=max(1, size // 56))
    img = Image.alpha_composite(img, tile)

    points = shield_points(size, pad=0.27 if tray else 0.24)
    ys = [p[1] for p in points]
    min_y, max_y = int(min(ys)), int(max(ys)) + 1

    shield = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shield)
    for y in range(min_y, max_y):
        t = (y - min_y) / max(1, max_y - min_y - 1)
        color = lerp_rgb(GOLD_TOP, GOLD_BOTTOM, t)
        sdraw.line([(0, y), (size, y)], fill=color + (255,))
    smask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(smask).polygon(points, fill=255)
    shield.putalpha(smask)
    img = Image.alpha_composite(img, shield)

    if not tray and size >= 40:
        draw = ImageDraw.Draw(img)
        sw = size * (1 - 2 * 0.24) / 24.0
        pad = size * 0.24
        check = [
            (pad + 9 * sw, pad + 12.2 * sw),
            (pad + 11 * sw, pad + 14.2 * sw),
            (pad + 15.2 * sw, pad + 9.8 * sw),
        ]
        width = max(2, int(size * 0.07))
        draw.line(check[:2], fill=CHECK + (255,), width=width, joint="curve")
        draw.line(check[1:], fill=CHECK + (255,), width=width, joint="curve")

    return img


def save_ico(path: Path, sizes: list[int]):
    images = [render_icon(s, tray=(s <= 32)) for s in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )


def write_icns(png_path: Path, icns_path: Path) -> bool:
    npx = shutil.which("npx")
    if not npx:
        return False
    out_base = ROOT / "_icon_tmp"
    try:
        subprocess.run(
            [npx, "--yes", "png2icons", str(png_path), str(out_base), "-icns"],
            check=True,
            capture_output=True,
            text=True,
            timeout=120,
        )
        produced = Path(f"{out_base}.icns")
        if produced.exists():
            produced.replace(icns_path)
            return True
    except Exception as exc:
        print(f"png2icons failed: {exc}", file=sys.stderr)
    return False


def main():
    icon_1024 = render_icon(1024)
    icon_1024.save(ROOT / "icon-1024.png", "PNG")
    icon_1024.save(ROOT / "icon-source.png", "PNG")
    render_icon(256).save(ROOT / "icon.png", "PNG")
    render_icon(32, tray=True).save(ROOT / "tray-icon.png", "PNG")
    save_ico(ROOT / "icon.ico", [16, 24, 32, 48, 64, 128, 256])
    save_ico(ROOT / "tray-icon.ico", [16, 32])
    if write_icns(ROOT / "icon-1024.png", ROOT / "icon.icns"):
        print("icon.icns updated")
    else:
        print("icon.icns not regenerated", file=sys.stderr)
    print("KnightTrader icons written to", ROOT)


if __name__ == "__main__":
    main()
