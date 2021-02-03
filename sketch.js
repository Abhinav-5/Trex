var trex, trexrunning, groundimage, ground, invisibleground, cloud, cloudImage, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleRand, obstaclesGroup, cloudsGroup, collided, gameOver,gameoverImage,reset,resetImage;
var score=0;
var dieSound,jumpSound, checkpointSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  collided=loadAnimation("trex_collided.png");
  gameOver=loadImage("gameOver.png");
  reset=loadImage("restart.png");
  checkpointSound=loadSound("checkPoint.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(60,180,40,40);
  trex.addAnimation("trexrunning",trexrunning);
  edges=createEdgeSprites();
  trex.scale = 0.5;
  trex.x = 50;
   ground=createSprite(200,180,400,30);
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;  
  invisibleground=createSprite(200,190,400,10);
  invisibleground.visible=false;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  trex.setCollider("rectangle",0,0,200,trex.height);
  trex.debug = true;
  gameoverImage=createSprite(200,80,80,30);
  gameoverImage.addImage(gameOver);
  gameoverImage.scale=0.5;
  resetImage=createSprite(200,120,80,30);
  resetImage.addImage(reset);
  resetImage.scale=0.5;
}
  

function draw() {
  background("white");
  text("Score="+ score, 200,50);
  
  if(keyDown("space") && trex.y >= 100) { 
    trex.velocityY = -5;
    jumpSound.play();
  }
  trex.velocityY+= 0.5;
  trex.collide(invisibleground);
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(gameState === PLAY) {
    ground.velocityX =-(4+3*score/100);
    score=score+ Math.round(frameCount/60);
    gameoverImage.visible=false;
    resetImage.visible=false;
  }
  else if(gameState === END) {
    ground.velocityX= 0;
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY=0;
    trex.changeAnimation("collided",collided);
    gameoverImage.visible=true;
    resetImage.visible=true;
    dieSound.play();
    if (mousePressedOver(resetImage)) {
      restart();
    }
  }
  if (score > 0 && score%100===0) {
    checkpointSound.play();
  }
  if (obstaclesGroup.isTouching(trex)) {
    gameState = END;
    trex.velocityY=0;
  }
  
  console.log(frameCount);
  spawncloud();
  spawnObstacles();
  drawSprites();
  
}
function restart() {
  gameState = PLAY;
  gameoverImage.visible = false;
  resetImage.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("trexrunning",trexrunning);
  score=0;
}
function spawncloud(){
  if(frameCount%60===0){
    cloud=createSprite(380,90,20,10);
    cloud.velocityX = -4;
    cloud.y = Math.round(random(100,150));
    cloud.addImage(cloudImage);
    cloudsGroup.add(cloud);
    cloud.scale=0.4;
  
  }
}
function spawnObstacles() {
  if(frameCount%60===0){
    obstacle=createSprite(400,160,10,20);
    obstacle.velocityX=-(6+score/100);
    obstacle.scale=0.5;
    obstacle.lifeTime=300;
    obstaclesGroup.add(obstacle);
    obstacleRand = Math.round(random(1,6));
    switch(obstacleRand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
  }
}

