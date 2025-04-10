// t=0,draw=e=>{for(t||createCanvas(W=720,W),noFill(H=W/2),stroke(255,128),ellipseMode(CENTER),background(0),translate(H,H),rotate(t),a=0;a<1;a+=.01)push(),rotate(.1anoise(t)),ellipse(0,0,H*(1+(-.5+noise(a,t))),H/1.618*(1+(-.5+noise(t,a)))),pop();t+=.001};
// background(0);stroke(255);fill(0,0);ellipse(width/2,height/2,100,100);line(width/2,height/2,mouseX,mouseY);
// background(0);stroke(255);translate(width/2,height/2);rotate(frameCount*0.01);for(i=0;i<100;i++){angle=map(i,0,100,0,TWO_PI);x=cos(angle)*200;y=sin(angle)*200;ellipse(x,y,20,20);}

//https://dzr.page.link/jqbMucmTdYEdXxwM8
//https://dzr.page.link/141vx5zq282BCAVJ6
//https://dzr.page.link/C2MPbdoKqrk1RE3x6

    // Array to store our circles
    let circles = [];
    // Number of circles to create (increased to demonstrate quadtree benefit)
    const numCircles = 200;
    // Track which circle (if any) the mouse is currently inside
    let hoveredCircleIndex = -1;
    // Quadtree for spatial partitioning
    let quadtree;
    // Toggle for showing quadtree visualization
    let showQuadtree = true;
    
    function setup() {
      // Create a canvas that is 600x400 pixels to fit all the circles
      createCanvas(600, 400);
      
      // Create circles with random positions, sizes, and colors
      for (let i = 0; i < numCircles; i++) {
        // Random radius between 10 and 30
        let radius = random(10, 30);
        // Random position that keeps the circle on screen
        let x = random(radius, width - radius);
        let y = random(radius, height - radius);
        // Random color
        let r = random(50, 255);
        let g = random(50, 255);
        let b = random(50, 255);
        
        // Add to our circles array
        circles.push({
          x: x,
          y: y,
          radius: radius,
          color: {r, g, b},
          hovered: false,
          // Adding velocity for optional movement
          vx: random(-0.5, 0.5),
          vy: random(-0.5, 0.5)
        });
      }
    }

    function draw() {
      // Set the background color
      background(240);
      
      // Create a fresh quadtree each frame (since circles move)
      quadtree = new Quadtree(new Rectangle(0, 0, width, height), 4);
      
      // Add all circles to the quadtree
      for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        let point = new Point(c.x, c.y, { index: i });
        quadtree.insert(point);
      }
      
      // Move circles slightly for more interesting visual
      moveCircles();
      
      // Draw the quadtree if enabled
      if (showQuadtree) {
        drawQuadtree(quadtree);
      }
      
      // Find circles near the mouse point using quadtree
      let mouseRange = 30; // Search radius around mouse point
      let queryRect = new Rectangle(
        mouseX - mouseRange, 
        mouseY - mouseRange,
        mouseRange * 2,
        mouseRange * 2
      );
      
      let potentialHits = [];
      quadtree.query(queryRect, potentialHits);
      
      // Find the closest circle that contains the mouse point
      hoveredCircleIndex = -1;
      let minDepth = Infinity; // Used to determine which circle is on top if multiple overlap
      
      for (let i = 0; i < potentialHits.length; i++) {
        let index = potentialHits[i].data.index;
        let c = circles[index];
        
        // Calculate squared distance
        let dx = mouseX - c.x;
        let dy = mouseY - c.y;
        let distSquared = dx * dx + dy * dy;
        
        // Check if mouse is inside this circle
        if (distSquared <= c.radius * c.radius) {
          // Assume circles added later are drawn on top (greater depth)
          if (index > minDepth) {
            hoveredCircleIndex = index;
            minDepth = index;
          } else if (hoveredCircleIndex === -1) {
            hoveredCircleIndex = index;
            minDepth = index;
          }
        }
      }
      
      // Draw all circles
      for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        
        // Set fill color - highlight if this is the hovered circle
        if (i === hoveredCircleIndex) {
          fill(255, 100, 100);
          stroke(200, 50, 50);
          strokeWeight(3);
        } else {
          fill(c.color.r, c.color.g, c.color.b);
          noStroke();
        }
        
        // Draw the circle
        circle(c.x, c.y, c.radius * 2);
      }
      
      // Display information
      textSize(14);
      textAlign(LEFT);
      fill(30);
      
      text(`Total Circles: ${numCircles}`, 10, 20);
      text(`Circles checked: ${potentialHits.length} of ${numCircles}`, 10, 40);
      
      if (hoveredCircleIndex !== -1) {
        let c = circles[hoveredCircleIndex];
        text(`Mouse is inside circle #${hoveredCircleIndex}`, 10, height - 40);
        text(`Circle position: (${round(c.x)}, ${round(c.y)}), radius: ${round(c.radius)}`, 10, height - 20);
      } else {
        text("Mouse is not inside any circle", 10, height - 20);
      }
      
      // Show instructions
      text("Press 'q' to toggle quadtree visualization", width - 270, 20);
    }
    
    function keyPressed() {
      if (key === 'q' || key === 'Q') {
        showQuadtree = !showQuadtree;
      }
    }
    
    // Function to handle mouse clicks
    function mouseClicked() {
      if (hoveredCircleIndex !== -1) {
        // Change properties of the clicked circle
        let c = circles[hoveredCircleIndex];
        c.radius = random(10, 30);
        c.color.r = random(50, 255);
        c.color.g = random(50, 255);
        c.color.b = random(50, 255);
      }
    }
    
    // Function to move circles slightly
    function moveCircles() {
      for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        
        // Move circle
        c.x += c.vx;
        c.y += c.vy;
        
        // Bounce off walls
        if (c.x < c.radius || c.x > width - c.radius) {
          c.vx *= -1;
        }
        if (c.y < c.radius || c.y > height - c.radius) {
          c.vy *= -1;
        }
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
    
    // Rectangle class for quadtree
    class Rectangle {
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
    class Point {
      constructor(x, y, data) {
        this.x = x;
        this.y = y;
        this.data = data;
      }
    }
    
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
        
        let nw = new Rectangle(x, y, w, h);
        let ne = new Rectangle(x + w, y, w, h);
        let sw = new Rectangle(x, y + h, w, h);
        let se = new Rectangle(x + w, y + h, w, h);
        
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