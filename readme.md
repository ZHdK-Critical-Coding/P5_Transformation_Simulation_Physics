# P5.js: Physics

[Deutsch](README_DE.md)

Letters as physical bodies using [matter.js](https://brm.io/matter-js/):
every key you type drops that character into the scene. Its glyph outline
is converted to points and used as a matter.js body that falls onto two
static circles. Based on examples from
[The Nature of Code](https://natureofcode.com/physics-libraries/).

## Installation

Requirements: a current browser.

To use another font, put the file (ttf/otf/woff) into `assets/` and change
`FONT_PATH` in `sketch.js`.

Libraries (in `libraries/`): p5.js 1.7.0, matter.js 0.19.0, poly-decomp 0.3.0.

## How to Run

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Type any letter, digit or symbol to drop it into the scene.

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
  Only single printable characters are accepted; special keys such as
  Shift (whose `key` is "Shift") and the space bar are ignored.
- **`shape.js` → `CustomShape`**: turns the character into points with
  `font.textToPoints()` (one point every 4 px, `SAMPLE_FACTOR`), splits
  them into contours wherever there is a jump between two points (e.g. the
  stem and the dot of "i") and builds a body with `Bodies.fromVertices()`,
  with a random sideways velocity and some spin. `restitution` sets the
  bounciness. With poly-decomp (loaded in `index.html`) matter.js splits
  each concave contour into convex parts, so the body follows the letter's
  shape; holes like in "o" are filled. `show()` draws the outline of every
  part (white) and the red letter rotated
  with the body.
- **`boundary.js` → `Boundary`**: a static circular body (`isStatic: true`)
  and its drawing.
