let gameState = "menu"; // crearting menu variable
let buttonWidth = 220;
let buttonHeight = 60;
let centerX; 
let difficulty = 'Medium';

let groundY; // ground level variable
let cameraX = 0; // camera

let score = 0;



function setup() { // function that setup the canva / map
  createCanvas(1920, 1080); // screen resolution | To see world size go to world.js 
  groundY = height - 50; // defining ground level

  initPlayer(); // Using player function in player file
  initWorld(); // Using world function in world file
  initEnemies(); // Using enemy function in enemy file

}



function mousePressed() { // function for when a mouse button is pressed 

  if (gameState === 'menu') { // Handle clicks on the mnenu screen for buttons
    // Play button
    if (mouseX > width / 2 - 100 &&
        mouseX < width / 2 + 100 &&
        mouseY > height / 2 + 20 &&
        mouseY < height / 2 + 80) {
        resetGame();  // reset the game every time pressing the play button on the menu
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

  if (gameState === "death") { // Handle cliks on the death screen for buttons


  if (mouseX > width / 2 - 100 && // Restart button
      mouseX < width / 2 + 100 &&
      mouseY > 300 &&
      mouseY < 360
  ) {
    resetGame(); // Using resetGame function to reset everything
  }

  if (mouseX > width / 2 - 100 && // Menu Button
      mouseX < width / 2 + 100 &&
      mouseY > 380 &&
      mouseY < 440
  ) {
    gameState = "menu"; // Chaging the game state to go back to meny
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

    if (gameState === "death") { // if the gamestate is death, then display text
    drawDeathScreen(); // running the fucntion drawDeathScreen
  }
}



function runGame() {// function that run update and draw player when hame is running
  background(50);

  updatePlayer(); // using updatePlayer function in player file

  drawUI(); // using the drawUI function for health bar

  fill(100);
  rect(-cameraX, groundY, width * 2, height - groundY);

  cameraX = player.x - width / 2;
  cameraX = constrain(cameraX, 0, mapWidth - width); // prevents for the camera for going to far right and left

  drawPlatforms(cameraX); // using drawPlatforms function from world file
  drawPlayer(cameraX); // using drawPlayer function from player file

  updateEnemies(); // using updateEnemies function from enemy file
  drawEnemies(cameraX); // using drawEnemies function from enemy file

  for (let p of platforms) {
  rect(p.x - cameraX, p.y, p.w, p.h);
  }
}





function keyPressed() { // function for keybindings 

  if (keyIsDown(38) || keyIsDown(32)) { // ArrowUp or spacebar | Jumping button
    if(player.onGround) {
      player.vy = player.jumpForce;
    }
  }

    if (keyIsDown(65) || keyIsDown(37)) { // A or ArrowLeft | right
    player.vx = -player.speed;
  }

  if (keyIsDown(68) || keyIsDown(39)) { // D or ArrowRight | Right
    player.vx = player.speed;
  }

  if (keyIsDown(70)) { // leftClick or F for attacking
    if (!player.attacking) {
      player.attacking = true;
      player.attackTimer = 10; // 10 frames
    }
  }
}


function drawUI() { // function for the UserInterface | Include score and HP bar

  push(); 

  let maxHP = 5;
  let barWidth = 200;

  fill(100); // HP bar
  rect(20, 20, barWidth, 20); // HP bar

  fill(255, 0, 0);
  rect(20, 20, (player.hp / maxHP) * barWidth, 20);

  // 🧠 Score
  text("Score: " + score, 20, 60);

  pop();
}


function resetGame() { // function that allow everything to reset
  initPlayer(); // reset player position
  initWorld(); // reset world
  initEnemies(); // reset enemy position
  gameState = "game";
}

function drawDeathScreen() { // function for death screen apperance
  background(0);

  fill(255);
  textAlign(CENTER);
  textSize(50);
  text("YOU DIED", width / 2, height / 2);

  // Restart button
  fill(100);
  rect(width / 2 - 100, 300, 200, 60, 10);
  fill(255);
  textSize(20);
  text("Restart", width / 2, 335);

  // Menu button
  fill(100);
  rect(width / 2 - 100, 380, 200, 60, 10);
  fill(255);
  text("Menu", width / 2, 415);
}


function displayStartMenu() {// function for start menu apperance
  background(200);
  fill(0);
  textSize(64);
  textAlign(CENTER);
  text('Hollow Knight', width / 2, height / 2 - 100); // Title 

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