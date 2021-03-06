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
