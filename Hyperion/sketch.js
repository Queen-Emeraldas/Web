//   ___ ___ ___ ___ _______ _______ _______ ___ _______ ______
//  |   Y   |   Y   |   _   |   _   |   _   |   |   _   |   _  \
//  |.  1   |   1   |.  1   |.  1___|.  l   |.  |.  |   |.  |   |
//  |.  _   |\_   /|.  ____|.  __)|.  _   |.  |.  |   |.  |   |
//  |:  |   | |:  | |:  |   |:  1   |:  |   |:  |:  1   |:  |   |
//  |::.|:. | |::.| |::.|   |::.. . |::.|:. |::.|::.. . |::.|   |
//   ---  ---'  ---'  ---'   ---------- ----------------      ---'

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
}

// Window Resized
// This function is called whenever the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(20, 29, 34);
}

// Draw
// This function is called continuously in a loop
function draw() {
    fill(255, 191, 0)
    circle(width / 2, height / 2, 9);
}