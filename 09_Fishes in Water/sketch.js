let typedText = "";
let submittedTexts = [];
let baseGravity = 0.2;
let stackSpacing = 38;
let horizontalSpeed = 1.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(0);

  fill(255);
  noStroke();

  for (let i = 0; i < submittedTexts.length; i++) {
    let currentText = submittedTexts[i];
    let landingY = height - 20;

    if (currentText.str === "boat") {
      landingY = getTopLandingY(currentText);
    }

    if (!currentText.landed) {
      let previousY = currentText.y;
      currentText.speed += currentText.gravity;
      currentText.x += currentText.xSpeed;
      currentText.y += currentText.speed;

      let textMargin = getTextHalfWidth(currentText) + 10;
      if (currentText.x < textMargin || currentText.x > width - textMargin) {
        currentText.x = constrain(currentText.x, textMargin, width - textMargin);
        currentText.xSpeed *= -1;
      }

      if (currentText.str !== "boat") {
        for (let j = 0; j < submittedTexts.length; j++) {
          let otherText = submittedTexts[j];
          if (otherText.str === "boat") {
            continue;
          }

          let targetY = otherText.y - stackSpacing;
          let currentHalfWidth = getTextHalfWidth(currentText);
          let otherHalfWidth = getTextHalfWidth(otherText);
          let touchingX = abs(currentText.x - otherText.x) < currentHalfWidth + otherHalfWidth;
          let fallingOntoText = previousY <= targetY && currentText.y >= targetY;

          if (otherText.landed && touchingX && fallingOntoText && targetY < landingY) {
            landingY = targetY;
          }
        }
      }

      if (currentText.y >= landingY) {
        currentText.y = landingY;
        currentText.speed = 0;
        currentText.landed = true;
      }
    }

    if (currentText.landed) {
      if (currentText.str === "boat") {
        currentText.y = min(currentText.y, getTopLandingY(currentText));
      }

      if (movesLikeWater(currentText)) {
        currentText.waveAmount = lerp(currentText.waveAmount, 1, 0.03);
      } else {
        currentText.waveAmount = 0;
      }

      let textMargin = getTextHalfWidth(currentText) + 10;
      let waveY = sin(frameCount * 0.09 + currentText.phase) * 2 * currentText.waveAmount;
      if (movesLikeWater(currentText)) {
        currentText.x += currentText.xSpeed * currentText.waveAmount;
      }

      if (currentText.x < textMargin || currentText.x > width - textMargin) {
        currentText.x = constrain(currentText.x, textMargin, width - textMargin);
        currentText.xSpeed *= -1;
      }

      for (let j = 0; j < i; j++) {
        let otherText = submittedTexts[j];

        if (otherText.landed && !otherText.remove && !currentText.remove) {
          let currentHalfWidth = getTextHalfWidth(currentText);
          let otherHalfWidth = getTextHalfWidth(otherText);
          let overlapX = currentHalfWidth + otherHalfWidth - abs(currentText.x - otherText.x);
          let overlapY = stackSpacing - abs(currentText.y - otherText.y);

          if (overlapX > 0 && overlapY > 0) {
            if (currentText.str === "shark" && otherText.str === "fish") {
              otherText.remove = true;
              currentText.textScale *= 1.5;
              continue;
            } else if (currentText.str === "fish" && otherText.str === "shark") {
              currentText.remove = true;
              otherText.textScale *= 1.5;
              continue;
            }

            let pushDirection = currentText.x < otherText.x ? -1 : 1;
            currentText.x += (overlapX / 2) * pushDirection;
            otherText.x -= (overlapX / 2) * pushDirection;
            currentText.xSpeed *= -1;
            otherText.xSpeed *= -1;

            let otherMargin = getTextHalfWidth(otherText) + 10;
            currentText.x = constrain(currentText.x, textMargin, width - textMargin);
            otherText.x = constrain(otherText.x, otherMargin, width - otherMargin);
          }
        }
      }

      currentText.drawY = currentText.y + waveY;
    } else {
      currentText.drawY = currentText.y;
    }
  }

  submittedTexts = submittedTexts.filter((currentText) => !currentText.remove);

  for (let i = 0; i < submittedTexts.length; i++) {
    if (submittedTexts[i].str !== "boat") {
      drawSubmittedText(submittedTexts[i]);
    }
  }

  for (let i = 0; i < submittedTexts.length; i++) {
    if (submittedTexts[i].str === "boat") {
      drawSubmittedText(submittedTexts[i]);
    }
  }

  drawColorTerms();

  fill(255);
  text(typedText, width / 2, height / 2);

  stroke(255);
  strokeWeight(3);
  line(width / 2 - 120, height / 2 + 30, width / 2 + 120, height / 2 + 30);
}

function keyTyped() {
  typedText += key;
}

function keyPressed() {
  if (keyCode === ENTER || keyCode === RETURN) {
    submittedTexts.push({
      str: typedText,
      x: width / 2,
      y: height / 2,
      speed: random(-14, -8),
      gravity: baseGravity + typedText.length * 0.05,
      landed: false,
      waveAmount: 0,
      xSpeed: getRandomPopSpeed(),
      phase: random(TWO_PI),
      textScale: 1,
    });
    typedText = "";
    return false;
  }

  if (keyCode === BACKSPACE) {
    typedText = typedText.slice(0, -1);
    return false;
  }
}

function getTopLandingY(currentText) {
  let topY = height - 20;

  for (let i = 0; i < submittedTexts.length; i++) {
    let otherText = submittedTexts[i];

    if (otherText !== currentText && otherText.str !== "boat" && otherText.landed) {
      topY = min(topY, otherText.y - stackSpacing);
    }
  }

  return topY;
}

function getTextHalfWidth(currentText) {
  return (textWidth(currentText.str) * (currentText.textScale || 1)) / 2;
}

function movesLikeWater(currentText) {
  return (
    currentText.str === "water" ||
    currentText.str === "fish" ||
    currentText.str === "shark" ||
    currentText.str === "boat"
  );
}

function getRandomPopSpeed() {
  let speed = random(-9, 14);

  if (abs(speed) < 3) {
    speed = speed < 0 ? -3 : 3;
  }

  return speed;
}

function drawSubmittedText(currentText) {
  setTextColor(currentText.str);

  push();
  translate(currentText.x, currentText.drawY);
  scale(currentText.textScale || 1);
  text(currentText.str, 0, 0);
  pop();
}

function drawColorTerms() {
  let terms = ["water", "fish", "shark", "boat", "other"];
  let spacing = 95;
  let startX = width / 2 - ((terms.length - 1) * spacing) / 2;

  push();
  textSize(24);

  for (let i = 0; i < terms.length; i++) {
    setTextColor(terms[i]);
    text(terms[i], startX + i * spacing, 30);
  }

  pop();
}

function setTextColor(str) {
  if (str === "water") {
    fill(120, 210, 255);
  } else if (str === "fish") {
    fill(255, 190, 120);
  } else if (str === "shark") {
    fill(0, 45, 120);
  } else if (str === "boat") {
    fill(190, 145, 95);
  } else {
    fill(255);
  }
}
