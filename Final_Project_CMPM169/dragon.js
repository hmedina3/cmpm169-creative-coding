class Dragon{
  
  constructor(){
    this.r = 70;
    this.x = this.r;
    // the objects position
    this.y = height - this.r;
    this.velocity_y = 0;
    this.gravity = 0.7;
    
  }
  
  jump(){
    this.velocity_y = -12;
  }
  
  superjump(){
    this.velocity_y = -50;
  }
  
  // arrows - collider's
  hits(arrows){
    // imported library p5.collide2D to use this collider function
    return collideRectCircle(arrows.x,arrows.y, arrows.r, arrows.r, this.x + 5, this.y + 10, this.r - 20);
  }

  // meats - collider's
  collects(meats){
    // imported library p5.collide2D to use this collider function
    return collideRectCircle(meats.x,meats.y, meats.r, meats.r, this.x, this.y, this.r);
  }
  
  move(){
    this.y += this.velocity_y;
    this.velocity_y += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }
  
  show(){
    image(dragonImg, this.x, this.y, this.r, this.r);
    /***debug collider***/
     //fill(255, 50);
     // ellipseMode(CORNER);
     // ellipse(this.x+5, this.y+10, this.r, this.r-20);
  }
  
}