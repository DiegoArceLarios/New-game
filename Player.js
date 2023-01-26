class Player extends RoverCam {
    constructor() {
      super();
      this.x = 0;
      this.z = 0;
      this.dimensions = createVector(1, 3, 1);
      this.velocity = createVector(0, 0, 0);
      this.gravity = createVector(0, 0.03, 0);
      this.grounded = false;
      this.pointerLock = false;
      this.sensitivity = 0.002;
      this.speed = 0.03;
      this.bala1 = false;
      this.tiempo = true;
      this.v = true;
    }
    
    controller() { // override

      if (player.pointerLock) {
        this.yaw(movedX * this.sensitivity);   // mouse left/right
        this.pitch(movedY * this.sensitivity); // mouse up/down
        if(keyIsDown(65) || keyIsDown(LEFT_ARROW))  this.moveY(this.speed); // a
        if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.moveY(-this.speed);// d
      }
      else { // otherwise yaw/pitch with keys
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) this.yaw(-this.speed); // a
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.yaw(this.speed); // d
        //if (keyIsDown(82)) this.pitch(-0.02); // r
        //if (keyIsDown(70)) this.pitch(0.02);  // f
      }
      if (keyIsDown(87) || keyIsDown(UP_ARROW)) this.moveX(this.speed);    // w
      if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.moveX(-this.speed); // s
      
    }
    
    update() {
      /*if (keyIsPressed && key == 'e') {
        this.grounded = false;
        return;
      }*/
      this.velocity.add(this.gravity);
      this.position.add(this.velocity);
  
      /*if (this.grounded && keyIsPressed && keyCode == 32) { // space
        this.grounded = false;
        this.velocity.y = -1.5;
        this.position.y -= 0.05;
      }*/
    }
      disparar(){
      
        if (this.tiempo){
          this.x = this.position.x;
          this.z = this.position.z;
          this.tiempo = false;
          
        }
        var bala = new Block(this.x,-4, this.z, 0.5, 0.5, 0.5);
        bala.fillColor = color(0,0,0);
        bala.display();
        bala.update();
        this.bala1 = true;
        this.x -=0.5;

        if (this.v){
        this.v = false;
        setTimeout(()=>{
          this.tiempo = true;
          this.bala1 = false;
          this.v = true;      
    
    
        },2000)
      }
        
      
  }



  }
  