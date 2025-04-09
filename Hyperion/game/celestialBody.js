// celestialBody.js

// Add radians method to Math if not exists
if (typeof Math.radians !== 'function') {
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };
}

export function calculateOrbit(orbitCenterX, orbitCenterY, radius, eccentricity) {
    // One point for each degree plus one extra to correct a visual issue with the initial point
    const points = [];
    for (let angleDeg = 0; angleDeg <= 361; angleDeg++) {
        const angle = Math.radians(angleDeg);
        const r = radius * (1 - Math.pow(eccentricity, 2)) / (1 + eccentricity * Math.cos(angle));
        const x = orbitCenterX + r * Math.cos(angle);
        const y = orbitCenterY + r * Math.sin(angle);
        points.push([x, y]);
    }

    // Return the orbit shape
    return points;
}