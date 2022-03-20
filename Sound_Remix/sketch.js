/* 
* Remixed - by Hector Medina. 
* Original assignment - by Esmeralda Rangel.
* press anywhere to start
* the line & number indicates the reverb of the new playback
* every click is a new playback at the reverb effect determined by mouseX
* can have three playbacks at a time
*/

let song;
let clickCount = 0
let reverb_Mod
let dryWet
let yMod
let songName;
let stopButton;
let reverbButton;
let clicked = false;

function setup() {
  let cnv = createCanvas(300,300);
  background("#702963")
  cnv.mousePressed(canvasPressed);
  
  song = loadSound("light-my-heart.mp3")
  song.setVolume(0.5)
  songName = "Song name - Light my Heart"
  fill(255);
  text(songName, 69, 100);
  
  reverb_Mod = new p5.Reverb();
  // three second reverbTime, decayRate of 2%
  reverb_Mod.process(song, 3,2);
  
  
  stopButton = createButton('Stop music');
  stopButton.mousePressed(stopAudio);
  reverbButton = createButton('Focus Reverb (on/off)');
  reverbButton.position(165, 380);
  reverbButton.mousePressed(disconnectAudio);
}

function stopAudio() {
 song.stop();
}

function disconnectAudio(){
  
  if(!clicked){
    // This will only focus on reverb effect
     song.disconnect();
     reverb_Mod.process(song, 3,2);
     console.log("reverb only button pressed");
     clicked = true;
  }
  else{
    song.connect();
    reverb_Mod.process(song, 3,2);
    console.log("song connected back again");
    clicked = false;
  }

}

function draw() {
  dryWet = constrain(map(mouseX, 0, 300, 0.03, 2), 0, 1)
  yMod = map(dryWet, 0.03, 2, 280, 30)
  line(mouseX, 0, mouseX, height)
}

function canvasPressed(){
  background(255,204,255)
  clickCount++
  
  if (clickCount%2 == 0){
    background(0, 204, 0)
  }
  
  if (clickCount%4 == 0){
    song.stop()
  }
  // 1 = all reverb, 0 = no reverb
  reverb_Mod.drywet(dryWet)
  song.play()
    
  
  textSize(30)
  fill(255)
  text(dryWet, mouseX, yMod)
}