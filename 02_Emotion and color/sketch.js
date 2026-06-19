function setup() {
  createCanvas(1200, 1400);

}

function draw() {
  background(220);

  noStroke();
  //joy background
  let linearGradient1 = drawingContext.createLinearGradient(385, 140, 500, 810);
  linearGradient1.addColorStop(0, '#FFE41C');
  linearGradient1.addColorStop(1, '#FF6600');

  drawingContext.fillStyle = linearGradient1;
  rect(0,0,600,700);
  //sadness background
  let linearGradient2 = drawingContext.createLinearGradient(385, 140, 500, 810);
  linearGradient2.addColorStop(0, '#3954C0');
  linearGradient2.addColorStop(0.79, '#000413');

  drawingContext.fillStyle = linearGradient2;
  rect(600,0,600,700);

  //anger background
  let linearGradient3 = drawingContext.createLinearGradient(294, 700, 294, 1400);
  linearGradient3.addColorStop(0.42, '#000000');
  linearGradient3.addColorStop(1, '#FF0000');

  drawingContext.fillStyle = linearGradient3;
  rect(0,700,600,700);

  //fear background
  let linearGradient4 = drawingContext.createLinearGradient(900, 700, 900, 1400);
  linearGradient4.addColorStop(0.5, '#FFE500');
  linearGradient4.addColorStop(0.99, '#000000');

  drawingContext.fillStyle = linearGradient4;
  rect(600,700,600,700);

  //joy shape 1(main)

  let radialGradient = drawingContext.createRadialGradient(54+181, 153+239, 103.17, 54+181, 153+239, 181);
  radialGradient.addColorStop(0, '#FBFF00');
  radialGradient.addColorStop(1, '#FFFFFF32');

  drawingContext.fillStyle = radialGradient;
  beginShape();
  curveVertex(320.85,182.96);
  curveVertex(229.4,331.43);
  curveVertex(181.62,153);
  curveVertex(181.62,347.92);
  curveVertex(90.38,291.92);
  curveVertex(140.78,378.53);
  curveVertex(54.11,454.72);
  curveVertex(175.53,429.97);
  curveVertex(190.09,630.97);
  curveVertex(236.79,506.59);
  curveVertex(320.85,593.63);
  curveVertex(312.38,472.3);
  curveVertex(414.26,486.84);
  curveVertex(345.62,421.51);
  curveVertex(414.26,298.21);
  curveVertex(298.05,353.13);
  curveVertex(320.85,182.96);
  curveVertex(229.4,331.43);
  curveVertex(181.62,153);
  endShape();

  //joy shape 2(burst line top)
  let burst1 = drawingContext.createLinearGradient(385, 140, 500, 810);
  burst1.addColorStop(0, '#C8FF00');
  burst1.addColorStop(0.3, '#5BFFFF');

  drawingContext.fillStyle = burst1;
  beginShape();
  vertex(333,313.24);
  bezierVertex(356.74,208.28,465.35,-26.91,539.17,70.83);
  bezierVertex(590.56,138.87,524.73,156.25,509.37,131.8);
  bezierVertex(504.12,123.44,451.99,97.76,333,313.24);

  endShape();

  //joy shape 3(burst line bottom)

  let burst2 = drawingContext.createLinearGradient(19, 673, 161, 641);
  burst2.addColorStop(0, '#C8FF00');
  burst2.addColorStop(1, '#5BFFFF');

  drawingContext.fillStyle = burst2;
  beginShape();
  vertex(160.02,461);
  bezierVertex(91.27,501.46,-50.26,631.24,35.41,661.3);
  bezierVertex(95.06,682.22,92.46,631.82,71.73,626.49);
  bezierVertex(64.65,624.67,34.74,593.66,160.02,461);
  endShape();

  //joy shape 4(flare ellipse1)

  let flare1 = drawingContext.createRadialGradient(12+126/2, 163-126/2, 15, 12+126/2, 163-126/2, 80);
  flare1.addColorStop(0.14, '#5BFFFF');
  flare1.addColorStop(0.68, '#FFF1D010');
  flare1.addColorStop(0.8, '#FFFFFF00');

  drawingContext.fillStyle = flare1;
  ellipse(12+126/2,163-126/2,126);

  //joy shape 5 (flare ellipse 2)
  let flare2 = drawingContext.createRadialGradient(462+109/2,406+109/2, 10, 462+109/2,406+109/2, 80);
  flare2.addColorStop(0.14, '#5BFFFF');
  flare2.addColorStop(0.8, '#FFFFFF00');

  drawingContext.fillStyle = flare2;
  ellipse(462+109/2,406+109/2,109,109);

  //joy shape 6(flare ellipse 3)
  let flare3 = drawingContext.createRadialGradient(122+75/2,12+75/2, 10.5, 122+75/2,12+75/2, 60);
  flare3.addColorStop(0.14, '#5BFFFF');
  flare3.addColorStop(0.68, '#FFF1D056');
  flare3.addColorStop(0.8, '#FFFFFF00');
  drawingContext.fillStyle = flare3;
  ellipse(122+75/2,12+75/2,75);

  //joy shape7(flare ellipse4)
  let flare4 = drawingContext.createRadialGradient(372+40,606+40, 10.5, 372+40,606+40, 60);
  flare4.addColorStop(0.14, '#5BFFFF');
  flare4.addColorStop(0.68, '#FFF1D056');
  flare4.addColorStop(0.8, '#FFFFFF00');
  drawingContext.fillStyle = flare4;
  ellipse(372+40,606+40,80);

  //joy shape8(flare ellipse5)
  let flare5 = drawingContext.createRadialGradient(246+55/2,136+55/2, 5, 246+55/2,136+55/2, 35);
  flare5.addColorStop(0.14, '#5BFFFF');
  flare5.addColorStop(0.68, '#FFF1D010');
  flare5.addColorStop(0.8, '#FFFFFF00');
  drawingContext.fillStyle = flare5;
  ellipse(246+55/2,136+55/2,55);

  //sad shape (main)
  
  let sad1 = drawingContext.createLinearGradient(877.5, 71, 877.5, 535);
  sad1.addColorStop(0.24, '#6E9CC6DC');
  sad1.addColorStop(0.52, '#233DA4');
  sad1.addColorStop(0.75, '#4F137A');
  drawingContext.fillStyle = sad1;

  beginShape();
  vertex(1011.79,118.31);
  bezierVertex(929.94,62.49,917.95,137,908.53,159.7);
  bezierVertex(899.11,182.4,896.18,247.22,846.94,176.99);
  bezierVertex(797.7,106.75,748.89,86.62,710.78,124.74);
  bezierVertex(672.67,162.85,746.74,181.7,761.3,223.66);
  bezierVertex(775.86,265.63,710.35,257.92,724.05,299.89);
  bezierVertex(737.75,341.86,781.86,315.74,801.55,336.72);
  bezierVertex(821.25,357.71,795.99,518.73,828.1,527.72);
  bezierVertex(860.21,536.72,822.39,323.57,864,317.3,);
  bezierVertex(905.6,311.03,887.12,367.83,899.96,371.69);
  bezierVertex(912.81,375.54,895.75,329.87,933.01,335.01);
  bezierVertex(970.26,340.15,947.71,462.64,968.55,470.77);
  bezierVertex(989.38,478.89,979.04,397.56,998.09,378.26);
  bezierVertex(1008.06,368.17,1031.55,365.04,1040.84,378.26);
  bezierVertex(1049.3,390.31,1043.82,418.01,1047.76,425.37);
  bezierVertex(1056.02,440.81,1064.46,392.82,1065.32,367.99);
  bezierVertex(1066.17,343.15,1114.98,304.18,1093.58,270.34);
  bezierVertex(1072.17,236.51,1027.63,275.48,1010.08,260.49);
  bezierVertex(992.52,245.51,1093.65,174.14,1011.79,118.31);
  endShape();

  //anger shape (triangles top)

  let tri1 = drawingContext.createLinearGradient(300, 700, 300, 1050);
  tri1.addColorStop(0, '#FF0101');
  tri1.addColorStop(0.8, '#3a0505');
  drawingContext.fillStyle = tri1;

  beginShape();
  vertex(0,700);
  vertex(75,1050);
  vertex(150,700);
  vertex(225,1050);
  vertex(300,700);
  vertex(375,1050);
  vertex(450,700);
  vertex(525,1050);
  vertex(600,700);
  endShape(CLOSE);

  //anger shape (triangle bottom)

  let tri2 = drawingContext.createLinearGradient(300, 1050,300,1400);
  tri2.addColorStop(0, '#3a0505');
  tri2.addColorStop(0.8, '#FF0101');
  drawingContext.fillStyle = tri2;

  beginShape();
  vertex(0,1400);
  vertex(75,1050);
  vertex(150,1400);
  vertex(225,1050);
  vertex(300,1400);
  vertex(375,1050);
  vertex(450,1400);
  vertex(525,1050);
  vertex(600,1400);
  endShape(CLOSE);

  //fear (hand 1)

  let hand1 = drawingContext.createLinearGradient(743.83, 893.87,796,1092);
  hand1.addColorStop(0.23, '#000000');
  hand1.addColorStop(1, '#FFE50000');
  drawingContext.fillStyle = hand1;
  beginShape();
  vertex(821.85,1203.05);
  bezierVertex(818.7,1203.59,734.64,971.72,731,959);
  bezierVertex(727.36,946.28,706.27,904.59,743.83,893.87);
  bezierVertex(781.38,883.15,784.03,921.96,785.5,929.5);
  bezierVertex(786.97,937.04,825,1202.5,821.85,1203.05);
  endShape();

  //fear (hand2)
  let hand2 = drawingContext.createLinearGradient(812.21,778.69,832,980);
  hand2.addColorStop(0.23, '#000000');
  hand2.addColorStop(1, '#FFE50000');
  drawingContext.fillStyle = hand2;
  beginShape();
  vertex(842.57,1096.11);
  bezierVertex(839.37,1096.17,791.35,854.25,789.68,841.13);
  bezierVertex(788.01,828.01,773.46,783.61,812.21,778.69);
  bezierVertex(850.95,773.77,847.7,812.54,848.01,820.21);
  bezierVertex(848.32,827.88,845.77,1096.04,842.57,1096.11);

  endShape();

  //fear (hand3)
  let hand3 = drawingContext.createLinearGradient(915.29,735.71,914.33,923.5);
  hand3.addColorStop(0.23, '#000000');
  hand3.addColorStop(1, '#FFE50000');
  drawingContext.fillStyle = hand3;
  beginShape();
  vertex(914.33,1054.57);
  bezierVertex(911.14,1054.32,887.11,808.86,886.73,795.63);
  bezierVertex(886.36,782.41,876.24,736.8,915.29,735.71);
  bezierVertex(954.33,734.62,947.28,772.88,946.84,780.55);
  bezierVertex(946.4,788.21,917.51,1054.83,914.33,1054.57);
  endShape();

  //fear (hand4)
  let hand4 = drawingContext.createLinearGradient(1023.78,802.99,988,1014);
  hand4.addColorStop(0.23, '#000000');
  hand4.addColorStop(1, '#FFE50000');
  drawingContext.fillStyle = hand4;
  beginShape();
  vertex(969.2,1117.16);
  bezierVertex(966.1,1116.37,983.7,870.36,985.55,857.26);
  bezierVertex(987.41,844.17,985.11,797.5,1023.78,802.99);
  bezierVertex(1062.45,808.48,1049.07,845.02,1047.34,852.5);
  bezierVertex(1045.62,859.98,972.3,1117.94,969.2,1117.16);
  endShape();

  //fear (hand5)
  let hand5 = drawingContext.createLinearGradient(1117.66,1039.82,975.5,1092);
  hand5.addColorStop(0.23, '#000000');
  hand5.addColorStop(1, '#FFE50000');
  drawingContext.fillStyle = hand5;
  beginShape();
  vertex(888.88,1261.94);
  bezierVertex(886.83,1259.49,1045.64,1070.78,1054.84,1061.27);
  bezierVertex(1064.03,1051.76,1089.6,1012.66,1117.66,1039.82);
  bezierVertex(1145.72,1066.99,1113.42,1088.69,1107.63,1093.73);
  bezierVertex(1101.84,1098.77,890.93,1264.4,888.88,1261.94);
  endShape();

  //fear (hand-palm)
  let hand6 = drawingContext.createLinearGradient(833.5,1238.07,900,1152);
  hand6.addColorStop(0.23, '#000000');
  hand6.addColorStop(1, '#FFE50000');
  drawingContext.fillStyle = hand6;
  beginShape();
  vertex(903.5,1118.5);
  bezierVertex(972,1151,976.5,1200.5,962,1227.5);
  bezierVertex(947.5,1254.5,920,1260.5,897.5,1261.5);
  bezierVertex(875,1262.5,831.5,1243,812,1219);
  bezierVertex(792.5,1195,787,1177.5,787,1152);
  bezierVertex(787,1126.5,835,1086,903.5,1118.5);
  endShape();
}

