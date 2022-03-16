class Dragon{
  
  constructor(){
    this.r = 70;
    this.x = this.r;
    // the objects position
    this.y = height - this.r ;
    this.velocity_y = 0;
    this.gravity = 0.7;
    
  }
  
  jump(){
    this.velocity_y = -12;
  }
  
  superjump(){
    this.velocity_y = -50;
  }
  
  // collider's
  hits(arrows){
    // imported library p5.collide2D to use this collider function
 return collideRectCircle(arrows.x,arrows.y, arrows.r, arrows.r, this.x, this.y, this.r);
    //   return collideRectCircle(this.x,this.y, this.r, this.r, arrows.x, arrows.y, //arrows.r, arrows.r);
  }
  // collider's
  collects(meats){
    return collideRectCircle(meats.x,meats.y, meats.r, meats.r, this.x, this.y, this.r);
    // imported library p5.collide2D to use this collider function
    //return collideRectRect(this.x,this.y, this.r, this.r, meats.x, meats.y, meats.r, //meats.r);
  }
  
  move(){
    this.y += this.velocity_y;
    this.velocity_y += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
  
  show(){
    image(dragonImg, this.x, this.y, this.r, this.r);
   // fill(255, 50);
   // ellipseMode(CORNER);
  //  ellipse(this.x, this.y, this.r, this.r);
  }
  
}