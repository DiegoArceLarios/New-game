// Engineer: jWilliamDunn 2020

// First-person camera control w/ HUD
// Mouse: left/right : pan
//        up/down : tilt
//        click : move forward

//  Keys: a/d : left/right
//        w/s : forward/backward
//        e/q : up/down
//        space : jump    <----------- extended behavior
//        h : help
// this is needed to catch the exit from pointerLock when user presses ESCAPE


function onPointerlockChange() {
  if (document.pointerLockElement === canvas.elt ||
    document.mozPointerLockElement === canvas.elt)
    console.log("locked");
  else {
    console.log("unlocked");
    player.pointerLock = false;
  }
}
document.addEventListener('pointerlockchange', onPointerlockChange, false);

var player, base, f, help = false,
  canvas;
  var xc = 0;
  var zc = 0;
  var r = 0;
  var xp = 0
  var zp = 0;
  var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, cactus7, cactus8, cactus9, cactus10;
  var start;
  var blocks;
  var casaImg;
  var casa;
  var otherPlayer;
  var s;
  var xt, zt;
  var distancia;

function preload() {
  f = loadFont('inconsolata.otf');
  casaImg = loadImage('imagenes/vaquero1.png');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(f);
  textSize(10);
  player = new Player();
  base = new Base(15);
  base.setPlayerAtStart(player);

  xp = 0;
  zp = 70;

  xt = 30;
  zt = 30;
  wt = 0.7;
  kt = 0.7;

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus1 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus2 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus3 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus4 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus5 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus6 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus7 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus8 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus9 = new Cactus(xc,zc,r);

  xc = Math.round(random(xp,zp));
  zc = Math.round(random(xp,zp));
  r = Math.round(random(1,2));
  cactus10 = new Cactus(xc,zc,r);

  casa = new Block(70,-4,30,0.1,10,10);
  otherPlayer = new Block(xt,-3.2,zt,wt,2,kt);
  otherPlayer.fillColor = color (246, 13, 13);

  s = new Block (20,-4, 20, 10,10,10);
  
  frameRate(60);
  strokeWeight(2);
}

function keyPressed() {
  if (key == 'h') help = !help;
  if(key=='+'){
    player.pov.fovy -= 0.1;
    player.updatePOV();
  }
  if(key=='-'){
    player.pov.fovy += 0.1;
    player.updatePOV();
  }
}

function draw() {
  background(65, 65, 250);

  base.update();
  base.display();

  player.update();
  //console.log(player.position);

  cactus1.display();
  cactus2.display();
  cactus3.display();
  cactus4.display();
  cactus5.display();
  cactus6.display();
  cactus7.display();
  cactus8.display();
  cactus9.display();
  cactus10.display();
  
  casa.display(casaImg);
  casa.update();

  otherPlayer.display();
  otherPlayer.update();

  distancia = dist(player.position.x,player.position.z,otherPlayer.position.x,otherPlayer.position.z);
  console.log (distancia);

  

  

  if (distancia <= 1){
    s.display();
    s.update();

  }
  
  if (player.bala1 || keyCode == 32){
    player.disparar();
  }

 // block2.update();
  drawAxes();

  if (help || frameCount < 400) { // Heads Up Display extension by jWilliam
    push(); // this affects the frame rate
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
    fill(0, 0, 0, 200);
    noStroke();
    translate(-380, -380, 0);
    scale(2);
    rect(0, 0, 140, 85);
    fill(127);
    text(' keys: a/d : left/right', 10, 40);
    text('       w/s : fwd/bkwd', 10, 50);
    text('       h : help', 10, 60);
    pop();
  }
}

function drawAxes(){
	push();
      noStroke();
	  fill(127,0,0); // X red
	  translate(75,0.5,0.5);
	  box(150,1,1);
	pop();
	push();
      noStroke();
	  fill(0,127,0); // Y green
	  translate(0.5,75,0.5);
	  box(1,150,1);
	pop();
	push();
      noStroke();
	  fill(0,0,127); // Z blue
	  translate(0.5,0.5,75);
	  box(1,1,150);
	pop();
}

function mouseClicked() {
  if (!player.pointerLock) {
    player.pointerLock = true;
    requestPointerLock();
  } else {
    exitPointerLock();
    player.pointerLock = false;
  }
}

