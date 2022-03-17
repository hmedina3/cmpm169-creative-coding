let dragon;

let dragonImg;
let arrowImg;
let meatImg;
let backgroungImg;

let arrows;
let meats;

let score;
let scoreFont;
let resetButtonFont;
let gameoverFont;
let UIText;
let scoreText;
let GameOverText;
let RestartButtonText;
let fadeText;
let fadeAmount;

let soundClassifier;
let background_audio;
let gameover_audio;
let voiceover_audio;
let BiteSFX;
let FlySFX;
let HighFlyBoostSFX;
let ButtonPressSFX;

let resetButton;
let timerinSeconds;
let interval;

function preload(){
  
   dragonImg = loadImage('frame-1.png');
   arrowImg = loadImage('Arrow.png');
   meatImg = loadImage('Ham_Meat.png');
   backgroundImg = loadImage('landscape.png');
   song = loadSound("Background_music.mp3");
   gameover_audio = loadSound("GameOver_Audio.wav");
   voiceover_audio = loadSound("GameOverVoiceOver_Audio.mp3");
   BiteSFX = loadSound("Biting_SFX.mp3");
   FlySFX = loadSound("Flying_SFX.mp3");
   HighFlyBoostSFX = loadSound("HighFlyBoost_SFX.mp3");
   ButtonPressSFX = loadSound("ButtonPress_SFX.wav");
 
   gameoverFont = loadFont('Gill Sans.otf');
   scoreFont = loadFont('Gill Sans.otf');
   resetButtonFont = loadFont('Gill Sans.otf');

}

function setup() {
  createCanvas(600, 450);
  startGame();
}

function startGame(){

  arrows = [];
  meats = [];

  UIText = "FEED ME."
  scoreText ="Score: "
  GameOverText ="Game Over !"
  RestartButtonText = "Restart game?"

  textFont(scoreFont);
  textSize(32);
  textAlign(LEFT, TOP);
  
  fadeText = 0;
  fadeAmount = 1;
  score = 0;
  dragon = new Dragon();
  
  const options = {probablityThreshold: 0.95};
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
  // loops and plays background audio at the start of the scene.
  song.loop();
  song.setVolume(0.1);
  timerinSeconds = 2;
}

function modelReady(){
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results){
  if(error){
    console.error(error);
    return;
  }
  //console.log(results[0].label, results[0].confidence);
  if(results[0].label == 'go'){
    dragon.superjump();
    // play audio effect
        HighFlyBoostSFX.play();
        HighFlyBoostSFX.setVolume(0.1);
  } 
}

function keyPressed(){
  if(key == ' '){
    dragon.jump();
     // play audio effect
        FlySFX.play();
        FlySFX.setVolume(0.1);
  }
} 

function draw(){
  background(backgroundImg);
  //animation(sequenceAnimation, 100, 100);
  
  // translate(this.dragon);
  fill(0, 0, 0, fadeText);
  text("(Press spacebar to fly.)", 100, 100);
  if(fadeText>255){
    fadeAmount = -2;
  }
  fadeText += fadeAmount;
  
  if(score == 0){
  // score UI
  fill('#222222');
  text(UIText, 50, 50);
  }
  
  if(score > 0){
    // score UI
  fill('orange');
  text(scoreText + score, 50, 20);
    
  }
 
  // dragon set-up
  dragon.show();
  dragon.move();
  
  // pushes assets onto scene
 if(random(1) < 0.005){
   arrows.push(new Arrows());
  }
  if(random(2) < 0.01){
  meats.push(new Meats());
  }
   // score tracker for meat collected
  for(let m of meats){
    m.move();
    m.show();
    if(dragon.collects(m)){
      score++;
      console.log("SCORE: ",score);
      // play audio effect
      BiteSFX.play();
      BiteSFX.setVolume(0.1);
      // destroys object at the beginning of array
      meats.shift();
    }
    // removes 1 element from the array, starting at position 0.
    if(m.outofBounds()){
     // console.log("Meat deleted due to out of bounds function.");
      meats.splice(0,1);

    }

  }

  for(let a of arrows){
    a.move();
    a.show();
    
  if(dragon.hits(a)){
   console.log("Game Over.");
    turnoffscoreText = true;
    gameover_audio.play();
    gameover_audio.setVolume(0.1);
    voiceover_audio.play();
    voiceover_audio.setVolume(0.2);
    // gameover - UI
     textFont(gameoverFont);
     textSize(48);
     fill('red');
     textAlign(CENTER, CENTER);
     text(GameOverText, 300, 150);
    // creates restart button with specific styles.
     resetButton = createButton(RestartButtonText);
     resetButton.style('color', '#FFFFFF');
     resetButton.style('background-color', '#003366');
     resetButton.style('font-family', resetButtonFont);
     resetButton.style('font-size', '16px');
     resetButton.style('width', '150px');
     resetButton.style('border', '1px solid black');
     resetButton.style('border-radius', '12px');
     resetButton.position(215,200);
     resetButton.mousePressed(setTimer);
    song.stop(); 
    // shuts game down.
    noLoop();
  }

  
 }

 function EndSketch(){
     startGame();
     loop();
     resetButton.remove();
 }

 function setTimer(){
  resetButton.style('color', '#FFFFFF');
  resetButton.style('background-color', '#32CD32');
  // play audio effect
  ButtonPressSFX.play();
  ButtonPressSFX.setVolume(0.1); 
   // three second timer;
  interval = setInterval(timer, 1000);
 }

 function timer(){
   if(timerinSeconds > 0){
     timerinSeconds--;
     console.log(timerinSeconds);
   }

   if(timerinSeconds == 0){
     clearInterval(interval);
     EndSketch();
   }
 }


}// end of sketch. js