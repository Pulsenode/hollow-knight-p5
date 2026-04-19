# Hollow Knight p5 (Advanced Prototype)

## Project Origin & Intent

This project originally started as a university assignment.

However, it quickly became clear that the scope was much more complex than expected. One important factor is that **p5.js is a limited framework**, not originally designed to build complex video games. Because of these limitations, I was forced to **adapt, experiment, and sometimes “invent” my own solutions** to make systems work properly.

As development progressed, the project became too advanced for the academic requirements.  
Instead of simplifying everything, I made the decision to split the work:

- A **simplified version (V1)** was created to meet the assignment criteria  
- This **advanced version (V2)** was continued separately as a personal project  

I chose to keep working on this version purely out of interest and curiosity.  
I genuinely enjoy understanding how game systems work (physics, collisions, architecture), and this project became a way to explore that in depth.

---

## Development Journey

### From Simple Logic to Real Systems

At the beginning, the game was extremely simple:
- Basic movement (left / right / jump)
- Static enemies
- Simple collision detection

Very quickly, this approach became difficult to maintain.

Each new feature was breaking something else or making the code harder to understand.  
This is when I changed my mindset:

Instead of thinking in features, I started thinking in **systems**.

---

## Core Challenges & Solutions

### 1. Movement & Input System

**Problem:**
The first implementation used `keyPressed()`, which caused:
- inconsistent movement
- no smooth control
- input bugs when holding keys

**Solution:**
I switched to `keyIsDown()`:

- smooth continuous movement  
- consistent input handling  
- more responsive gameplay  

I also separated:
- input (keyBindings)
- physics (gravity)
- collision (platforms)

---

### 2. Gravity & Platform Collision (AABB)

**Problem:**
- player clipping inside platforms  
- unstable landing  
- jump sometimes not resetting  

**Solution:**
I implemented **AABB collision detection**:

- accurate collision checks  
- proper landing detection  
- reset of vertical velocity (`vy = 0`)  
- stable jump system (`isJumping`)  

This was a major improvement in game feel.

---

### 3. Enemy Behaviour (AI)

**Problem:**
Enemies were:
- static or predictable  
- not interacting with the player  
- not engaging  

**Solution:**
I implemented a simple AI system:

- detection range (distance check)  
- horizontal follow behavior  
- gravity applied (same as player)  
- platform collision  
- jump when player is above  

This made enemies feel dynamic and reactive.

---

### 4. Dynamic Enemy System

**Problem:**
- enemies not updating instantly  
- duplication bugs  
- required restart to apply changes  

**Solution:**
I created a real-time system:

- target enemy count (`desired`)  
- dynamic spawn/remove  
- synced with UI controls  

Now enemies update instantly during gameplay.

---

### 5. Custom UI (Sliders)

**Problem:**
HTML UI elements were breaking immersion.

**Solution:**
I built a custom UI inside the canvas:

- sliders drawn manually  
- mouse interaction (`mouseDragged`)  
- constrained + stepped values  
- stored in an array (`controls[]`)  

Each slider directly impacts gameplay:
- enemy speed  
- gravity  
- enemy count  

---

### 6. Code Architecture

**Problem:**
Everything was in one file:
- hard to read  
- hard to debug  
- not scalable  

**Solution:**
I split the project into multiple files:

- `player.js` → player logic  
- `enemies.js` → enemy logic  
- `world.js` → platforms & collisions  
- `ui.js` → interface system  
- `sketch.js` → main loop  

This improved:
- readability  
- structure  
- scalability  

---

### 7. Game State System

**Problem:**
- restart bugs  
- inconsistent flow  
- UI overlapping  

**Solution:**
I implemented a clean state system with:
- dedicated rendering per state  
- proper reset function  
- clean flow inside `draw()`  

---

## Key Design Decisions

- Keep visuals simple → focus on mechanics  
- Prioritize logic over graphics  
- Build reusable systems  
- Keep player and enemy physics consistent  

---

## What I Learned

- How to structure a game loop  
- Importance of separating systems  
- How collision systems work (AABB)  
- Debugging complex interactions  
- Why clean code is essential  

---

## Current Limitations

- No animations  
- Basic AI  
- No combat system  
- No camera system  
- Map system still basic (JSON in progress)  

---

## Future Improvements

- Add animations  
- Add camera system  
- JSON-based level loading  
- Combat system  
- Advanced enemy AI (states)  

---

## Disclaimer

This project is a **very limited technical interpretation** inspired by *Hollow Knight*.

- It does **not aim to replicate the full game**  
- It is **not intended for commercial use**  
- It is built **purely for learning and passion**  

All credit for the original game goes to the developers of *Hollow Knight* <3.

If you are interested in this type of gameplay, I strongly encourage you to play the original game.

---

## Personal Note

This project represents more than just a prototype.

It shows my progression:

- from simple scripts  
- to structured systems  
- to scalable architecture  

And most importantly:

I genuinely enjoy building and understanding how things work.