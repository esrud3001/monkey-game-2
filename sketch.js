 var monkey_running, monkey;
 var backImage, backscene;
 var invisibleGround;
 var stone;
 var banana;
 var survivalTime;
 var bananaImage;
 var stoneImage;
 var bananaGroup;
 var stonesGroup;



 function preload() {


   backImage = loadImage("jungle.jpg");
   monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

   stoneImage = loadImage("stone.png");
   bananaImage = loadImage("banana.png");


 }

 function setup() {
   createCanvas(600, 400);

   backscene = createSprite(300, 50, 400, 10);
   backscene.addImage(backImage);
   backscene.scale = 1.25;
   backscene.velocityX = -3;
   backscene.x = backscene.width / 2;

   monkey = createSprite(70, 300, 20, 20);
   monkey.addAnimation("monkey", monkey_running);
   monkey.scale = 0.15;

   invisibleGround = createSprite(70, 300, 800, 10);
   invisibleGround.visible = false;

   survivalTime = 0;

   bananaGroup = new Group();
   stonesGroup = new Group();

 }

 function draw() {
   background(255);

   if (backscene.x < 0) {
     backscene.x = backscene.width / 2;
   }

   if (keyDown("space") && monkey.y >= 50) {
     monkey.velocityY = -12;
   }

   //gravity Effect
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(invisibleGround);

   if (monkey.isTouching(bananaGroup)) {

     bananaGroup.destroyEach();
     survivalTime = survivalTime + 1;
     if (monkey.scale <= 0.50) {

       monkey.scale = monkey.scale + 0.01;
     }

   }

   if (monkey.isTouching(stonesGroup)) {
     monkey.scale = monkey.scale - 0.01;
     stonesGroup.destroyEach();
     survivalTime = survivalTime - 1;
   }



   Stones();
   Bananas();


   drawSprites();

   textSize(20);
   fill("white");
   text("Survival Time: " + survivalTime, 200, 30);
 }

 function Stones() {
   if (World.frameCount % 200 == 0) {
     var stone = createSprite(600, 270, 20, 20);
     stone.velocityX = -3;
     stone.addImage("stone", stoneImage);
     stone.scale = 0.20;

     t = 400 / 3;
     stone.lifetime = t;

     stonesGroup.add(stone);
   }
 }

 function Bananas() {

   if (World.frameCount % 250 == 0) {
     var banana = createSprite(600, 200, 20, 20);
     banana.velocityX = -3;
     banana.addImage("banana", bananaImage);
     banana.scale = 0.10;

     banana.y = Math.round(random(120, 200));
     console.log(banana.y);

     //setting lifetime
     t = 400 / 3;
     banana.lifetime = t;

     bananaGroup.add(banana);
   }
 }