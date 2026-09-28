# P5.js: Physics

[Deutsch](README_DE.md)

Letters as physical bodies using [matter.js](https://brm.io/matter-js/):
every key you type drops that character into the scene. Its glyph outline
is converted to points and used as a matter.js body that falls onto two
static circles. Based on examples from
[The Nature of Code](https://natureofcode.com/physics-libraries/).

## Installation

Requirements: a current browser.

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Type any key to drop that letter into the scene.

To use another font, put the file (ttf/otf/woff) into `assets/` and change
`FONT_PATH` in `sketch.js`.

Libraries (in `libraries/`): p5.js 1.7.0, matter.js 0.19.0.

## Coding Help

- **`sketch.js` → globals**: `FONT_PATH` points to the font
  (`assets/cmunrb.otf`), loaded in `preload()`. The matter.js modules
  (`Engine`, `Bodies`, `Composite`, `Body`, `Vector`) are unpacked at the
  top.
- **`setup()`**: creates the matter.js `engine` and two `Boundary` circles
  at the bottom edge.
- **`draw()`**: advances the physics with `Engine.update()`, draws all
  shapes and boundaries and removes shapes that fell below the canvas.
- **`keyPressed()`**: creates a `CustomShape` for `key` at the top centre.
  Special keys such as Shift pass their name (e.g. "Shift") as text.
- **`shape.js` → `CustomShape`**: turns the character into points with
  `font.textToPoints()` and builds a body with `Bodies.fromVertices()`,
  with a random sideways velocity and some spin. `restitution` sets the
  bounciness. Without the poly-decomp library matter.js cannot split
  concave outlines and uses their convex hull instead, which is what the
  black outline shows. `show()` draws that outline and the red letter
  rotated with the body.
- **`boundary.js` → `Boundary`**: a static circular body (`isStatic: true`)
  and its drawing.
