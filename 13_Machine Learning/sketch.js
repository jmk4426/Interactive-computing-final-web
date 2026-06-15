
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/P99SAfl7W/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let prevLabel = "";
  let trailMode = false;
  let resetFrames = 0;
  let originalEllipseSize = 30;
  let ellipseSize = originalEllipseSize;
  let ellipseX = 0;
  let ellipseY = 0;
  let trailLayer;
  let colorOptions = ['#ffffff', '#d43838', '#489bde', '#d8b02b', '#ba3897'];
  let selectedColorIndex = 0;
  let ellipseColor;

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json',{flipped: true});
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    ellipseX = width / 2;
    ellipseY = height / 2;
    ellipseColor = color(colorOptions[selectedColorIndex]);
    trailLayer = createGraphics(windowWidth, windowHeight);
    trailLayer.clear();
    // Create the video
    video = createCapture(VIDEO);
    scale(0.5);
    video.size(320, 240);
    video.hide();

    // flippedVideo = ml5.flipImage(video);
    // // Start classifying
    // classifyVideo();
    classifier.classifyStart(video, gotResult);
  }

  function draw() {
    background(0);

    // Trigger reset frames once when label first becomes "reset"
    if (label === 'reset' && prevLabel !== 'reset' && resetFrames === 0) {
      resetFrames = 3;
      trailLayer.clear();
    }
    prevLabel = label;

    if (resetFrames > 0) {
      resetFrames -= 1;
    }

    // Draw the video centered at the top of the canvas
    push();
    let scaledWidth = video.width * 0.5;
    let scaledHeight = video.height * 0.5;
    let videoX = width / 2 - scaledWidth / 2;
    image(video, videoX, 0, scaledWidth, scaledHeight);
    pop();

    image(trailLayer, 0, 0);

    // Draw instruction labels around the video
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text('click to draw', videoX + scaledWidth + 10, 10);
    text('show open hand to reset', videoX + scaledWidth + 10, 30);
    text('show fist to increase brush size', videoX + scaledWidth + 10, 50);

    // Draw only a mouse-following ellipse with smoothed motion
    let prevX = ellipseX;
    let prevY = ellipseY;
    let targetX = lerp(ellipseX, mouseX, 0.2);
    let targetY = lerp(ellipseY, mouseY, 0.2);

    if (label === 'shapes') {
      ellipseSize += 1;
    } else if (label === 'reset') {
      ellipseSize = originalEllipseSize;
    }

    let steps = 12;

    if (trailMode) {
      let trailLastX = prevX;
      let trailLastY = prevY;
      trailLayer.stroke(ellipseColor);
      trailLayer.strokeWeight(1);
      trailLayer.noFill();
      for (let i = 1; i <= steps; i++) {
        let t = i / steps;
        let interpX = lerp(prevX, targetX, t);
        let interpY = lerp(prevY, targetY, t);
        trailLayer.line(trailLastX, trailLastY, interpX, interpY);
        trailLastX = interpX;
        trailLastY = interpY;
      }

      trailLayer.noStroke();
      trailLayer.fill(ellipseColor);
      for (let i = 1; i <= steps; i++) {
        let t = i / steps;
        let interpX = lerp(prevX, targetX, t);
        let interpY = lerp(prevY, targetY, t);
        trailLayer.ellipse(interpX, interpY, ellipseSize * 0.5, ellipseSize * 0.5);
      }
    }

    let drawLastX = prevX;
    let drawLastY = prevY;
    stroke(ellipseColor);
    strokeWeight(1);
    noFill();
    for (let i = 1; i <= steps; i++) {
      let t = i / steps;
      let interpX = lerp(prevX, targetX, t);
      let interpY = lerp(prevY, targetY, t);
      line(drawLastX, drawLastY, interpX, interpY);
      drawLastX = interpX;
      drawLastY = interpY;
    }

    noStroke();
    fill(ellipseColor);
    for (let i = 1; i <= steps; i++) {
      let t = i / steps;
      let interpX = lerp(prevX, targetX, t);
      let interpY = lerp(prevY, targetY, t);
      ellipse(interpX, interpY, ellipseSize * 0.5, ellipseSize * 0.5);
    }

    ellipseX = targetX;
    ellipseY = targetY;

    let rectSizeUI = 40;
    let spacing = 10;
    let totalWidth = colorOptions.length * rectSizeUI + (colorOptions.length - 1) * spacing;
    let startX = width / 2 - totalWidth / 2;
    let rectY = height - rectSizeUI - 20;
    for (let i = 0; i < colorOptions.length; i++) {
      let x = startX + i * (rectSizeUI + spacing);
      stroke(255);
      strokeWeight(selectedColorIndex === i ? 3 : 1);
      fill(colorOptions[i]);
      rect(x, rectY, rectSizeUI, rectSizeUI, 6);
    }
  }

  function mouseClicked() {
    let rectSizeUI = 40;
    let spacing = 10;
    let totalWidth = colorOptions.length * rectSizeUI + (colorOptions.length - 1) * spacing;
    let startX = width / 2 - totalWidth / 2;
    let rectY = height - rectSizeUI - 20;
    for (let i = 0; i < colorOptions.length; i++) {
      let x = startX + i * (rectSizeUI + spacing);
      if (mouseX >= x && mouseX <= x + rectSizeUI && mouseY >= rectY && mouseY <= rectY + rectSizeUI) {
        selectedColorIndex = i;
        ellipseColor = color(colorOptions[selectedColorIndex]);
        return;
      }
    }
    trailMode = !trailMode;
  }

  // Get a prediction for the current video frame
  // function classifyVideo() {
  //   flippedVideo = ml5.flipImage(video)
  //   classifier.classify(flippedVideo, gotResult);
  //   flippedVideo.remove();

  // }

  // When we get a result
  function gotResult(results) {
    // If there is an error
    // if (error) {
    //   console.error(error);
    //   return;
    // }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    // classifyVideo();
  }