let line1;
let line2;
let line3;

let line1_fade;
let line1_fadeAmount;
let line2_fade;
let line2_fadeAmount;
let line3_fade;
let line3_fadeAmount;

let gif_fade;
let Lights_gif;

let timerinSeconds;
let interval;
let savedTime; 

let background_audio;

function preload(){
    background_audio = loadSound("Serena.mp3");
  // Ray of Lights gif
  Lights_gif = loadImage('RayofLights.gif');
}

function setup() {
  createCanvas(400, 400);
  
  line1 = "A kid from south central...";
  line2 = "Earns peace and sucess from light";
  line3 = "The light, lights new paths.";
  
  textFont("Century Gothic");
  textSize(14);
  
  line1_fadeAmount = 1;
  line1_fade = 0;
  line2_fadeAmount = 1;
  line2_fade = 0;
  line3_fadeAmount = 1;
  line3_fade = 0;
  gif_fade = 0;
  // image resize
  Lights_gif.resize(300, 150);
  
  timerinSeconds = 20;
  Timer();
  
  background_audio.loop();
  background_audio.setVolume(0.1);
}

function draw() {
  background(0);
  // line 1
  fill(255,line1_fade);
  text(line1, 100, 100);
  if (line1_fade < 0) line1_fadeAmount=1; 
  line1_fade += line1_fadeAmount; 
  // starts timer for second line.
  if(timerinSeconds == 10){
    savedTime = timerinSeconds;
  }
  if(savedTime == 10){
     fill(255, line2_fade);
     text(line2, 100, 150);
     if (line2_fade < 0) line2_fadeAmount = 1;
     line2_fade += line2_fadeAmount;
  }
  
  // starts timer for third line.
  if(timerinSeconds == 0){
     fill(255, line3_fade);
     text(line3, 100, 200);
     if (line3_fade < 0) line3_fadeAmount = 1;
     line3_fade += line3_fadeAmount;
     clearInterval(interval);
    if (gif_fade <= 255){
      gif_fade += 0.5;
    }
      tint(255, gif_fade);
      image(Lights_gif,50,240);
      Lights_gif.play();
  }
}

// timer to set-up next line in haiku.
 function Timer(){
   // one second rate in milliseconds;
  interval = setInterval(timer, 1000);
 }

 function timer(){
   if(timerinSeconds > 0){
     timerinSeconds--;
   }
 }