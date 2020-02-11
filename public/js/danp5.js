let beginX = 400.0; // Initial x-coordinate
let beginY = 580.0; // Initial y-coordinate
let endX = 400.0; // Final x-coordinate
let endY = 580.0; // Final y-coordinate
let distX; // X-axis distance to move
let distY; // Y-axis distance to move
let exponent = 4; // Determines the curve
let x = 0.0; // Current x-coordinate
let y = 0.0; // Current y-coordinate
let step = 0.9; // Size of each step along the path
let pct = 0.0; // Percentage traveled (0.0 to 1.0)
let diameter = 50;

function setup() {

    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    noStroke();
    distX = endX - beginX;
    distY = endY - beginY;
    frameRate(120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {

    fill(255, 15);
    rect(0, 0, width, height);
    pct += step;
    if (pct < 1.0) {
	x = beginX + pct * distX;
	y = beginY + pow(pct, exponent) * distY;
    }
    fill('red');
    ellipse(x, y, diameter, diameter);
}

function conduct(maxX, maxY, expt) {
    console.log(maxX);
    exponent = expt;
    step = 0.08;
    pct = 0.0;
    beginX = x;
    beginY = y;
    endX = maxX * windowWidth;
    endY = maxY * windowHeight;
    distX = endX - beginX;
    distY = endY - beginY;
}
