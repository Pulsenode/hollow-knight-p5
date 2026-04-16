
let platforms = []; // array for platforms
let mapWidth = 20000; // defining map border / map width


function initWorld() {
      platforms = [ // creating platforms 
  { x: 0, y: 550, w: 2000, h: 50 }, // ground
  { x: 300, y: 450, w: 200, h: 20 },
  { x: 600, y: 350, w: 200, h: 20 },
  { x: 900, y: 300, w: 150, h: 20 }
  ];
}

function drawPlatforms(cameraX) {
  fill(120);
  for (let p of platforms) {
    rect(p.x - cameraX, p.y, p.w, p.h);
  }
}