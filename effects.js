let particles = []; // an array for particles 
let shake = 0
let hitPause = 0; 

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {// loop for particles
    let p = particles[i]; // p = particles object


    p.x += p.vx; // movement of the particles
    p.y += p.vy;

    p.vy += 0.2; // gravity for particles to fall down for realism

    p.life--; //  life = timer to let particles disappear and not staying at the screen


    push(); // isolate drawing settings | prevent afecting other part of the game
    noStroke(); //particles darw
    fill(255, 200, 100, p.life * 10);
    rect(p.x, p.y, 4, 4);
    pop();

    if (p.life <= 0) { // remove particles from the array 
      particles.splice(i, 1);
    }
  }
}


function applyShake() {
  if (shake > 0.1) {
    let offsetX = random(-shake, shake);
    let offsetY = random(-shake, shake);

    translate(offsetX, offsetY);

    shake *= 0.9; // slower decay = smoother
  } else {
    shake = 0;
  }
}