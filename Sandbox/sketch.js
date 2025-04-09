// t=0,draw=e=>{for(t||createCanvas(W=720,W),noFill(H=W/2),stroke(255,128),ellipseMode(CENTER),background(0),translate(H,H),rotate(t),a=0;a<1;a+=.01)push(),rotate(.1anoise(t)),ellipse(0,0,H*(1+(-.5+noise(a,t))),H/1.618*(1+(-.5+noise(t,a)))),pop();t+=.001};
// background(0);stroke(255);fill(0,0);ellipse(width/2,height/2,100,100);line(width/2,height/2,mouseX,mouseY);
// background(0);stroke(255);translate(width/2,height/2);rotate(frameCount*0.01);for(i=0;i<100;i++){angle=map(i,0,100,0,TWO_PI);x=cos(angle)*200;y=sin(angle)*200;ellipse(x,y,20,20);}

//https://dzr.page.link/jqbMucmTdYEdXxwM8
//https://dzr.page.link/141vx5zq282BCAVJ6
//https://dzr.page.link/C2MPbdoKqrk1RE3x6

// Setup function
function setup() {
    createCanvas(720, 720); // Create a canvas of size 720x720
    noFill(); // Disable filling shapes
}

// Draw function
function draw() {
    //when mouse button is pressed, circles turn black
if (mouseIsPressed === true) {
    fill(0);
  } else {
    fill(255);
  }
  
  //white circles drawn at mouse position
  circle(mouseX, mouseY, 100);
}