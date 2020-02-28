class Particle {

  
  constructor(p5, scl, cols) {
    this.p5 = p5
    this.scl = scl
    this.cols = cols
    
    // console.log(p5.width)
    this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    console.log(this.pos)
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.maxspeed = 4;
    this.h = 0;
  
    this.prevPos = this.pos.copy();
    // console.log(this.prevPos)
  }
  

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  follow(vectors) {
    var x = this.p5.floor(this.pos.x / this.scl);
    var y = this.p5.floor(this.pos.y / this.scl);
    var index = x + y * this.cols;
    var force = vectors[index];
    this.applyForce(force);
  };

  applyForce(force) {
    this.acc.add(force);
  };

  show() {
    this.p5.stroke(this.h, 255, 255, 25);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    this.p5.strokeWeight(1);
    // console.log(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  };

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  edges() {
    if (this.pos.x > this.p5.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = this.p5.width;
      this.updatePrev();
    }
    if (this.pos.y > this.p5.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = this.p5.height;
      this.updatePrev();
    }
  };
}

export default Particle