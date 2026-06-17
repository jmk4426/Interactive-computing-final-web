
let scl = 20;
let cols, rows;
let flowfield = [];
let particles = [];
let particleCount = 5000;
let flatColor;
let sharpColor;
let mouseTarget;
let mouseAvoidRadius = 160;
let mouseAvoidStrength = 0.6;
let gatherTarget;
let isGathering = false;
let t = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  drawGradientBackground(255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flatColor = color('#0678d6');
  sharpColor = color('#FFECD1');

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  drawGradientBackground(10);
  mouseTarget = createVector(mouseX, mouseY);

  if (isGathering) {
    gatherTarget = mouseTarget.copy();
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let n = noise(i * 0.08, j * 0.08, t);
      let angle = map(n, 0, 1, 0, TWO_PI);
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.22);
      flowfield[i + j * cols] = v;
    }
  }

  for (let particle of particles) {
    particle.follow(flowfield);
    particle.update();
    particle.edges();
    particle.show();
    particle.updatePrev();
  }

  t += 0.006;
}

function mousePressed() {
  gatherTarget = createVector(mouseX, mouseY);

  if (isGathering) {
    for (let particle of particles) {
      particle.explodeFrom(gatherTarget);
    }
    isGathering = false;
  } else {
    isGathering = true;
  }
}

function drawGradientBackground(alpha) {
  let a = alpha / 255;
  let gradient = drawingContext.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `rgba(0, 53, 102, ${a})`);
  gradient.addColorStop(1, `rgba(0, 21, 36, ${a})`);

  drawingContext.fillStyle = gradient;
  noStroke();
  rect(0, 0, width, height);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.prev = this.pos.copy();
    this.maxSpeed = random(0.7, 2.2);
    this.burst = 0;
    this.weight = random(0.4, 1.6);
    this.alpha = random(12, 45);
  }

  update() {
    let speedLimit = this.maxSpeed + this.burst;

    if (isGathering) {
      speedLimit = max(speedLimit, 12);
    }

    this.vel.add(this.acc);
    this.vel.limit(speedLimit);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.burst *= 0.97;

    if (this.burst < 0.05) {
      this.burst = 0;
    }
  }

  updatePrev() {
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    let xx = floor(constrain(this.pos.x, 0, width - 1) / scl);
    let yy = floor(constrain(this.pos.y, 0, height - 1) / scl);
    let index = xx + yy * cols;
    let force = vectors[index];

    if (force) {
      this.applyForce(force);
    }

    if (isGathering) {
      this.gatherTo(gatherTarget);
    } else {
      this.avoidMouse();
    }
  }

  gatherTo(target) {
    let pull = p5.Vector.sub(target, this.pos);
    let distance = pull.mag();

    if (distance > 1) {
      let strength = map(distance, 0, width, 0.35, 4.5, true);
      pull.normalize();
      pull.mult(strength);
      this.applyForce(pull);
    }
  }

  explodeFrom(target) {
    let blast = p5.Vector.random2D();
    let away = p5.Vector.sub(this.pos, target);

    if (away.mag() > 1) {
      away.normalize();
      blast.lerp(away, 0.35);
    }

    blast.normalize();
    this.burst = random(12, 26);
    blast.mult(this.burst);
    this.vel.add(blast);
    this.updatePrev();
  }

  avoidMouse() {
    let away = p5.Vector.sub(this.pos, mouseTarget);
    let distance = away.mag();

    if (distance > 0 && distance < mouseAvoidRadius) {
      let strength = map(distance, 0, mouseAvoidRadius, mouseAvoidStrength, 0);
      away.normalize();
      away.mult(strength);
      this.applyForce(away);
    }
  }

  show() {
    let angle = this.vel.heading();
    let sharpness = abs(sin(angle));
    let c = lerpColor(flatColor, sharpColor, sharpness);

    stroke(red(c), green(c), blue(c), this.alpha);
    strokeWeight(this.weight);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }

  edges() {
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
