let img1;
let img2;
let ellipses = [];
let capture;
let prevFrame;

let ellipseDiameter = 5;
let ellipseSpacing = 12;
let videoWidth = 640;
let videoHeight = 480;
let motionThreshold = 80;
let visibleDuration = 2000;

function preload() {
  img1 = loadImage("img1.jpg");
  img2 = loadImage("img2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(videoWidth, videoHeight);
  capture.hide();

  prevFrame = capture.get(0, 0, videoWidth, videoHeight);
  createEllipseGrid();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createEllipseGrid();
}

function createEllipseGrid() {
  ellipses = [];

  for (let x = ellipseDiameter / 2; x < width; x += ellipseSpacing) {
    for (let y = ellipseDiameter / 2; y < height; y += ellipseSpacing) {
      ellipses.push(new ColorEllipse(x, y));
    }
  }
}

function draw() {
  background(0, 98);
  capture.loadPixels();
  prevFrame.loadPixels();

  for (let i = 0; i < ellipses.length; i++) {
    ellipses[i].update();
    ellipses[i].display();
  }

  prevFrame = capture.get(0, 0, videoWidth, videoHeight);
}

function getColorFromPosition(x, y) {
  let sourceImage = x < width / 2 ? img1 : img2;
  let localX = x < width / 2 ? x : x - width / 2;
  let localWidth = width / 2;

  let imgX = floor(map(localX, 0, localWidth, 0, sourceImage.width - 1));
  let imgY = floor(map(y, 0, height, 0, sourceImage.height - 1));

  return sourceImage.get(imgX, imgY);
}

class ColorEllipse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = ellipseDiameter;
    this.c = getColorFromPosition(this.x, this.y);
    this.alpha = 0;
    this.scale = 1;
    this.pulsePhase = 0;
    this.lastMovedAt = -visibleDuration;
  }

  update() {
    let videoX = floor(map(this.x, 0, width, 0, capture.width - 1));
    let videoY = floor(map(this.y, 0, height, 0, capture.height - 1));
    let loc = (videoX + videoY * capture.width) * 4;

    let r = capture.pixels[loc];
    let g = capture.pixels[loc + 1];
    let b = capture.pixels[loc + 2];
    let pr = prevFrame.pixels[loc];
    let pg = prevFrame.pixels[loc + 1];
    let pb = prevFrame.pixels[loc + 2];

    let movement = dist(r, g, b, pr, pg, pb);

    if (movement > motionThreshold) {
      this.alpha = 255;
      this.lastMovedAt = millis();
      if (this.pulsePhase === 0) {
        this.pulsePhase = 1;
      }
    } else if (millis() - this.lastMovedAt > visibleDuration) {
      this.alpha = max(0, this.alpha - 12);
    }

    this.updatePulse();
  }

  updatePulse() {
    if (this.pulsePhase === 1) {
      this.scale = lerp(this.scale, 5, 0.35);
      if (abs(this.scale - 5) < 0.1) {
        this.scale = 5;
        this.pulsePhase = 2;
      }
    } else if (this.pulsePhase === 2) {
      this.scale = lerp(this.scale, 0.5, 0.35);
      if (abs(this.scale - 0.5) < 0.1) {
        this.scale = 0.5;
        this.pulsePhase = 3;
      }
    } else if (this.pulsePhase === 3) {
      this.scale = lerp(this.scale, 1, 0.25);
      if (abs(this.scale - 1) < 0.05) {
        this.scale = 1;
        this.pulsePhase = 0;
      }
    }
  }

  display() {
    if (this.alpha <= 0) return;

    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    ellipse(this.x, this.y, this.diameter * this.scale, this.diameter * this.scale);
  }
}
