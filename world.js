let world = [];     // solid blocks (walls, floor, ceiling)
let platforms = []; // jumpable surfaces
let mapWidth = 10000;



function initWorld() {

  if (mapData && mapData.layers) {

    world = [];
    platforms = [];



    let layer = mapData.layers.find(l => l.type === "objectgroup");

    if (!layer) {
      console.warn("❌ No object layer found");
      return;
    }

        console.log(mapData);

        console.log(world);
        console.log(platforms);


    for (let obj of layer.objects) {

      console.log(obj);

      // ignore objets vides
      if (obj.width === 0 || obj.height === 0) continue;

      let block = {
        x: obj.x,
        y: obj.y,
        w: obj.width,
        h: obj.height,
        type: obj.class || obj.type || "ground"
      };

      if (block.type === "platform") {
        platforms.push(block);
      } else {
        world.push(block);
      }
    }

    console.log("✅ Loaded from Tiled");
    return;
  }

  // ✅ fallback (TON CODE DOIT ÊTRE ICI)
  console.log("⚠️ Using hardcoded world");

  world = [
// =========================
// ORGANIC ROOM (HOLLOW STYLE)
// =========================

// floor base
{ x: 0, y: groundY, w: 1400, h: (height - groundY), type: "ground" },

// left wall
{ x: 0, y: 0, w: 50, h: height, type: "wall" },

// ceiling blocks (fake curve)
{ x: 0, y: 0, w: 400, h: 80, type: "ceiling" },
{ x: 400, y: 0, w: 300, h: 120, type: "ceiling" },
{ x: 700, y: 0, w: 300, h: 90, type: "ceiling" },
{ x: 1000, y: 0, w: 400, h: 70, type: "ceiling" },

// ground variations (small bumps)
{ x: 300, y: groundY - 40, w: 200, h: 40, type: "ground" },
{ x: 700, y: groundY - 60, w: 200, h: 60, type: "ground" },

// right tunnel entrance (IMPORTANT)
{ x: 1350, y: 0, w: 50, h: 600, type: "wall" },   // top wall
{ x: 1350, y: 800, w: 50, h: (height - 800), type: "wall" }, // bottom wall

// =========================
// ORGANIC PLATFORMS
// =========================

// small rock-like steps
{ x: 200, y: 900, w: 120, h: 20, type: "platform" },
{ x: 500, y: 850, w: 140, h: 20, type: "platform" },

// central “main platform” (like bench area)
{ x: 750, y: 800, w: 180, h: 20, type: "platform" },

// near exit
{ x: 1100, y: 860, w: 140, h: 20, type: "platform" },


    // =========================
    // VERTICAL SHAFT
    // =========================
    { x: 1200, y: 0, w: 50, h: 1080, type: "wall" }, // left
    { x: 1500, y: 0, w: 50, h: 1080, type: "wall" }, // right
    { x: 1200, y: 0, w: 300, h: 50, type: "ceiling" }, // top
    { x: 1200, y: groundY, w: 300, h: (height - groundY), type: "ground" }, // bottom


    // =========================
    // CORRIDOR
    // =========================
    { x: 1500, y: groundY, w: 1000, h: (height - groundY), type: "ground" }, // floor
    { x: 1500, y: 600, w: 1000, h: 50, type: "ceiling" }, // ceiling

    { x: 1900, y: 800, w: 200, h: 200, type: "wall" }, // obstacle


    // =========================
    // ROOM 2 (OPEN AREA)
    // =========================
    { x: 2500, y: groundY, w: 1500, h: (height - groundY), type: "ground" }, // floor
    { x: 2500, y: 0, w: 50, h: 1080, type: "wall" }, // left wall
    { x: 3950, y: 0, w: 50, h: 1080, type: "wall" }, // right wall
    { x: 2500, y: 0, w: 1500, h: 50, type: "ceiling" }, // ceiling
  ];
  platforms = [

    // vertical shaft zig-zag
    { x: 1250, y: 900, w: 120, h: 20, type: "platform" },
    { x: 1350, y: 800, w: 120, h: 20, type: "platform" },
    { x: 1250, y: 700, w: 120, h: 20, type: "platform" },
    { x: 1350, y: 600, w: 120, h: 20, type: "platform" },

    // corridor helper
    { x: 1700, y: 900, w: 150, h: 20, type: "platform" },

    // ROOM 2
    { x: 2800, y: 900, w: 200, h: 20, type: "platform" },
    { x: 3100, y: 800, w: 200, h: 20, type: "platform" },
    { x: 3400, y: 700, w: 200, h: 20, type: "platform" },
  ];
}



function drawMap(cameraX, cameraY) {

  // =====================
  // DRAW WORLD (SOLID)
  // =====================
  for (let w of world) {

    push();

    if (w.type === "ground") fill(100);         // dark grey
    else if (w.type === "wall") fill(150, 50, 50); // red-ish
    else if (w.type === "ceiling") fill(50, 50, 150); // blue-ish
    else fill(120);

    rect(w.x - cameraX, w.y - cameraY, w.w, w.h);

    pop();
  }

  // =====================
  // DRAW PLATFORMS
  // =====================
  for (let p of platforms) {

    push();

    fill(180); // light grey

    rect(p.x - cameraX, p.y - cameraY, p.w, p.h);

    pop();
  }
}



// Debug helper: warns if platform gaps or steps look potentially unreachable
function validateLevel() {
  // conservative player params (matches player.js)
  const maxVerticalStep = 140; // px (safe ceiling for jump)
  const maxHorizontalGap = 220; // px (conservative horizontal reach during jump)

  for (let i = 0; i < copy.length - 1; i++) {
    const a = copy[i];
    const b = copy[i + 1];

    // horizontal gap between right edge of a and left edge of b
    const gap = b.x - (a.x + a.w);
    if (gap > maxHorizontalGap) {
      console.warn(`Level validator: large horizontal gap ${gap}px between platform at x=${a.x} and x=${b.x}`);
    }

    // vertical step from a top to b top (absolute)
    const vstep = Math.abs(b.y - a.y);
    if (vstep > maxVerticalStep) {
      console.warn(`Level validator: large vertical step ${vstep}px between platform y=${a.y} and y=${b.y}`);
    }
  }
}