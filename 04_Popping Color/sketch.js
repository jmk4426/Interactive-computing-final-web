let fullPalette = ['#fed766', '#009fb7', '#eff1f3', '#e01a4f', '#f15946', '#193680', '#277AEE'];
let shapeColors = [];
let bgColors = [];
let bgColor;
let w = 200;
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noLoop();

  splitPalette();

  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;

  drawPattern();
}

function draw() {}

//when you click it does this:
function mousePressed() {
  splitPalette();
  drawPattern();
}

// making colors different
function splitPalette() {
  let shuffled = shuffle([...fullPalette]);
  let half = floor(shuffled.length / 2);

  shapeColors = shuffled.slice(0, half);
  bgColors = shuffled.slice(half);
}

function drawPattern() {
  bgColor = random(bgColors);
  background(bgColor);

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let x = c * w;
      let y = r * w;
      if (random() < 0.4) {
        let num = ceil(random(3, 8)); 
        drawCircles(x, y, num, w);
      }

      // keeping main shape on top
      drawShape(x, y, w);
    }
  }
}

// main shape
function drawShape(x, y, w) {
  let halfW = w / 2;
  let control = w / 3;

  for (let theta = 0; theta < TWO_PI; theta += PI / 2) {
    push();
    translate(x, y);
    rotate(theta);

    fill(random(shapeColors));

    beginShape();
    vertex(0, 0);
    vertex(halfW, 0);
    vertex(halfW, halfW);
    vertex(0, halfW);

    bezierVertex(
      0, w - control,
      w - control, 0,
      halfW, 0
    );

    endShape(CLOSE);

    pop();
  }
}

// ellipses centered at (0,0)
function drawCircles(x, y, num, w) {
  push();
  translate(x, y);

  for (let n = num; n > 0; n--) {
    fill(random(shapeColors));
    ellipse(0, 0, n * (w / 10));
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  cols = ceil(width / w) + 1;
  rows = ceil(height / w) + 1;

  drawPattern();
}
