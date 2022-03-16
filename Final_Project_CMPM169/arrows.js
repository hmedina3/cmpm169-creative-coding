class Arrows{
  
  constructor(){
    this.r = 50;
    // starts at edge
    this.x = width;
    // starts in middle
    this.y = random(1, 400);
  }
  
  move(){
    this.x -= 3;
  }
  
  show(){
    // x an y postion, followed by the size of the object width and height
    image(arrowImg, this.x, this.y, this.r-50, this.r-50);
    /*** Debugging for arrow collider ***/
      fill(255, 50);
      rect(this.x, this.y, this.r, this.r);
  }
  
}