// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A letter shaped body

// One point every 4 pixels along the outline. More points make the
// decomposition into convex parts slow and unreliable.
const SAMPLE_FACTOR = 0.25

class CustomShape {
  constructor(x, y, font, char) {
    
    this.char = char
    let points = font.textToPoints(this.char, 0, 0, 200, {
        sampleFactor: SAMPLE_FACTOR,
        simplifyThreshold: 0
    })
    textFont(font)
    textAlign(CENTER)
    textSize(200)
    textLeading(0)
    textAscent(0)
    textDescent(0)
    // textToPoints() returns the points of all contours of a letter in one
    // list (e.g. "i" has two: the stem and the dot). A contour starts where
    // the distance to the previous point is bigger than the sampling step.
    let contours = [];
    let contour = [];
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      if (i > 0 && dist(p.x, p.y, points[i - 1].x, points[i - 1].y) > 1.5 / SAMPLE_FACTOR) {
        contours.push(contour);
        contour = [];
      }
      contour.push(Vector.create(p.x, p.y));
    }
    contours.push(contour);
    // Ignore tiny leftovers that can't form a shape
    contours = contours.filter(c => c.length >= 3);
    if (contours.length === 0) return;

    // matter.js splits each contour into convex parts (with poly-decomp).
    // Holes (like in "o") become filled parts of the body.
    let options = { restitution: 0.2 };
    this.body = Bodies.fromVertices(x, y, contours, options);
    if (!this.body) return;
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  // Drawing the body
  show() {
    strokeWeight(1)
    noFill()
    stroke(255)
    // A body made of several convex parts keeps them in body.parts
    // (parts[0] is the body itself, so we skip it if there are more)
    let parts = this.body.parts.length > 1 ? this.body.parts.slice(1) : this.body.parts;
    for (let part of parts) {
      beginShape();
      for (let v of part.vertices) {
        vertex(v.x, v.y);
      }
      endShape(CLOSE);
    }
    push()
    translate(this.body.position.x, this.body.position.y)
    rotate(this.body.angle)
    fill(255,0,0)    
    text(this.char, 0, 70)
    pop()
  }

  checkEdge() {
    return this.body.position.y > height + 100;
  }

  // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}
