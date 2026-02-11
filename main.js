let cnv;
let frame, bird1, bird2, castle, flag, knight, love, jester, man_1, man_2;


// love beer moving 
let beerMove = -200;

let knightMove;

let birdmove;

// bird_1 moving
let birdAngle = 0;
let birdRadius = 20;
let birdCenterX;
let birdCenterY;

// jester moving
let x;
let jesterSpeed = 1;
let jesterDirection = 1; 

// keg moving 
let kegSpeed = 2;

// can crushing
let currentCan;

function preload() {
    frame = loadImage("assets/frame.png");
    bird1 = loadImage("assets/bird_1.gif");
    bird2 = loadImage("assets/bird.gif");
    castle = loadImage("assets/castle.png");
    flag = loadImage("assets/flag.gif");
    knight = loadImage("assets/knight.png");
    knight_gif = loadImage("assets/knight.gif");
    
    jester = loadImage("assets/jester.png");



    love = loadImage("assets/love.png");

    scroll_closed  = loadImage("assets/scroll_closed.png");
    scroll_open = loadImage("assets/scroll_open.png");

    man_1 = loadImage("assets/man_1.png");  
    man_2 = loadImage("assets/man_2.png");
    keg = loadImage("assets/keg.png");

    barley = loadImage("assets/barley.png");
    sheep_1 = loadImage("assets/sheep_1.png");
    sheep_2 = loadImage("assets/sheep_2.png");

    keg_moving = loadImage("assets/keg_moving.gif");

    can_1 = loadImage("assets/can_1.png");
    can_2 = loadImage("assets/can_2.png");  
    can_3 = loadImage("assets/can_3.png");  
    can_4 = loadImage("assets/can_4.png");

}


function setup() {
  cnv = createCanvas(windowWidth, document.body.scrollHeight);
  cnv.position(0, 0);
  cnv.style("z-index", "-1");
  
  rectMode(CENTER);
  imageMode(CENTER);
  angleMode(DEGREES)

  // jester moving
  x = width / 6;

  // Knight moving
  knightMove = width/2 - 200;

  // birds moving
  birdCenterX = width / 2 + 100;
  birdCenterY = 400;

  // bird moving w scroll
  birdMove = width/2 - 100;

  // vomit
  noVomit = man_1; 

  // sheep
  originalSheep = sheep_1;

  // keg moving 
  kegMoving = 200

}


function draw() {
  clear();

   // castle illustration
   image(frame, width/2, 440, frame.width/4, frame.height/4);
   image(castle, width/2, 440, castle.width/4, castle.height/4);
   image(knight_gif, knightMove, 500, knight.width/4, knight.height/4);

  //  birds flying
  
  push();
    let bx = birdCenterX + cos(birdAngle) * birdRadius;
    let by = birdCenterY + sin(birdAngle) * birdRadius;

    image(bird1, bx, by, bird1.width / 13, bird1.height / 13);  
        birdAngle += 0.5;
    pop();


    image(bird2, birdMove, 400, bird2.width/13, bird2.height/13);
  
  //  flag skew
   push();
   translate(width/2 + 20, 440 - 50);
   rotate(sin(frameCount * 2) * 2);
   image(flag, 0, 0, flag.width/7, flag.height/7);
   pop();

   // jester
   
    push();
    translate(x, 1000);
    scale(jesterDirection, 1);
    image(jester, 0, 0, jester.width / 4, jester.height / 4);
    pop();
    x += jesterSpeed * jesterDirection;
    if (x > width / 6 || x < width / 8) {
      jesterDirection *= -1;
    }

    // scroll 
    // change cursor
    push();
    if (mouseX > width/2 + 500 - scroll_closed.width/3 && mouseX < width/2 + 500 + scroll_closed.width/3 && mouseY > 1500 - scroll_closed.height/3 && mouseY < 1500 + scroll_closed.height/3) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
    // open scroll on press
    if (mouseIsPressed && mouseX > width/2 + 500 - scroll_closed.width/3 && mouseX < width/2 + 500 + scroll_closed.width/3 && mouseY > 1500 - scroll_closed.height/3 && mouseY < 1500 + scroll_closed.height/3) {
        image(scroll_open, width/2 + 500, 1500, scroll_open.width/3, scroll_open.height/3);
      } else {
        image(scroll_closed, width/2 + 500, 1500, scroll_closed.width/3, scroll_closed.height/3);
      } 
    pop();

    // men drinking w/keg      
    image(keg, width/2 - 500, 2300, keg.width/4, keg.height/4);

    if (window.scrollY  > 1900) {
      noVomit = man_2;
    } else{
      noVomit = man_1;
    }

    image(noVomit,
    width / 2 - 400, 2300, noVomit.width / 4,noVomit.height / 4
  );


    // barley and sheep scene
    image(barley, width/2 + 500, 2620, barley.width/4, barley.height/4);

    if (window.scrollY > 2200) {
      image(sheep_2, width/2 + 500, 2600, sheep_2.width/4, sheep_2.height/4);
    } else {
      image(sheep_1, width/2 + 500, 2600, sheep_1.width/4, sheep_1.height/4);
    } 

    //  keg moving across screen 
    
    let minKeg = 50;
    let maxKeg = 400;

    image(keg_moving,kegMoving, 3200,keg_moving.width / 9, keg_moving.height / 9);
    
    kegMoving += kegSpeed;

    if (kegMoving > maxKeg || kegMoving < minKeg) {
      kegSpeed *= -1;
    }

    //  love german beer

    image(love, beerMove, 3800, love.width / 4, love.height / 4);

    // cans crushing 
      if (window.scrollY > 4200) {
        currentCan = can_4;
      } else if (window.scrollY > 4100) {
        currentCan = can_3;
      } else if (window.scrollY > 4000) {
        currentCan = can_2;
      } else {
        currentCan = can_1;
      }

      image(currentCan, width / 2 + 500, 4500, currentCan.width / 4, currentCan.height / 4);
}

function mouseWheel(event){
    beerMove += event.delta * 0.5;
    knightMove += event.delta * 0.5;

    let minX = width / 2 - 200;
    let maxX = width / 2 + 200;
    knightMove = constrain(knightMove, minX, maxX);

    birdMove += event.delta * 0.15;
    let minB =  width/2 - 100;
    let maxB = width/2 + 100;
    birdMove = constrain (birdMove, minB, maxB);
  
}



function windowResized() {
  resizeCanvas(windowWidth, document.body.scrollHeight);
  redraw();
}