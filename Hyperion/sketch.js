//   ___ ___ ___ ___ _______ _______ _______ ___ _______ ______
//  |   Y   |   Y   |   _   |   _   |   _   |   |   _   |   _  \
//  |.  1   |   1   |.  1   |.  1___|.  l   |.  |.  |   |.  |   |
//  |.  _   |\_   _/|.  ____|.  __)_|.  _   |.  |.  |   |.  |   |
//  |:  |   | |:  | |:  |   |:  1   |:  |   |:  |:  1   |:  |   |
//  |::.|:. | |::.| |::.|   |::.. . |::.|:. |::.|::.. . |::.|   |
//  `--- ---' `---' `---'   `-------`--- ---`---`-------`--- ---'

//


// Variables declaration
let circles = [];  // Array to store our circles
const numCircles = 200;  // Number of circles to create (increased to demonstrate quadtree benefit)
let hoveredCircleIndex = -1;  // Track which circle (if any) the mouse is currently inside
let quadtree;  // Quadtree for spatial partitioning
let showQuadtree = true;  // Toggle for showing quadtree visualization


// Setup
// This function is called once at the beginning of the program
function setup() {

    const BACKGROUND_COLOR = color(20, 29, 34)
    const STAR_COLOR = color(255, 191, 0)
    const PLANET_COLOR = color(123, 182, 97)
    const MOON_COLOR = color(250, 235, 215)
    const ASTEROID_COLOR = color(132, 132, 130)
    const ORBIT_COLOR = color(215, 215, 215)

    createCanvas(windowWidth, windowHeight);
    background(BACKGROUND_COLOR);

    fill(255, 191, 0) // Set fill color to yellow
    circle(width / 2, height / 2, 9); // Draw the star in the center
}

// Draw
// This function is called continuously in a loop
function draw() {

    quadtree = new Quadtree(new QuadRectangle(0, 0, width, height), 4);

    noFill(); // Disable fill for the orbit
    stroke(215, 215, 215); // Set stroke color to white
    strokeWeight(0.05); // Set stroke weight
    calculateOrbit(width / 2, height / 2, 100, 0)
}

// Window Resized
// This function is called whenever the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(20, 29, 34);
    setup()
}

// Key Pressed
// This function is called whenever a key is pressed
function keyPressed() {
    // Toggle the quadtree visualization on and off
    if (key === 'q' || key === 'Q') {
      showQuadtree = !showQuadtree;
    }
  }