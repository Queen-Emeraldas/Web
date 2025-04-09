//   ___ ___ ___ ___ _______ _______ _______ ___ _______ ______
//  |   Y   |   Y   |   _   |   _   |   _   |   |   _   |   _  \
//  |.  1   |   1   |.  1   |.  1___|.  l   |.  |.  |   |.  |   |
//  |.  _   |\_   _/|.  ____|.  __)_|.  _   |.  |.  |   |.  |   |
//  |:  |   | |:  | |:  |   |:  1   |:  |   |:  |:  1   |:  |   |
//  |::.|:. | |::.| |::.|   |::.. . |::.|:. |::.|::.. . |::.|   |
//  `--- ---' `---' `---'   `-------`--- ---`---`-------`--- ---'

function calculateOrbit(orbitCenterX, orbitCenterY, radius, eccentricity) {

    // Begin shape to draw a custom path
    beginShape();
    
    // One point for each degree to create a smooth elliptical orbit
    for (let angleDeg = 0; angleDeg <= 360; angleDeg++) {
      const angle = angleDeg * Math.PI / 180;
      const r = radius * (1 - Math.pow(eccentricity, 2)) / (1 + eccentricity * Math.cos(angle));
      const x = orbitCenterX + r * Math.cos(angle);
      const y = orbitCenterY + r * Math.sin(angle);
      
      // Add vertex to the shape
      vertex(x, y);
    }
    
    // Close the shape
    endShape(CLOSE);
  }

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
    fill(255, 191, 0) // Set fill color to yellow
    circle(width / 2, height / 2, 9);

    noFill(); // Disable fill for the orbit
    stroke(215, 215, 215); // Set stroke color to white
    strokeWeight(0.05); // Set stroke weight
    calculateOrbit(width / 2, height / 2, 100, 0)
}