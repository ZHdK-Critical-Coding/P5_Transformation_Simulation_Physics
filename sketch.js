// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const { Engine, Bodies, Composite, Body, Vector }  = Matter;

// A reference to the matter physics engine
let engine;

// An array for all boxes
let shapes = [];

// An array for all boundaries
let boundaries = [];

const FONT_PATH = 'assets/cmunrb.otf'; // <<-- put your font file here
let theFont;

function preload(){
  // loadFont needs a font file (ttf/otf/woff). Replace FONT_PATH with your file.
  // If loadFont fails you'll get an error in the console and the sketch won't show glyph outlines.
  theFont = loadFont(FONT_PATH);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the Matter engine
  engine = Engine.create();

  // Add a bunch of fixed boundaries
  boundaries.push(
    new Boundary(width / 4, height, width / 5)
  );
  boundaries.push(
    new Boundary(3 * (width / 4), height, width / 5)
  );
  
}

function draw() {
  background(0);

  // Update the engine!
  Engine.update(engine);

  // Iterate over the boxes backwards
  for (let i = shapes.length-1; i >= 0; i--) {
    shapes[i].show();
    // Remove the Body from the world and the array
    if (shapes[i].checkEdge()) {
      shapes[i].removeBody();
      shapes.splice(i, 1);
    }
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

function keyPressed() {
  // Only single printable characters: special keys like "Shift" or "Enter"
  // have longer names, and a space has no outline
  if (key.length !== 1 || key === ' ') return;
  let b = new CustomShape(width / 2, -50, theFont, key);
  // Only add the shape if matter.js could build a body from the outline
  if (b.body) {
    shapes.push(b);
  }
}