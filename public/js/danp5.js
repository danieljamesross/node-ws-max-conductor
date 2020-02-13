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
let monoSynth;
let env;
let metronomeState = 0;
let metronomeDisplay = 'Metronome Off';
let metronomePitch = "C5";



function setup() {
  
    var cnv = createCanvas(windowWidth, windowHeight);
    var button = createButton('Metronome');
    cnv.style('display', 'block');
    noStroke();
    distX = endX - beginX;
    distY = endY - beginY;
    frameRate(300);

    monoSynth = new p5.MonoSynth();
    monoSynth.setADSR(0.001, 0.001, 0., 0.01);
    
    //env = new p5.Envelope();
    //env.setADSR(0.001, 0.02, 0.4, 0.03);
    //env.setRange(1.0, 0);
    
    button.position(19, 19);
    button.mousePressed(metronomeOnOff);

    text(metronomeDisplay, 100, 100, 400, 400);    
//    metronomeDisplay = createElement('h2', 'Metronome OFF');
//    metronomeDisplay.position(100, 19);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {

    fill(255, 50);
    rect(0, 0, width, height);
    pct += step;
    if (pct < 1.0) {
	x = beginX + pct * distX;
	y = beginY + pow(pct, exponent) * distY;
    }
    // when pct = 1.0 send message back to Max
    fill('red');
    ellipse(x, y, diameter, diameter);
    
    if (pct >= 0.999) {
	theBeat = 1;
    }
    else {
	theBeat = 0;
    }


}

function metronome (beat) {
    if (metronomeState == 1) {
	if (beat != 1) {
	    metronomePitch = "G5";
	}
	else {
	    metronomePitch = "C6";
	}
	monoSynth.play(metronomePitch, 1, 0, 0.01);
    }
}

function conduct(maxX, maxY, expt, stp) {
//    console.log(maxX);
    exponent = expt;
    step = stp;
    pct = 0.0;
    beginX = x;
    beginY = y;
    endX = maxX * windowWidth;
    endY = maxY * windowHeight;
    distX = endX - beginX;
    distY = endY - beginY;
}

function metronomeOnOff () {
    if (metronomeState == 0) {
	metronomeState = 1;
//	metronomeDisplay.html('Metronome ON');
    }
    else {
	metronomeState = 0;
//	metronomeDisplay.html('Metronome OFF');
    }
}


