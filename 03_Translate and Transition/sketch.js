
let rad1 = 0,
	rad2 = 0,
  rad3 = 0;

function setup() {
 	createCanvas(windowWidth, windowHeight);
	x = width/2;
	y = height/2;
}

function draw() {
  background('#FFD500');
  noStroke();



  for (let x = 0; x< width+200; [x+= 400]) {
    for(let y = 0; y< height+200; y+= 400) {
      push();
      translate(x,y);
      rotate(rad2);
      fill('#2651C0');
      scale(1.3);
      beginShape();
      vertex(80,-147);
      vertex(-93.5,-97.5);
      vertex(-174,40.5);
      vertex(-22,209.5);
      vertex(144,118);
      vertex(174.5,-6.5);
      vertex(80,-147);
      endShape();
      pop();
    }
  }
  for (let x = 0; x < width+200; [x += 200]) {
		for (let y = 0; y < height+200; y += 200) {
			push();
			translate(x, y);
			rotate(rad3);
			fill('#FB5219');
      scale(0.9);
			beginShape();
			vertex(45.86,-64.31);
      vertex(-0.5,-207);
      vertex(-46.86,-64.31);
      vertex(-196.89,-64.31);
      vertex(-75.52,23.87);
      vertex(-121.88,166.56);
      vertex(-0.5,78.38);
      vertex(120.88,166.56);
      vertex(74.52,23.87);
      vertex(195.89,-64.31);
      vertex(45.86,-64.31);
			endShape();
			pop();

		}
	}
    for (let x = 0; x < width+200; [x += 220]) {
		for (let y = 0; y < height+200; y += 220) {
			push();
			translate(x, y);
			rotate(rad1);
			fill('#1c684e');
      scale(0.9);
			beginShape();
			vertex(-27,-197);
      vertex(-80,-0.5);
      vertex(-24,196);
      vertex(+118.5,144);
      vertex(+78,-0.5);
      vertex(+113,-144.5);
      vertex(-27,-197);
			endShape();
			pop();

		}
	}
for (let x = 0; x < width +200; x+=220){
  for (let y = 0; y< height +200; y+= 220) {
    push();
    translate(x,y);
    rotate(rad1);
    fill('#4CDA4C10');
    scale(3);
    beginShape();
    vertex(24,-44);
    vertex(50,60);
    vertex(-67,89);
    vertex(24,-44);
    endShape();
    pop();

  }

 
}


    
	rad1 += PI / 270;
	rad2 -= PI / 300;
  rad3 -= PI / 250;

}

