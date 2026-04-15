let gameState = "menu"; // crearting menu variable
let buttonWidth = 220;
let buttonHeight = 60;
let centerX;
let difficulty = 'Medium';

function setup() {
  createCanvas(2000, 600);
  x = width / 2;
  y = height - 150;
}

function mousePressed() { // fonction for when a mouse button is pressed 

  if (gameState === 'menu') { // Handle clicks on the mnenu screen for buttons
    // Play button
    if (mouseX > width / 2 - 100 &&
        mouseX < width / 2 + 100 &&
        mouseY > height / 2 + 20 &&
        mouseY < height / 2 + 80) {
      resetGame();
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
    displayStartMenu();//using the displayStartMenu functoion
    return;
  }

  if (gameState === "game") { // if the gamestate is game, then display text
    background(50);
    fill(255);
    text("GAME STARTED", 100, 100);
  }
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