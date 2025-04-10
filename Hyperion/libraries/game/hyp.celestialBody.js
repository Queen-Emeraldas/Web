// celestialBody.js

// Calculate orbit
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