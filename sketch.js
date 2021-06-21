var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  foodGroup=new Group();
obstaclesGroup=new Group();

  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;

  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    
    player.scale += + 0.1;
    }
    if(frameCount % 80 === 0){
      var banana = createSprite(600,250,40,10);
      banana.y = random(120,200)
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX= -4;
      
      banana.lifeTime = 300;
      player.depth = banana.depth + 1;
      foodGroup.add(banana);
      }  
      if (frameCount % 300===0){
        Obstacle=createSprite(400,330,20,20);
        
        Obstacle.velocityX = -5;
        Obstacle.scale = 0.2; 
        Obstacle.Lifetime=100;
         
        obstacleGroup.add(Obstacle);
        }
      
    if(obstaclesGroup.isTouching(player)){
      gameState === END;
    }
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300,220)

 }

  drawSprites();
}



