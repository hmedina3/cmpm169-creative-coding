let r;
let g;
let b;
let a;
let greenValue;

function setup() {
  createCanvas(400, 400);
  greenValue = color('#00ff00');
  background(0);
}

function draw() {
  r = random(255); 
  g = random(100,200); 
  b = random(100); 
  a = random(200,255);
  
  if (mouseIsPressed) {
    fill(r, g, b, a);
    scale(2);
  } else {
    fill(greenValue);
  }
  ellipse(mouseX, mouseY, 20, 20);
}