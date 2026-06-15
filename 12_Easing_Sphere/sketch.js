let leftX;
let rightX;
let topY;
let bottomY;
let tX = 0;
let tY = 0;
let directionX = 1;
let directionY = 1;
const duration = 120;

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  leftX = width / 4;
  rightX = (width * 3) / 4;
  topY = height / 4;
  bottomY = (height * 3) / 4;
}

function draw() {
  rectMode(CORNER);
  noStroke();
  fill('#00000025');
  rect(0, 0, width / 2, height/2);
  rect(width / 2, height / 2, width / 2, height/2);

  fill('#FFFFFF25');
  rect(width / 2, 0, width / 2, height/2);
  rect(0, height / 2, width / 2, height/2);

  directionX = mouseX < width / 2 ? -1 : 1;
  directionY = mouseY < height / 2 ? -1 : 1;

  tX += directionX / duration;
  tY += directionY / duration;
  tX = constrain(tX, 0, 1);
  tY = constrain(tY, 0, 1);

  const easedX = easeInOutQuint(tX);
  const easedY = easeInOutQuint(tY);
  const x = lerp(leftX, rightX, easedX);
  const y = lerp(topY, bottomY, easedY);

  const xRatio = map(x, leftX, rightX, 0, 1, true);
  const yRatio = map(y, topY, bottomY, 0, 1, true);

  const ellipseLeft = lerpColor(color(255), color(0), yRatio);
  const ellipseRight = lerpColor(color(0), color(255), yRatio);
  const ellipseColor = lerpColor(ellipseLeft, ellipseRight, xRatio);


  ellipseMode(CENTER);
  noStroke();
  fill(ellipseColor);
  ellipse(x, y, 200, 200);
}
