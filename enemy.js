let enemies = [];

function initEnemies() {
  enemies = [
    { x: 600, y: 500, w: 40, h: 40, speed: 2 }
  ];
}

function updateEnemies() { // function to update 
  for (let e of enemies) {

    let distance = dist(player.x, player.y, e.x, e.y);

    if (distance < 300) { // detection radius system for enemy 
      if (player.x < e.x) e.x -= e.speed;
      else e.x += e.speed;
    }

    let isColliding = // Collision detection
        player.x < e.x + e.w &&
        player.x + player.w > e.x &&
        player.y < e.y + e.h &&
        player.y + player.h > e.y;

  if (isColliding) { // if collosion happened, switch to death game state
    gameState = "death";
  }
  }
}

function drawEnemies(cameraX) { // function for drawing the enemy
    push();
    
  fill(200, 50, 50);
  for (let e of enemies) {
    rect(e.x - cameraX, e.y, e.w, e.h);
  }
  pop();
}