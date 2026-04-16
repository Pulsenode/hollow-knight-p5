let gameState = "menu"; // crearting menu variable
let buttonWidth = 220;
let buttonHeight = 60;
let centerX; 
let difficulty = 'Medium';

let groundY; // ground level variable
let cameraX = 0; // camera



function setup() { // function that setup the canva / map
  createCanvas(2000, 600);
  groundY = height - 50; // defining ground level

  player = { // object that handle multiple variables for player mechanics
  x: 100,
  y: height - 150,
  w: 40,
  h: 40,
  vx: 0,
  vy: 0,
  speed: 5,
  jumpForce: -12,
  gravity: 0.6,
  onGround: false
  };
}



function mousePressed() { // function for when a mouse button is pressed 

  if (gameState === 'menu') { // Handle clicks on the mnenu screen for buttons
    // Play button
    if (mouseX > width / 2 - 100 &&
        mouseX < width / 2 + 100 &&
        mouseY > height / 2 + 20 &&
        mouseY < height / 2 + 80) {
      gameState = 'game'; // change gamestate to game when button pressed
      console.log("play button pressed"); // console logging for 
      return;
    }
    // Difficulty left button
    if (mouseX > width / 2 - 150 &&
        mouseX < width / 2 - 110 &&
        mouseY > height / 2 + 110 &&
        mouseY < height / 2 + 150) {
      // cycle left
      if (difficulty === 'Easy') difficulty = 'Hard';
      else if (difficulty === 'Medium') difficulty = 'Easy';
      else if (difficulty === 'Hard') difficulty = 'Medium';
      return;
    }
    // Difficulty right button
    if (mouseX > width / 2 + 110 &&
        mouseX < width / 2 + 150 &&
        mouseY > height / 2 + 110 &&
        mouseY < height / 2 + 150) {
      // cycle right
      if (difficulty === 'Easy') difficulty = 'Medium';
      else if (difficulty === 'Medium') difficulty = 'Hard';
      else if (difficulty === 'Hard') difficulty = 'Easy';
      return;
    }
  }

}



function draw() {
  if (gameState === "menu") { //if the game state is on menu, then display the menu
    displayStartMenu();//running the displayStartMenu functoion
    return;
  }

  if (gameState === "game") { // if the gamestate is game, then display text
    runGame(); // running the fucntion runGame
  }
}



function runGame() {// function that run update and draw player when hame is running
  background(50);

  updatePlayer();
  drawPlayer();

  fill(100);
  rect(-cameraX, groundY, width * 2, height - groundY);

  cameraX = player.x - width / 2;
}


function updatePlayer() {// function that update player movememnt every 60frames / seconds
  
  player.vx = 0;

  keyPressed();

  player.x += player.vx;

  player.vy += player.gravity; //increase every frame to simulate falling acceleration
  player.y += player.vy; // moves down to simulate player fall

  if (player.y + player.h >= groundY) { // collision logic | detect if player touch the ground 
  player.y = groundY - player.h; // prevents player sinking into the ground
  player.vy = 0; // stop falling
  player.onGround = true; // track state | yes
  } else {
  player.onGround = false; // track state | no
  }
}

function keyPressed() {

  if (keyIsDown(38) || keyIsDown(32)) { // ArrowUp or spacebar | Jumping button
    if(player.onGround) {
      player.vy = player.jumpForce;
    }
  }

    if (keyIsDown(65) || keyIsDown(37)) { // A or ArrowLeft | right
    player.vx = -player.speed;
  }

  if (keyIsDown(68) || keyIsDown(39)) { // D or ArrowRight
    player.vx = player.speed;
  }
}



function drawPlayer() {// function that create the character apperance
  rect(player.x - cameraX, player.y, player.w, player.h);
}



function displayStartMenu() {// menu screen display
  background(200);
  fill(0);
  textSize(64);
  textAlign(CENTER);
  text('Hollow Knight', width / 2, height / 2 - 100);

  // Play button
  fill(0, 200, 0);
  rect(width / 2 - 100, height / 2 + 20, 200, 60, 10);
  fill(0);
  textSize(28);
  text('PLAY', width / 2, height / 2 + 60);

  // Difficulty selector
  textSize(18);
  fill(0);
  text('Difficulty', width / 2, height / 2 + 100);

  // Left arrow button
  fill(180);
  rect(width / 2 - 150, height / 2 + 110, 40, 40, 6);
  fill(0);
  textSize(24);
  text('<', width / 2 - 130, height / 2 + 139);

  // Difficulty display
  fill(240);
  rect(width / 2 - 90, height / 2 + 110, 180, 40, 6);
  fill(0);
  textSize(20);
  text(difficulty, width / 2, height / 2 + 138);

  // Right arrow button
  fill(180);
  rect(width / 2 + 110, height / 2 + 110, 40, 40, 6);
  fill(0);
  textSize(24);
  text('>', width / 2 + 130, height / 2 + 139);
}