function drawPlayer(cameraX, cameraY) {

    push(); // save current state for color
    if (player.hitCooldown > 0) {
    fill(255, 80, 80); // damaged color
        } else {
    fill(255);
    }

  rect(player.x - cameraX, player.y - cameraY, player.w, player.h);
  pop(); // restore the state

}