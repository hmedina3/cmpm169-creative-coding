let comicbookFilter;
let comicbookHello;
let comicbookBang;
let comicbookPow;
let comicbookWow;

let fadeEffect;
let bangfadeEffect;
let powfadeEffect;
let wowfadeEffect;

function preload(){
  comicbookFilter = loadImage("Comicbook_filter.png");
  //comicbookFilter = loadImage("Comicbook_filter_2.png");
  comicbookHello = loadImage("hello-comic-bubble.png");
  comicbookBang = loadImage("bang-comic-book.png");
  comicbookPow = loadImage("comic-pow-bubble.png");
  comicbookWow = loadImage("comic-book-wow-bubble.png");
}

function setup() {
  
  createCanvas(1024, 768);
  //comicbookFilter = createGraphics(1024, 768);
  frameRate(60);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  // hides original camera.
  video.hide();
  // image resizes
  comicbookHello.resize(300, 300);
  comicbookBang.resize(300, 300);
  comicbookPow.resize(350, 300);
  comicbookWow.resize(400, 300);
}

function draw() {
   tint(255);
  // Draws the video
  video.loadPixels();
  image(video, 0, 0, width, height);
  image(comicbookFilter, 0,0, width, height);
     
  if(fadeEffect > 0 ){
    tint(255, fadeEffect);
    image(comicbookHello, 500, 5);
    fadeEffect -=5;
  }
  if(bangfadeEffect > 0 ){
    tint(255, bangfadeEffect);
    image(comicbookBang, 0, 0);
    bangfadeEffect -=5;
  }
  if(powfadeEffect > 0 ){
    tint(255, powfadeEffect);
    image(comicbookPow, 0, 250);
    powfadeEffect -=5;
  }
  if(wowfadeEffect > 0 ){
    tint(255, wowfadeEffect);
    image(comicbookWow, 200, 0);
    wowfadeEffect -=5;
  }
  
}

function keyPressed(){
  if(key == ' '){
    fadeEffect = 255;
  }
  if(keyCode == ENTER){
    bangfadeEffect = 255;
  }
  if(keyCode == SHIFT){
    powfadeEffect = 255;
  }
  if(keyCode == BACKSPACE){
    wowfadeEffect = 255;
  }
} 