// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular boundary

class Boundary {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    let options = { isStatic: true };
    this.body = Bodies.circle(this.x, this.y, this.r, options);
    Composite.add(engine.world, this.body);
  }
  
  // Drawing the box
  show() {
    fill(255);
    noStroke();    
    circle(this.x, this.y, this.r * 2);
  }
}
