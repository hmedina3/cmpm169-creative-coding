class Cube{
  
constructor(){
    this.angle = 0;
    this.z = 0;
    this.size = 30;
    this.image_texture = null;
  }
  
  rotate(){
    rotateX(this.angle);
    rotateY(this.angle * 0.3);
    rotateZ(this.angle * 0.3);
    this.angle += 0.01
  }
  
  texture(image_texture){
    this.image_texture = image_texture;
    texture(image_texture);
  }
  
  display(mouseX, mouseY, size, colorBool){
    push();
    translate(mouseX - width/2, mouseY - height/2, this.z);
      // blue material
      //  ambientMaterial(0, 0, 255);
     // ambientMaterial("red");
    // white material so it reflects based off the lights
    if(colorBool){
      // specularMaterial(255);
      ambientMaterial(255);
    }else{
      texture(this.image_texture);
    }
      this.size = size;
    box(this.size);
    pop();
  }
  
}