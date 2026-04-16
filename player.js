let player;

function initPlayer() {
  player = {
    x: 100,
    y: 300,
    w: 40,
    h: 40,
    vx: 0,
    vy: 0,
    speed: 5,
    jumpForce: -12,
    gravity: 0.6,
    onGround: false,

    attacking: false, // check if attack is active | by default no
    attackTimer: 0, // controls attack duration

    hp: 5, // Health of the player
    hitCooldown: 0, 
  };
}


function updatePlayer() {// function that update player movememnt every 60frames / seconds
  
  player.vx = 0;

  keyPressed(); // using keyPressed function 

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

  if (player.hitCooldown > 0) {
  player.hitCooldown--;
  }

for (let p of platforms) { // loop for detecting if the playing is on platform

  let isFalling = player.vy >= 0;

  let withinX =
    player.x + player.w > p.x &&
    player.x < p.x + p.w;

  let touchingTop = // variable for checking if the player touch the top of the platform
    player.y + player.h <= p.y + player.vy &&
    player.y + player.h >= p.y;

  if (isFalling && withinX && touchingTop) {
    player.y = p.y - player.h;
    player.vy = 0;
    player.onGround = true;
    }
  }

  if (player.x < 0) player.x = 0; // prevents player for escaping the world
  if (player.x + player.w > mapWidth) {
    player.x = mapWidth - player.w;
  }

  if (player.attacking) {
  player.attackTimer--;

  if (player.attackTimer <= 0) {
    player.attacking = false;
  }
 } 

}


function drawPlayer(cameraX) {

    push(); // save current state for color
    if (player.hitCooldown > 0) {
    fill(255, 150, 150); // damaged color
        } else {
    fill(255);
    }

  rect(player.x - cameraX, player.y, player.w, player.h);
  pop(); // restore the state

}