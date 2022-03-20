let angle;
let cubes = [];
let x, y, z;
let mX, mY;
let size;

let colorBool;

let clearButton;

let textureImage;

function preload(){
  textureImage = loadImage("wallpaper-texture.jpg");
}

function setup() {
  createCanvas(400, 400, WEBGL);
  x = 0;
  y = 0;
  z = 0;
  
  size = 30;
  colorBool = false;
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  
}

function clearCanvas() {
  for(let i = 0; i< cubes.length; i++){
    // remove every object in the cubes array 
    cubes.splice(0, cubes.length);
    size = 30;
    colorBool = false;
  }
  console.log("Cube deleted.");
  background(0);
}

function draw() {
  background(0);
  // values - pointLight(v1, v2, v3, x, y, z)
  // left light
  pointLight(50, 205, 50, -200, 0, 0);
  // right light - green
  pointLight(50, 205, 50, 0, 200, 0);
  // top-left light - blue
  pointLight(50, 205, 55, 0, 0, 0);
  // top-right light - blue
  pointLight(0, 0, 255, 400, 0, 0);
  // top-center light - green
  pointLight(50, 205, 50, 188, 0, 0);
  // bottom-center light - green
  pointLight(0, 0, 255, 188, 400, 0);
  // bottom-left light - blue
  pointLight(0, 0, 255, 0, 400, 0);
  // bottom-right light - blue
  pointLight(0, 0, 255, 400, 400, 0);
  // reflects white light.
  //ambientLight(220,20,60);
  mX = mouseX;
  mY = mouseY;
  //console.log(mouseX, mouseY);
   for(let i = 0; i< cubes.length; i++){
    cubes[i].rotate();
    cubes[i].texture(textureImage);
    cubes[i].display(mX, mY, size, colorBool);
  }
 
}

function keyPressed(){
  if(key == ' '){
    console.log("Cube scaled.");
    size += 5;
  }
  if(keyCode == ENTER){
    colorBool = true;
  }
  if(keyCode == SHIFT){
    colorBool = false;
  }
} 

function mousePressed(){
    cubes.push(new Cube());
    console.log("Cube made.");
}