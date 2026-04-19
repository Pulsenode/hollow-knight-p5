let player;

function initPlayer() {
  player = { // player object storing variable for gameplay
    x: 1400,
    y: 3400,
    w: 64,
    h: 64,
    vx: 0,
    vy: 0,
    speed: 8,
    jumpForce: -17,
    gravity: 0.8,
    onGround: false,

    hp: 5, // Health of the player
    hitCooldown: 0, 

    dir: "right", // dir for movement direction of the player
  };
}


function updatePlayer() {// function that update player movememnt every 60frames / seconds
  player.vx = 0; // reset the horizontal speed of the player to avoid let him go one direction indefinently

  // Horizontal input
  if (keyIsDown(65) || keyIsDown(37)) { // A or ArrowLeft
    player.vx = -player.speed;
    player.dir = "left"; // store direction for attack direction
  }
  if (keyIsDown(68) || keyIsDown(39)) { // D or ArrowRight
    player.vx = player.speed;
    player.dir = "right"; // store directin for attack direction
  }

 
  player.x += player.vx;  //horizontal movement & collisions


  // allow the player to not get through walls, roofs etc ... 
  function overlaps(ax, ay, aw, ah, bx, by, bw, bh) { // using AABB overlap test | A = player and B = platform. It checks if two rectangles are overlapping, if yes = collision
  return ax < bx + bw && // player left < platform right
         ax + aw > bx && // player right > platform left
         ay < by + bh && // player top < platform bottom
         ay + ah > by; // player bottom > platform top
}

  // Also collide with solid world blocks if present
  const solids = (typeof world !== 'undefined' ? world : []);

  for (let p of solids) {
    if (overlaps(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      if (player.vx > 0) {
        player.x = p.x - player.w - 0.01;
      } else if (player.vx < 0) {
        player.x = p.x + p.w + 0.01;
      }
      player.vx = 0;
    }
  }


  player.vy += player.gravity; // apply gravity every frame 
  player.y += player.vy; // move player vertically

  player.onGround = false; // player is not on the ground
  for (let p of solids) { // vertical collisions against same solid set
    if (overlaps(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      if (player.vy > 0) { // player going down
        player.y = p.y - player.h - 0.01;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0) { // player jumping
        player.y = p.y + p.h + 0.01;
        player.vy = 0;
      }
    }
  }

  // platform collision (only from top, not sides)
for (let p of platforms) {
  if (overlaps(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {

    // player landing on platform
    if (player.vy > 0 && player.y + player.h - player.vy <= p.y) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
    }
  }
}

  // world bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > mapWidth) player.x = mapWidth - player.w; // prevents spamming damage /

  // hit cooldown timer
  if (player.hitCooldown > 0) player.hitCooldown--;
}
