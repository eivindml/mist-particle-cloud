import React from "react"
import Sketch from "react-p5"
import { Vector } from 'p5'
import Particle from './Particle'

const App = () => {
  var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

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

// export default Particle

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef)
    // createCanvas(400, 400);
  p5.colorMode(p5.HSB, 255);
  cols = p5.floor(p5.width / scl);
  rows = p5.floor(p5.height / scl);
  fr = p5.createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle(p5, scl, cols);
  }
  // p5.background(51);
  }
  
  const draw = p5 => {
   var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
      // console.log(p5.noise(2))
      var v = Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      p5.stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(p5.floor(p5.frameRate()));
  }

  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default App;
