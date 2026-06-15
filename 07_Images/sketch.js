let img; 
let error;

let positions = [];
let running = true;

function preload(){
  img = loadImage('background.jpg');
  error = loadImage('error.webp');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  image(img, width/2, height/2, width, height);
}

function draw() {
  // add new error positions only when running
  if (running) {
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
      positions.push({ x: mouseX, y: mouseY });
    }
  }

  if (positions.length > 300) {
    positions.shift();
  }

  // redness based on number of error images
  let redness = min(positions.length * 0.5, 255);
  let alpha = min(positions.length * 0.3, 255);

  // fading red-tinted background
  tint(255, 255 - redness, 255 - redness, alpha);
  image(img, width / 2, height / 2, width, height);

  // draw all error images 
  tint(255, 255 - redness, 255 - redness);
  for (let pos of positions) {
    image(error, pos.x, pos.y, error.width * 0.3, error.height * 0.3);
  }
}

function mousePressed() {
  running = !running;
}
