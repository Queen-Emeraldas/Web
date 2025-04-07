function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(220);
  t=0,draw=e=>{for(t||createCanvas(W=720,W),noFill(H=W/2),stroke(255,128),ellipseMode(CENTER),background(0),translate(H,H),rotate(t),a=0;a<1;a+=.01)push(),rotate(.1*a*noise(t)),ellipse(0,0,H*(1+(-.5+noise(a,t))),H/1.618*(1+(-.5+noise(t,a)))),pop();t+=.001};
}
