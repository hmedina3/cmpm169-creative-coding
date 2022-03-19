
let symmetry = 20;
let angle = 360 / symmetry;
let clearButton;
let changeofColorOvertime = 0;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  background(0);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  colorMode(HSB);
}

function clearCanvas() {
  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // mouse position related to the center.
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      let colorChanger = noise(changeofColorOvertime) * 255;
      changeofColorOvertime += 0.1;
      stroke(colorChanger, 255, 100, 100);
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        shearY(angle);
        let distanceFromCenter = dist(mx, my, pmx, pmy);
        let WeightofStroke = map(distanceFromCenter, 0, 16, 16, 2);
        strokeWeight(WeightofStroke);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
         shearX(angle);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}