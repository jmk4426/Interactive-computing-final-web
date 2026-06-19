let faceMesh, video, faces = [];
const faceOptions = { maxFaces: 1, refineLandmarks: true, flipHorizontal: false };

let gameState = 'start'; // 'start' | 'playing' | 'gameover'

// Bird
let birdX, birdY, birdVY;
let birdR = 28;

// Physics
const GRAVITY     = 0.22;
const LIFT_FORCE  = -0.28;

// Pipes
let pipes = [];
let pipeTimer = 0;
let nextPipeTime = 90;
let pipeSpeed = 3;
let pipeW, gapH;

// Score
let score = 0;
let highScore = 0;

// Mouth detection
let mouthOpen = false;
let wasMouthOpen = false;
let cameraReady = false;
let faceDetected = false;
const MOUTH_OPEN_THRESHOLD = 0.20;
const MOUTH_CLOSE_THRESHOLD = 0.14;

// Monotone palette
const BG       = [255, 255, 255];
const FG       = [  0,   0,   0];
const FG_MID   = [120, 120, 120];
const FG_LIGHT = [200, 200, 200];

// ─────────────────────────────────────────────
function preload() {
  faceMesh = ml5.faceMesh(faceOptions);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();

  video = createCapture(VIDEO, () => {
    cameraReady = true;
  });
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);

  calcSizes();
}

function calcSizes() {
  birdX = width  * 0.22;
  birdR = width  * 0.022;
  pipeW = width  * 0.065;
  gapH  = height * 0.27;
}

function resetGame() {
  birdY         = height / 2;
  birdVY        = 0;
  pipes         = [];
  pipeTimer     = 0;
  nextPipeTime  = 90;
  pipeSpeed     = width * 0.004;
  score         = 0;
  mouthOpen     = false;
  wasMouthOpen  = false;
}

// ─────────────────────────────────────────────
function draw() {
  processFace();

  if      (gameState === 'start')    drawStart();
  else if (gameState === 'playing')  drawGame();
  else if (gameState === 'gameover') drawGameOver();
}

// ── Face detection ────────────────────────────
function processFace() {
  faceDetected = faces.length > 0;

  if (!faceDetected) {
    mouthOpen = false;
    wasMouthOpen = false;
    return;
  }

  let face = faces[0];

  let mTop    = face.keypoints[13];
  let mBot    = face.keypoints[14];
  let mLeft   = face.keypoints[78];
  let mRight  = face.keypoints[308];

  if (!mTop || !mBot || !mLeft || !mRight) return;

  let mVertical   = dist(mTop.x, mTop.y, mBot.x, mBot.y);
  let mHorizontal = dist(mLeft.x, mLeft.y, mRight.x, mRight.y);
  let mRatio      = mVertical / mHorizontal;

  // Two thresholds prevent tiny landmark fluctuations from rapidly
  // switching the bird between rising and falling.
  if (mouthOpen) {
    mouthOpen = mRatio > MOUTH_CLOSE_THRESHOLD;
  } else {
    mouthOpen = mRatio > MOUTH_OPEN_THRESHOLD;
  }

  let mouthJustOpened = mouthOpen && !wasMouthOpen;
  if (mouthJustOpened && (gameState === 'start' || gameState === 'gameover')) {
    startGame();
  }

  wasMouthOpen = mouthOpen;
}

function startGame() {
  gameState = 'playing';
  resetGame();
}

// ── Screens ───────────────────────────────────
function drawStart() {
  drawBackground();

  let cx = width / 2;

  let bob = sin(frameCount * 0.06) * 6;
  drawBird(birdX, height / 2 + bob);

  noStroke();
  fill(...FG);
  textAlign(CENTER, CENTER);
  textSize(width * 0.048);
  text('FLY BIRD', cx, height * 0.26);

  fill(...FG_MID);
  textSize(width * 0.018);
  text('open mouth to rise · close to fall', cx, height * 0.33);

  drawTrackerStatus(cx, height * 0.65);

  if (highScore > 0) {
    fill(...FG_MID);
    textSize(width * 0.018);
    textAlign(CENTER, CENTER);
    text('best  ' + highScore, cx, height * 0.76);
  }
}

function drawGame() {
  drawBackground();

  // ── Physics ───────────────────────────────
  if (mouthOpen) {
    birdVY += LIFT_FORCE * (height / 600);
  } else {
    birdVY += GRAVITY * (height / 600);
  }

  birdVY = constrain(birdVY, -height * 0.009, height * 0.009);
  birdY += birdVY;

  // pipes
  pipeTimer++;
  if (pipeTimer >= nextPipeTime) {
    spawnPipe();
    pipeTimer    = 0;
    nextPipeTime = int(random(75, 105));
  }
  updatePipes();

  // ground / ceiling death
  let groundY = height * 0.92;
  if (birdY + birdR >= groundY || birdY - birdR <= 0) {
    endGame();
    return;
  }

  drawBird(birdX, birdY);

  // score
  noStroke();
  fill(...FG);
  textAlign(CENTER, TOP);
  textSize(width * 0.048);
  text(score, width / 2, height * 0.04);

  // mouth state hint
  fill(mouthOpen ? [...FG] : [...FG_LIGHT]);
  textSize(width * 0.015);
  text(mouthOpen ? 'rising ↑' : 'falling ↓', width / 2, height * 0.12);
}

function drawGameOver() {
  drawBackground();
  drawBird(birdX, birdY);

  let cx = width / 2;

  stroke(...FG_LIGHT);
  strokeWeight(max(1, width * 0.001));
  line(cx - width * 0.22, height * 0.30, cx + width * 0.22, height * 0.30);
  line(cx - width * 0.22, height * 0.58, cx + width * 0.22, height * 0.58);

  noStroke();
  fill(...FG);
  textAlign(CENTER, CENTER);
  textSize(width * 0.042);
  text('GAME OVER', cx, height * 0.24);

  textSize(width * 0.018);
  fill(...FG_MID);
  text('SCORE', cx, height * 0.37);
  textSize(width * 0.058);
  fill(...FG);
  text(score, cx, height * 0.455);

  textSize(width * 0.018);
  fill(...FG_MID);
  text('BEST  ' + highScore, cx, height * 0.535);

  fill(...FG_MID);
  textSize(width * 0.016);
  text('close, then open mouth to restart', cx, height * 0.62);

  drawTrackerStatus(cx, height * 0.72);
}

// ── Drawing helpers ────────────────────────────
function drawBackground() {
  background(...BG);

  stroke(...FG_LIGHT);
  strokeWeight(max(1, width * 0.001));
  line(0, height * 0.92, width, height * 0.92);
}

function drawBird(x, y) {
  fill(...BG);
  stroke(...FG);
  strokeWeight(max(1.5, birdR * 0.12));
  ellipse(x, y, birdR * 2, birdR * 2);
}

function drawPipe(x, topH, botY) {
  let groundY = height * 0.92;
  let capH    = height * 0.022;
  let capW    = pipeW  * 1.16;

  fill(...FG_LIGHT);
  stroke(...FG);
  strokeWeight(max(1, width * 0.001));
  rect(x, 0, pipeW, topH);

  fill(...FG_MID);
  rect(x - (capW - pipeW) / 2, topH - capH, capW, capH);

  fill(...FG_LIGHT);
  stroke(...FG);
  rect(x, botY, pipeW, groundY - botY);

  fill(...FG_MID);
  rect(x - (capW - pipeW) / 2, botY, capW, capH);
}

function drawTrackerStatus(cx, cy) {
  let bw = width * 0.28;
  let bh = height * 0.08;
  stroke(...FG);
  strokeWeight(max(1.5, width * 0.0015));
  fill(...BG);
  rect(cx - bw/2, cy - bh/2, bw, bh);

  noStroke();
  fill(...FG);
  textAlign(CENTER, CENTER);
  textSize(width * 0.017);

  if (!cameraReady) {
    text('ALLOWING CAMERA…', cx, cy);
  } else if (!faceDetected) {
    text('LOOK AT THE CAMERA', cx, cy);
  } else {
    text('OPEN MOUTH TO START', cx, cy);
  }
}

// ── Pipes ─────────────────────────────────────
function spawnPipe() {
  let minTop = height * 0.10;
  let maxTop = height * 0.92 - gapH - height * 0.10;
  let topH   = random(minTop, maxTop);
  pipes.push({ x: width + pipeW, topH, botY: topH + gapH, passed: false });
}

function updatePipes() {
  pipeSpeed = width * 0.004 + score * width * 0.000055;

  for (let i = pipes.length - 1; i >= 0; i--) {
    let p = pipes[i];
    p.x -= pipeSpeed;

    drawPipe(p.x, p.topH, p.botY);

    if (!p.passed && p.x + pipeW < birdX) {
      p.passed = true;
      score++;
      if (score > highScore) highScore = score;
    }

    let bLeft  = birdX - birdR * 0.85;
    let bRight = birdX + birdR * 0.85;
    let bTop   = birdY - birdR * 0.85;
    let bBot   = birdY + birdR * 0.85;

    if (bRight > p.x && bLeft < p.x + pipeW) {
      if (bTop < p.topH || bBot > p.botY) {
        endGame();
        return;
      }
    }

    if (p.x + pipeW < 0) pipes.splice(i, 1);
  }
}

function endGame() {
  if (score > highScore) highScore = score;
  gameState = 'gameover';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcSizes();
}

function gotFaces(results) {
  faces = results;
}
