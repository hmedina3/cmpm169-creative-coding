class Meats{
  
  constructor(){
    this.r = 50;
    // starts at edge
    this.x = width;
    // starts in middle
    this.y = 100 - this.r;
  }
  
  move(){
    this.x -= 3;
  }

  outofBounds(){
      return(this.x < 0);
  }

  show(){
    // x an y postion, followed by the size of the object width and height
    image(meatImg, this.x, this.y, this.r, this.r);
   // fill(255, 50);
   // rect(this.x, this.y, this.r, this.r);
  }
  
}