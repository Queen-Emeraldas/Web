// _______ ___ ___ _______ ______   _______ _______ _______ _______ 
// |   _   |   Y   |   _   |   _  \ |       |   _   |   _   |   _   |
// |.  |   |.  |   |.  1   |.  |   \|.|   | |.  l   |.  1___|.  1___|
// |.  |   |.  |   |.  _   |.  |    `-|.  |-|.  _   |.  __)_|.  __)_ 
// |:  1   |:  1   |:  |   |:  1    / |:  | |:  |   |:  1   |:  1   |
// |::..   |::.. . |::.|:. |::.. . /  |::.| |::.|:. |::.. . |::.. . |
// `----|:.`-------`--- ---`------'   `---' `--- ---`-------`-------'
//      `--'                                                         

// Quadtree class
class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;

        // Child quadtrees
        this.northwest = null;
        this.northeast = null;
        this.southwest = null;
        this.southeast = null;
    }

    // Subdivide this quadtree into four equal quadrants
    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w / 2;
        let h = this.boundary.h / 2;

        let nw = new QuadRectangle(x, y, w, h);
        let ne = new QuadRectangle(x + w, y, w, h);
        let sw = new QuadRectangle(x, y + h, w, h);
        let se = new QuadRectangle(x + w, y + h, w, h);

        this.northwest = new Quadtree(nw, this.capacity);
        this.northeast = new Quadtree(ne, this.capacity);
        this.southwest = new Quadtree(sw, this.capacity);
        this.southeast = new Quadtree(se, this.capacity);

        this.divided = true;
    }

    // Insert a point into this quadtree
    insert(point) {
        // If point is outside boundary, don't insert
        if (!this.boundary.contains(point)) {
            return false;
        }

        // If there's space in this quadtree and not divided, add here
        if (this.points.length < this.capacity && !this.divided) {
            this.points.push(point);
            return true;
        }

        // Otherwise, subdivide and add to appropriate quadrant
        if (!this.divided) {
            this.subdivide();
        }

        // Try to insert in each child quadtree
        if (this.northwest.insert(point)) return true;
        if (this.northeast.insert(point)) return true;
        if (this.southwest.insert(point)) return true;
        if (this.southeast.insert(point)) return true;

        // Should never reach here
        return false;
    }

    // Find all points within a range
    query(range, found) {
        if (!found) {
            found = [];
        }

        // If range doesn't intersect boundary, return empty array
        if (!this.boundary.intersects(range)) {
            return found;
        }

        // Check points at this level
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            if (range.contains(point)) {
                found.push(point);
            }
        }

        // If this quadtree is divided, check each child
        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }
}

// Rectangle class for quadtree
class QuadRectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // Check if this rectangle contains a point
    contains(point) {
        return (
            point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h
        );
    }

    // Check if this rectangle intersects with another rectangle
    intersects(range) {
        return !(
            range.x > this.x + this.w ||
            range.x + range.w < this.x ||
            range.y > this.y + this.h ||
            range.y + range.h < this.y
        );
    }
}

// Point class for quadtree
class QuadPoint {
    constructor(x, y, data) {
        this.x = x;
        this.y = y;
        this.data = data;
    }
}

// Draw the quadtree structure (for visualization)
function drawQuadtree(quadtree) {
    stroke(100, 100, 100, 100);
    strokeWeight(1);
    noFill();
    rect(
        quadtree.boundary.x,
        quadtree.boundary.y,
        quadtree.boundary.w,
        quadtree.boundary.h
    );

    if (quadtree.divided) {
        drawQuadtree(quadtree.northwest);
        drawQuadtree(quadtree.northeast);
        drawQuadtree(quadtree.southwest);
        drawQuadtree(quadtree.southeast);
    }
}