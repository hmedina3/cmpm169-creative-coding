let dragon;

let dragonImg;
let arrowImg;
let meatImg;
let backgroungImg;

let arrows = [];
let meats = [];

let score = 0;
let scoreFont;
let gameoverFont;
let UIText ="FEED ME."
let scoreText ="Score: "
let GameOverText ="Game Over !"
let fadeText;
let fadeAmount = 1;

let soundClassifier;
let background_audio;
let gameover_audio;
let voiceover_audio;
let BiteSFX;
let FlySFX;
let HighFlyBoostSFX;

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
 
   gameoverFont = loadFont('Gill Sans.otf');
   scoreFont = loadFont('Gill Sans.otf');
}

function setup() {
  
  createCanvas(600, 450);
  
  textFont(scoreFont);
  textSize(32);
  textAlign(LEFT, TOP);
  
  fadeText = 0;
  dragon = new Dragon();
  
  const options = {probablityThreshold: 0.95};
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
  // loops and plays background audio at the start of the scene.
  song.loop();
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
  } 
}

function keyPressed(){
  if(key == ' '){
    dragon.jump();
     // play audio effect
        FlySFX.play();
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
    voiceover_audio.play();
    // gameover - UI
     textFont(gameoverFont);
     textSize(48);
     fill('red');
     textAlign(CENTER, CENTER);
     text(GameOverText, 300, 150);
    song.stop(); 
    // shuts game down.
    noLoop();
  }
  
 }
}// end of sketch. js