// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class CustomShape {
  constructor(x, y, font, char) {
    
    this.char = char
    let points = font.textToPoints(this.char, 0, 0, 200, {
        sampleFactor: 1,
        simplifyThreshold: 0
    })
    textFont(font)
    textAlign(CENTER)
    textSize(200)
    textLeading(0)
    textAscent(0)
    textDescent(0)
    let vertices = points.map(p => Vector.create(p.x, p.y))

    

    let options = { restitution: 0.2 };
    this.body = Bodies.fromVertices(x, y, vertices, options);
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  // Drawing the box
  show() {
    strokeWeight(1)
    noFill()
    stroke(0)
    beginShape();
    for (let v of this.body.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
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
