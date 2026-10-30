#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="spaceBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="100%" stop-color="#020308"/>
    </linearGradient>
    <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#spaceBg)"/>
  <rect x="2" y="2" width="96" height="96" rx="22" fill="none" stroke="#6366F1" stroke-width="1.5" stroke-opacity="0.4"/>
  <circle cx="50" cy="50" r="28" fill="none" stroke="#4F46E5" stroke-dasharray="4 4" stroke-width="1.2" opacity="0.6"/>
  <path d="M50 20 L58 45 L50 40 L42 45 Z" fill="url(#rocketGrad)"/>
  <circle cx="50" cy="50" r="3" fill="#38BDF8"/>
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(SVG_CONTENT)

def create_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    corner = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size, size], radius=corner, fill=(5, 8, 20, 255))
    draw.rounded_rectangle([2, 2, size-2, size-2], radius=corner, outline=(99, 102, 241, 100), width=int(max(1, size*0.015)))
    
    # Rocket triangle
    cx = size * 0.5
    draw.polygon([(cx, size*0.22), (cx + size*0.18, size*0.62), (cx, size*0.52), (cx - size*0.18, size*0.62)], fill=(99, 102, 241, 255))
    draw.ellipse([cx - size*0.04, size*0.7 - size*0.04, cx + size*0.04, size*0.7 + size*0.04], fill=(56, 189, 248, 255))
    return img

create_icon(180).save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
create_icon(192).save(os.path.join(PUBLIC_DIR, "icon-192.png"), "PNG")
create_icon(512).save(os.path.join(PUBLIC_DIR, "icon-512.png"), "PNG")
create_icon(32).save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO")

og = Image.new("RGBA", (1200, 630), (5, 8, 20, 255))
og_draw = ImageDraw.Draw(og)
for i in range(1200):
    og_draw.line([(i, 0), (i, 630)], fill=(99, 102, 241, int(25 * (1 - i/1200))))
og.paste(create_icon(240), (850, 195))
og.convert("RGB").save(os.path.join(PUBLIC_DIR, "og-image.png"), "PNG")
print("✓ SpaceX assets generated")
