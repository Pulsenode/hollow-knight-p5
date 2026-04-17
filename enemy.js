let enemies = [];

function initEnemies() {
  enemies = [ // this array handle the position, width and height, speed and hp of the emeies
    { x: 600, y: 500, w: 40, h: 40, speed: 2, hp: 3, hitCooldown : 0,
      vy: 0, gravity: 0.6, onGround: false }
  ];
}

function updateEnemies() { // function to update 
  for (let e of enemies) { // lor for enemies

    let distance = dist(player.x, player.y, e.x, e.y);

    if (distance < 300) { // detection radius system for enemy 
      if (player.x < e.x) e.x -= e.speed;
      else e.x += e.speed;
    }

    if (e.hitCooldown > 0) {
        e.hitCooldown--;
    }

    // --- simple vertical physics for enemies (gravity + landing) ---
    if (e.vy === undefined) e.vy = 0;
    if (e.gravity === undefined) e.gravity = 0.6;

    e.vy += e.gravity;
    e.y += e.vy;

    // land on ground
    if (e.y + e.h >= groundY) {
      e.y = groundY - e.h;
      e.vy = 0;
      e.onGround = true;
    } else {
      e.onGround = false;
    }

    // land on platforms (top only)
    for (let p of platforms) {
      // simple AABB check to see if enemy intersects the platform
      let intersects =
        e.x < p.x + p.w &&
        e.x + e.w > p.x &&
        e.y < p.y + p.h &&
        e.y + e.h > p.y;

      if (intersects) {
        // if falling, place on top
        if (e.vy > 0 && e.y + e.h - e.vy <= p.y) {
          e.y = p.y - e.h - 0.01;
          e.vy = 0;
          e.onGround = true;
        } else if (e.vy < 0 && e.y >= p.y + p.h - 0.01) {
          // hit underside
          e.y = p.y + p.h + 0.01;
          e.vy = 0;
        }
      }
    }

    // Collision with player
    let isColliding = // Collision detection
        player.x < e.x + e.w &&
        player.x + player.w > e.x &&
        player.y < e.y + e.h &&
        player.y + player.h > e.y;

    if (isColliding && player.hitCooldown === 0) {
        player.hp--;
        player.hitCooldown = 30; // invincibility frames for the player to not get spammed 

            
        hitPause = 6; // feedback
        shake = 12; // screen shake when player is hit

        let dir = player.x < e.x ? -1 : 1; // knockback player
        player.x += dir * 30;

        if (player.hp <= 0) { // if the player hp = 0, gamestate change to death
            gameState = "death";
        }
    }

  }
  enemies = enemies.filter(e => !e.dead);

}

function drawEnemies(cameraX) {  // function for drawing the enemy

  for (let e of enemies) {

    push(); // isolate style


    if (e.hitCooldown > 0) {
      fill(255, 100, 100); // flash when hit
    } else {
      fill(200, 50, 50);
    }

    rect(e.x - cameraX, e.y, e.w, e.h);

    pop();
  }


  if (player.attacking) { // It shows the attack hitbox | Great for testing
    push();
    fill(255, 255, 0, 100);
    if (currentAttackBox) {
        rect(
            currentAttackBox.x - cameraX,
            currentAttackBox.y,
            currentAttackBox.w,
            currentAttackBox.h
        );
    }
    pop();
  }
}