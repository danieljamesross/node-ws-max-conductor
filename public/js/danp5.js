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
var metButton;
var incButton;
var decButton;


function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    metButton = createButton('Metronome');
		incButton = createButton('+');
		decButton = createButton('-');
    cnv.style('display', 'block');
    noStroke();
    distX = endX - beginX;
    distY = endY - beginY;
    frameRate(100);

    monoSynth = new p5.MonoSynth();
    monoSynth.setADSR(0.1, 0.005, 0.1, 0.05);
		
    metButton.style('background-color', 'rgb(255,69,0)');
    metButton.style('color', 'white');
    metButton.style('border', '0px');
    metButton.style('padding', '5px');
    metButton.position(19, (windowHeight * 0.5));
    metButton.touchStarted(metronomeOnOff);
    metButton.mousePressed(metronomeOnOff);
		
		incButton.style('background-color', 'rgb(255,69,0)');
    incButton.style('color', 'white');
    incButton.style('border', '0px');
    incButton.style('padding', '5px');
		incButton.style('width', '30px');
    incButton.position(19, (windowHeight * 0.75));
	//	incButton.click(mouseX, mouseY);
//    incButton.touchStarted(incDiameter);
 //   incButton.mousePressed(incDiameter);
//		incButton.mouseReleased('background-color', 'rgb(255,69,0)');
		
		decButton.style('background-color', 'rgb(255,69,0)');
    decButton.style('color', 'white');
    decButton.style('border', '0px');
    decButton.style('padding', '5px');
		decButton.style('width', '30px');
    decButton.position(59, (windowHeight * 0.75));
  //  decButton.touchStarted(decDiameter);
 //   decButton.mousePressed(decDiameter);
//		decButton.mouseReleased('background-color', 'rgb(255,69,0)');

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
				metButton.style('background-color', 'rgb(0,128,0)');
    }
    else {
				metronomeState = 0;
				metButton.style('background-color', 'rgb(255,69,0)');
    }
}

function incDiameter() {

		diameterChange(1);
		incButton.style('background-color', 'rgb(0,128,0)');
}

function decDiameter() {
		diameterChange(-1);
		decButton.style('background-color', 'rgb(0,128,0)');
}


function diameterChange(amt) {
		diameter = diameter + amt;
}
