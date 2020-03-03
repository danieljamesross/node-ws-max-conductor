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
let diameter = 75;
let monoSynth;
let env;
let metronomeState = 0;
let metronomeDisplay = 'Metronome';
let metronomePitch = "C5";
let newcolor = 'rgb(255,69,0)';
var button;


function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    button = createButton('Metronome');
    cnv.style('display', 'block');
    noStroke();
    distX = endX - beginX;
    distY = endY - beginY;
    frameRate(100);

    monoSynth = new p5.MonoSynth();
    monoSynth.setADSR(0.1, 0.005, 0.1, 0.05);
    button.style('background-color', 'rgb(255,69,0)');
    button.style('color', 'white');
    button.style('border', '0px');
    button.style('padding', '5px');
    button.position(19, (windowHeight * 0.5));
    button.touchStarted(metronomeOnOff);
    button.mousePressed(metronomeOnOff);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    fill(40, 50);
    rect(0, 0, width, height);
    pct += step;
    if (pct < 1.0) {
	x = beginX + pct * distX;
	y = beginY + pow(pct, exponent) * distY;
    }
    fill(newcolor);
    ellipse(x, y, diameter, diameter);
//    for (i = 1; i<10; i++) {
//	fill(30, 70);
//	ellipse(x + (i * 2), y + (i * 2), (diameter - (i * 2)), (diameter - (i * 2)));
//    }
    // when pct = 1.0 send message back to Max
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
	monoSynth.play(metronomePitch, 1, 0, 0.2);
    }
}

function conduct(maxX, maxY, expt, stp, color) {
    newcolor = color;
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
	button.style('background-color', 'rgb(0,128,0)');
    }
    else {
	metronomeState = 0;
	button.style('background-color', 'rgb(255,69,0)');
    }
}


