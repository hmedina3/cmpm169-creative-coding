let song_1;
let song_2;
let song_3;

let mic, recorder, soundFile;
let state = 0;
let RecordingBool;

let introText;
let introText_2;
let introText_3;
let xText;
let yText;

let fade;
let fadeAmount;
let intro3_fade;
let intro3_fadeAmount;
let background_fade; 
let timerinSeconds;
let interval;

let x = 320;
let y = 180;
let xSpeed = 5;
let ySpeed = 2;

let r = 25;
let r_1;
let g; 
let b;
let a;
let colorBool;

let cat_gif;

function preload(){
  song_1 = loadSound("Charlotte_Edit.mp3");
  song_2 = loadSound("Gaming-racing_Edit.mp3");
  song_3 = loadSound("The-Lone-Wolf_Edit.mp3"); 
  cat_gif = loadImage("pixel_cat.gif");
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.mousePressed(canvasPressed);
  // create an audio in
  mic = new p5.AudioIn();
   // prompts user to enable their browser mic
  mic.start();
  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  RecordingBool = true;
  
  textFont("Impact");
  textSize(20);
  
  introText = "Record your introduction!"
  introText_2 = "Click the screen when ready!"
  introText_3 = "The show is about to begin..."

  xText = 80;
  yText = 200;
  fadeAmount = 1;
  fade = 0;
  intro3_fade = 0;
  intro3_fadeAmount = 1;
  background_fade = 0;
  
  colorBool = true;
  
  timerinSeconds = 2;
  Timer();
  song_1.play();
}

function draw() {
  background(255);
  if(colorBool){
  r_1 = random(255,255); 
  g = random(0,200); 
  b = random(0,100); 
  a = random(0,255);}
  else{
   r_1 = 255; 
      g = 204; 
      b = 255;
    xSpeed = 3;
    ySpeed = 1;
  }
  
  fill(0);
  text(introText, 90, 100);
  
  if(timerinSeconds == 0){
     fill(0,fade);
     text(introText_2, xText, yText);
     if (fade < 0) fadeAmount = 1; 
     fade += fadeAmount; 
   }
  
  if(song_1.currentTime() > 30){
    
     fill(0,intro3_fade);
     text(introText_3, 90 , 300);
     if (intro3_fade < 0) intro3_fadeAmount = 2; 
     if (intro3_fade > 255) intro3_fadeAmount= -2; 
      intro3_fade += intro3_fadeAmount;
  }
  
  if(song_1.currentTime() > 45){
    intro3_fade = 0;
    playRecording();
  }
  
  if(song_1.currentTime() > 67){
     playSong_2();
  }
  if(song_2.currentTime() > 20){
    fill(r_1, g, b, a);
    ellipse(x, y, r*2, r*2);
    x += xSpeed;
    y += ySpeed;
    if (x > width - r || x < r) {
      xSpeed = -xSpeed;
    }
    if (y > height - r || y < r) {
      ySpeed = -ySpeed;
    }   
  }
   if(song_2.currentTime() > 79){
      playSong_3();
      image(cat_gif,40,240);
      cat_gif.play();
     colorBool = false;
   }
  if(song_3.currentTime() >= 40.5){
    song_2.stop();
    song_3.stop();
    cat_gif.pause();
    
     if (background_fade <= 255){
      background_fade += 0.5;
    }
      tint(255, background_fade);
      background(0);
     // setTimeout(function(){ remove();}, 3000);
  }
  
}

function canvasPressed(){
  // ensure audio is enabled
  userStartAudio();
  if (state === 0 && mic.enabled) {
     recorder.record(soundFile);
     background(255,0,0);
     xText = 75;
     introText_2 = "\t\t\t\t\t\t\t\t\t\tRecording... \n(Click the screen when done.)";
    state++;
  }
   else if (state === 1) {
    background(0,255,0);
     recorder.stop();
     xText = 170;
     introText_2 = "Done!"
     state++;
   }
   else if (state === 2) {
    state++;
  }
}

function playRecording(){
  if(!soundFile.isPlaying() && RecordingBool){
   soundFile.play();
   soundFile.setVolume(2); 
  }
  RecordingBool = false;
}

function playSong_2(){
  if(!song_2.isPlaying() && !song_3.isPlaying()){
     song_2.play();
     song_2.setVolume(0.5);
  }
}

function playSong_3(){
   if(!song_3.isPlaying()){
     song_3.play();
   }
}

 function Timer(){
   // one second rate in milliseconds;
  interval = setInterval(timer, 1000);
 }

 function timer(){
   if(timerinSeconds > 0){
     timerinSeconds--;
   }
 }