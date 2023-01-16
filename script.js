// creates variables
let cat;
let fishcat; 
let homecat; 
let fish;
let fishX = -1;
let fishY = -1;
let fishH = 50;
let fishW = 70;
let catY; 
let eating = false;
let instructions = true;
let score = 0; 
let backgr = 1;
let pauseb;
let willow;
let Silkscreen;

// creates constants 
const SPACE_BAR = 32;

function preload() { 
  // preload cats & fish
  cat = loadImage("cat.png"); 
  fishcat = loadImage("eat.png"); 
  homecat = loadImage("meow.png"); 
  fish = loadImage("fish.png");
  willow = loadImage("willow.png");
  
  // preload backgrounds
  bg1 = loadImage("bg1.png");
  bg2 = loadImage("bg2.png");
  bg3 = loadImage("bg3.png");
  bg4 = loadImage("bg4.png");
  bg5 = loadImage("bg5.png");
  bg6 = loadImage("bg6.png");
  bg7 = loadImage("bg7.png");

  // preload pause button
  pauseb = loadImage("pause.png");

  // preload sounds
  nomnom = loadSound("nomnom.mp3");
  
  // preload fonts
  Silkscreen = loadFont("Silkscreen.ttf"); 
}
  
function setup() {
  createCanvas(windowWidth, windowHeight); // makes canvas
  catY = height*0.80; // sets position of cat at 80% of screen 
}

function draw() {
  // draws background 
  imageMode(CORNER);
  if (backgr == 1) {
    image(bg1,0,0,width,height);
  }
  if (backgr == 2) {
    image(bg2,0,0,width,height);
  }
  if (backgr == 3) {
    image(bg3,0,0,width,height);
  }
  if (backgr == 4) {
    image(bg4,0,0,width,height);
  }
  if (backgr == 5) {
    image(bg5,0,0,width,height);
  }
  if (backgr == 6) {
    image(bg6,0,0,width,height);
  }
  if (backgr == 7) {
    image(bg7,0,0,width,height);
  }

  // draws the intro 
  if (instructions) {
    rectMode(CENTER);
    fill(255,255,255);
    strokeWeight(0);
    rect(width/2,height/2,600,600);
    imageMode(CENTER); 
    image(homecat,width/2,height/2,100,100);
    fill(0,0,0); 
    textFont(Silkscreen, 50);
    textAlign(CENTER, CENTER); 
    text("fish catcher", width/2, height/2 - 120 );
    textSize(20)
    text("please click to start!", width/2, height/2 + 90)
    text("space = change background", width/2, height/2 + 150)
    text("double click = pause", width/2, height/2 + 180)
    return;
  }
  
  // takes away a point 
  if (fishY > height) {
    score -= 1 
    // score stays at 0 after missing one 
    if (score < 0) {
      score = 0 
    }
  }
  
  // check where fish is 
  if (fishY == -1 || fishY > height || caughtFish()) {
    // starts fish at top 
    fishY = 0
    fishX = random(width - fishW)
  }
  else {
    // moves fish down 
    fishY += 5
  }

  // draws the fish 
  imageMode(CORNER);
  image(fish,fishX,fishY,fishW,fishH);
  
  // draws cat face 
  imageMode(CENTER);
  if (eating == true) { // check if cat is eating 
    if (fishY < 100) { // checks where fish is on screen 
      image(fishcat,mouseX,catY,100,100); // if its on top of screen draws eating cat 
    }
    else {
      eating = false;
      image(cat,mouseX,catY,100,100); // draws normal cat 
    }
  }
  else {
    image(cat,mouseX,catY,100,100); // draws normal cat 
  }
  
  // draws score
  rectMode(CORNER);
  strokeWeight(0);
  fill(255,255,255);
  rect(width - 75, 25, 50, 300); 
  fill(194,129,212);
  rect(width - 75, 25, 50, 30*score);

  // checks for max score
   if (score == 10) {
     // shows winning message 
    rectMode(CENTER);
    fill(255,255,255);
    strokeWeight(0);
    rect(width/2,height/2,600,600);
    fill(0,0,0);
    textFont(Silkscreen, 80);
    textAlign(CENTER, CENTER); 
    text("you won!", width/2, height/2 - 230);
    image(willow, width/2, height/2 + 50, 400, 400);
    
     // stops the program 
     noLoop();
   }

  // draw pause button
  imageMode(CORNER);
  image(pauseb,20,20,50,50);
  
  // draws name 
  fill(0,0,0);
  textFont(Silkscreen, 20);
  textAlign(LEFT, CENTER); 
  text("Athena B", 10, height - 35);
  fill(255,255,255)
  text("Athena B", 8, height - 37);
}

// checks is mouse is touching fish 
function caughtFish() {
  // checks if mouse is inside fish area 
  if (mouseX > fishX && mouseX < fishX + fishW && catY > fishY && catY < fishY + fishH) {
    nomnom.play();
    eating = true;
    score += 1 
    return true;
  }
  else {
    return false;
  }
}

function mouseClicked() {
  // start game
  instructions = false;
}

function doubleClicked() {
  // check if mouse is over pause button
  if (mouseX > 20 && mouseX < 70 && mouseY > 20 && mouseY < 70) {
    // pause or unpause
    if (isLooping()) {
      noLoop();
    }
    else {
      loop();
    }
  }
}

function keyPressed() {
  if (keyIsDown(SPACE_BAR)) {
    // change the background number
    if (backgr == 7) {
      backgr = 1;
    }
    else {
      backgr += 1;
    }
  }
}