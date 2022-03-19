let facemesh;
let video;
let predictions = [];

let AI_welcome_audio;
let AI_code_green;
let scanningAI_voiceover_audio;
let scanningSFX;
let initiating_sequenceSFX;
let CountDownSFX;
let installation_completeSFX;
let goodDaySFX;
let goodByeSFX;

let scanningBool = false;

let r, g, b, a;
let countDown_0, countDown_1, countDown_2;
let countDown_3, countDown_4, countDown_5;
let currentNumber;
let countDownActivated = false;
let Exploding_gif;
let Exploding_gif_audio;

let x = false;

let timerinSeconds;
let interval;
let timerinSecondsforScan;
let intervalForScan;

let SecondsforCount;
let intervalForCountDown;


let voiceCommandsText;
let soundClassifier;

let singleGo = true;
let singleYes = true;
let singleStop = true;

function preload(){
  
  scanningSFX = loadSound("Scanning_1.mp3");
  scanningAI_voiceover_audio = loadSound("Scanning_voice.mp3");
  AI_welcome_audio = loadSound("science_fiction_system_welcome.mp3");
  AI_code_green = loadSound("code_green.mp3");
  initiating_sequenceSFX = loadSound("initiating_sequence.mp3");
  CountDownSFX = loadSound("impact_Countdown.wav");
  installation_completeSFX = loadSound("installation_complete.mp3");
  goodDaySFX = loadSound("have_a_good_day.mp3");
  goodByeSFX = loadSound("AI_goodbye.mp3");
  
 // countDown_0 = loadImage("Number0.png");
  countDown_1 = loadImage("Number1.png");
  countDown_2 = loadImage("Number2.png");
  countDown_3 = loadImage("Number3.png");
  countDown_4 = loadImage("Number4.png");
  countDown_5 = loadImage("Number5.png");
  
  // Exploding gif
  Exploding_gif = loadImage('Paint_explosions.gif');
  Exploding_gif_audio = loadSound("Epic_Song.mp3");
  
}

function setup() {
  createCanvas(640, 480);
  // text set-up
   voiceCommandsText ="Voice Commands:\n 1) GO\n 2) YES\n 3) STOP\n";
   textSize(16);
  // textAlign(LEFT, BOTTOM);
  // createCanvas(1024, 768);
  frameRate(60);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  // place facemesh on camera
  facemesh = ml5.facemesh(video, modelReady);
  
  facemesh.on("predict", results =>{
    predictions = results;
  })
  // activates voice commands
  const options = {probablityThreshold: 0.97};
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
  
  // image resizes
  // countDown_0.resize(50, 50);
  countDown_1.resize(100, 100);
  countDown_2.resize(100, 100);
  countDown_3.resize(100, 100);
  countDown_4.resize(100, 100);
  countDown_5.resize(100, 100);
  Exploding_gif.resize(640, 480);
  
  // hides original camera.
  video.hide();
  // all starting values for timers used.
  timerinSeconds = 5;
  timerinSecondsforScan = 5;
  SecondsforCount = 5;
} 

function modelReady() {
  console.log("Model ready!");
  soundClassifier.classify(gotCommand);
  scanningBool = true;
  setup_Timer();
  scanningAI_voiceover_audio.play();
  scanningAI_voiceover_audio.setVolume(0.5);
  document.getElementById("h1").innerHTML = "Interactive AI with Machine Learning";
}

function gotCommand(error, results){
  if(error){
    console.error(error);
    return;
  }
  //console.log(results[0].label, results[0].confidence);
  if(results[0].label == 'go' && singleGo){
    // play audio effect
        initiating_sequenceSFX.play();
        initiating_sequenceSFX.setVolume(0.5);
        singleGo = false;
        setTimeout(function(){setCountDown();}, 2000); 
  }
  if(results[0].label == 'yes' && singleYes){
      singleYes = false;
      x = true;
      installation_completeSFX.play();
      installation_completeSFX.setVolume(0.5);
    
     }
  if(results[0].label == 'stop' && singleStop){
        singleStop = false;
        goodDaySFX.play();
        goodDaySFX.setVolume(0.5);
    // plays audio after three seconds;
     setTimeout(function(){
      Exploding_gif_audio.stop(); 
      goodByeSFX.play();
      goodByeSFX.setVolume(0.5); // shuts app down.
                           remove();}, 2000); 
     }
  }

function playgif_Audio(){
  if(!Exploding_gif_audio.isPlaying()){
     Exploding_gif_audio.play();
     Exploding_gif_audio.setVolume(0.5);
  }
}

function setCountDown(){
  countTimer();
  CountDownSFX.play();
  CountDownSFX.setVolume(0.5);
  countDownActivated = true;
}

function draw() {  
  
  if(scanningBool){
  // used to generate random colors for facemesh
    r = random(255); 
    g = random(100,200); 
    b = random(100); 
    a = random(200,255);
   }
  else{
    // sets face mesh to white.
    r = 255;
    g = 255;
    b = 255;
    a = 255;
  }
   //tint(255);
  // Draws the video
  video.loadPixels();
  image(video, 0, 0, width, height);
  if(countDownActivated){
    //currentNumber = countDown_5;
   // image(currentNumber, 100, 100);
     if(SecondsforCount == 5){ image(countDown_5, 100, 100);}
     if(SecondsforCount == 4){ image(countDown_4, 100, 100);}
     if(SecondsforCount == 3){ image(countDown_3, 100, 100);}
     if(SecondsforCount == 2){ image(countDown_2, 100, 100);}
     if(SecondsforCount == 1){ image(countDown_1, 100, 100);}
     if(SecondsforCount == 0){
       // timer gets shut down and numbers are removed from screen.
       clearInterval(intervalForCountDown);
       countDownActivated = false;
     }
  }
  // draw gif
  if(SecondsforCount == 0){
    image(Exploding_gif,0,0);
    Exploding_gif.play();
    playgif_Audio();
  }
  
  
  if(x){filter(GRAY);}
  
  if(timerinSeconds == 0 && timerinSecondsforScan != 0){
     drawFaceMesh();
     //scanningSFX.play();
     clearInterval(interval);
   }
  
  if(timerinSecondsforScan == 0 && scanningBool){
     AI_code_green.play();
     AI_code_green.setVolume(0.5);
    // plays audio after two seconds;
     setTimeout(function(){AI_welcome_audio.play(); 
                           AI_welcome_audio.setVolume(0.5);}, 2000); 
     clearInterval(intervalForScan);
     scanningBool = false;
  }
  
  if(timerinSecondsforScan == 0 && !scanningBool){
    fill(255);
    text(voiceCommandsText, 20, 50);
  }
  
   
}



function drawFaceMesh(){
  
  for(let i = 0; i< predictions.length; i+=1){
    const keypoints = predictions[i].scaledMesh;
    
    for(let j = 0; j < keypoints.length; j += 1){
      const [x, y] = keypoints[j];
      
      //fill(0, 255, 0);
      fill(r, g, b, a);
      ellipse(x, y, 5, 5);
           
    }
  }
}

// timer to set-up scene.
 function setup_Timer(){
   // three second timer;
  interval = setInterval(timer, 1000);
 }

 function timer(){
   if(timerinSeconds > 0){
     timerinSeconds--;
     console.log(timerinSeconds);
   }
   if(timerinSeconds == 0){
     stopScanTimer();
   }
 }

// timer for first face scan.
function stopScanTimer(){
   // three second timer;
  intervalForScan = setInterval(timerForScan, 1000);
 }

 function timerForScan(){
   if(timerinSecondsforScan > 0){
     timerinSecondsforScan--;
     console.log(timerinSecondsforScan);
   }
 }

// CountDown timer - countTimer, timerforCountDown, intervalForCountDown, SecondsforCount
 function countTimer(){
   // one second timer;
  intervalForCountDown = setInterval(timerforCountDown, 1000);
 }

 function timerforCountDown(){
   if(SecondsforCount > 0){
     SecondsforCount--;
     console.log(SecondsforCount);
   }
 }