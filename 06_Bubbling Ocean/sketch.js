let vine =[];
let colorpallete = ['#E7ECEFCD','#A3CEF1DF','#6096BABB'];


function setup() {
  createCanvas(windowWidth, windowHeight);

}

function mouseMoved(){
  for (let i=0; i<2;i++){
    vine.push(new Vine(mouseX + random(-100, 180), mouseY + random(-100, 180)));
  }
}

function draw() {  
  background('#274C77AC');
  for (let i=0; i<vine.length; i++){
    let v = vine[i];
    if(v.isDone()){
      vine.splice(i, 1);
    } else {
      v.show();
      v.update();
    }
  }

}

class Vine{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.d = ceil(random(10,90));
    this.dx = 0;
    this.dy = 0;
    this.px = this.x;
    this.py = this.y;
    this.color = random(colorpallete);
  }

  show(){
    noFill();
    stroke(this.color);
    strokeWeight(0.8);
    ellipse(this.x, this.y, this.d, this.d);
  }

  update(){
    this.px = this.x;
    this.py = this.y;


    this.x += this.dx;
    this.y += this.dy;

    this.dx *= random (0.998,0.995);
    this.dx += random(-0.045,0.07);
    this.dy += random(-0.05,-0.075);
}

isDone(){
  if (this.x > width + 30 || this.x < -30 || this.y > height + 30 || this.y < -100){
    return true;
  } else {
    return false;
  }

}
}

