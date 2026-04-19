let currentAttackBox = null;


function initCombat() {
  player.attacking = false; // check if attack is active | by default no
  player.attackTimer = 0; // controls attack duration
  player.attackDir = "right"; // attack direction
}

function handleAttackInput() {

  // Press F to attack
  if (keyIsDown(70)) {

    if (!player.attacking) {

      player.attacking = true;
      player.attackTimer = 12;

      // DETERMINE ATTACK DIRECTION
      // prefer spacebar to aim up (user preference), support arrow keys and S for down
      if (keyIsDown(32) || keyIsDown(UP_ARROW)) {
        player.attackDir = "up";
      } else if (!player.onGround && (keyIsDown(DOWN_ARROW) || keyIsDown(83))) {
        player.attackDir = "down";
      } else {
        player.attackDir = player.dir; // left/right
      }

      // No stored attack origin: the hitbox will follow the player while the
      // attack is active (sticks to the player as requested). Keep an immediate
      // hit check for responsiveness.
      checkAttackHit();

      // trigger FX here later
      // createSlashEffect(player.x, player.y, player.attackDir);
    }
  }
}

function updateAttack() {

  if (player.attacking) {

    player.attackTimer--;

    currentAttackBox = getAttackBox();

    if (player.attackTimer === 8) {
      checkAttackHit();
    }

    if (player.attackTimer <= 0) {
      player.attacking = false;
      currentAttackBox = null;
    }
  }
}

function checkAttackHit() {
  let attackBox = getAttackBox();

  if (!attackBox) return;

  currentAttackBox = attackBox;

  for (let e of enemies) {

    let hit =
      attackBox.x < e.x + e.w &&
      attackBox.x + attackBox.w > e.x &&
      attackBox.y < e.y + e.h &&
      attackBox.y + attackBox.h > e.y;

    if (hit && e.hitCooldown === 0) {
      e.hp--;
      e.hitCooldown = 20;

      hitPause = 5;
      shake = 12;

      let dir = player.x < e.x ? 1 : -1;
      e.x += dir * 25;

      if (e.hp <= 0) {
        e.dead = true;
        score++;
      }
    }
  }
}


function getAttackBox() {

  if (!player.attacking) return null;

  // Use current player position so the hitbox follows the player while
  // the attack is active.
  const ox = player.x;
  const oy = player.y;
  const dir = player.attackDir;

  if (dir === "right") {
    return { x: ox + player.w, y: oy, w: 40, h: player.h };
  }

  if (dir === "left") {
    return { x: ox - 40, y: oy, w: 40, h: player.h };
  }

  if (dir === "up") {
    return { x: ox, y: oy - 40, w: player.w, h: 40 };
  }

  if (dir === "down") {
    return { x: ox, y: oy + player.h, w: player.w, h: 40 };
  }

  return null;
}