let rects = [];
let w = 150;

let steps = 0;
let dir = 1;
let speed = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Extend grid 
  let cols = ceil((width + w * 5) / w);
  let rows = ceil((height + w * 5) / w);

  for (let i = -10; i < cols; i++) {
    for (let j = -10; j < rows; j++) {
      rects.push(new Rectfumbles(i * w, j * w, w, i, j));
    }
  }
}

function draw() {
  background('#0c2b4a');

  // SECOND LAYER (stays underneath)
  push();
  translate(w / 2, w / 2);

  for (let r of rects) {
    // Only offset alternate squares for checkerboard pattern
    if ((r.col + r.row) % 2 === 0) {
      r.update();
      r.showOffset();
    }
  }

  pop();

  // TOP LAYER 
  for (let r of rects) {
    r.update();
    r.show();
  }

  // animation
  steps += speed * dir;
  if (steps > w || steps < -w) {
    dir *= -1;
  }
}

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

class Rectfumbles {
  constructor(x, y, w, col, row) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.innerW = w;
    this.col = col;
    this.row = row;
  }

  // ORIGINAL (top layer)
  show() {
    push();
    translate(this.x, this.y);

    rectMode(CORNER);



    // animated square
    rectMode(CENTER);
    
    // Calculate color based on distance from mouse
    let rectCenterX = this.x + this.w / 2;
    let rectCenterY = this.y + this.w / 2;
    let distToMouse = dist(mouseX, mouseY, rectCenterX, rectCenterY);
    let maxColorDistance = 400;
    let colorLerp = constrain(distToMouse / maxColorDistance, 0, 1);
    let rectColor = lerpColor(color(180, 80, 80), color(12, 43, 74), colorLerp);
    
    fill(rectColor);
    rect(this.w / 2, this.w / 2, this.innerW, this.innerW);

    pop();
  }

  // OFFSET (bottom layer)
  showOffset() {
    push();
    translate(this.x, this.y);



    // same animation, different color
    rectMode(CENTER);
    
    // Calculate color based on distance from mouse
    let rectCenterX = this.x + this.w / 2;
    let rectCenterY = this.y + this.w / 2;
    let distToMouse = dist(mouseX, mouseY, rectCenterX, rectCenterY);
    let maxColorDistance = 400;
    let colorLerp = constrain(distToMouse / maxColorDistance, 0, 1);
    let rectColor = lerpColor(color(150, 70, 70), color(12, 43, 74), colorLerp);
    
    fill(rectColor);
    let offsetSize = min(this.w + this.innerW * 0.5, this.w);
    rect(this.w / 2, this.w / 2, offsetSize, offsetSize);

    pop();
  }

  update() {
    let progress = constrain(abs(steps) / w, 0, 1);
    let eased = easeInOutExpo(progress);
    this.innerW = eased * w;
    
    // Calculate distance from mouse to rect center
    let rectCenterX = this.x + this.w / 2;
    let rectCenterY = this.y + this.w / 2;
    let distToMouse = dist(mouseX, mouseY, rectCenterX, rectCenterY);
    
    // Mouse influence - closer = bigger
    let maxInfluenceDistance = 400;
    if (distToMouse < maxInfluenceDistance) {
      let influence = (1 - distToMouse / maxInfluenceDistance) * this.w * 0.5;
      this.innerW += influence;
    }

    // Prevent overlapping by keeping the animated size within the cell width
    this.innerW = min(this.innerW, this.w);
  }
}
