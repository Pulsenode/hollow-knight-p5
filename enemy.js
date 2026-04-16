let enemies = [];
let currentAttackBox = null;

function initEnemies() {
  enemies = [ // this array handle the position, width and height, speed and hp of the emeies
    { x: 600, y: 500, w: 40, h: 40, speed: 2, hp: 3, hitCooldown : 0 } 
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

    if (player.attacking) {

    let attackBox = {}; // variable 
    

    if (player.attackDir === "right") {
    attackBox = {
        x: player.x + player.w,
        y: player.y,
        w: 40,
        h: player.h
    };
    }

    if (player.attackDir === "left") {
    attackBox = {
        x: player.x - 40,
        y: player.y,
        w: 40,
        h: player.h
    };
    }

    if (player.attackDir === "up") {
    attackBox = {
        x: player.x,
        y: player.y - 40,
        w: player.w,
        h: 40
    };
    }

    if (player.attackDir === "down") {
    attackBox = {
        x: player.x,
        y: player.y + player.h,
        w: player.w,
        h: 40
    };
    }

    currentAttackBox = attackBox;

    let hit =
        attackBox.x < e.x + e.w &&
        attackBox.x + attackBox.w > e.x &&
        attackBox.y < e.y + e.h &&
        attackBox.y + attackBox.h > e.y;

    if (hit && e.hitCooldown === 0) {
        e.hp--; 
        e.hitCooldown = 20; // prevent for span hits

      hitPause = 5; // impact feedback
      shake = 12; // screen shake when enemy is hit


      for (let i = 0; i < 8; i++) { // loop for spwanning particles 
        particles.push({
            x: e.x + e.w / 2, //spwan at the enemies  
            y: e.y + e.h / 2,
            vx: random(-3, 3), //random direction where the partciles spwan
            vy: random(-3, 0),
            life: 10 // particles exists for a short period of time
         });
        }

        let dir = player.x < e.x ? 1 : -1; //knowback
        e.x += dir * 25;

    if (e.hp <= 0) { // if the hp is equal or less than 0, then dead state become true
        e.dead = true;
        score++; // increment the score of the player of 1
      }
    }

    console.log("BOX:", attackBox);
   }

   if (!player.attacking) {
  currentAttackBox = null;
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