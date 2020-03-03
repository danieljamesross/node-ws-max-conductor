// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based Node host via websockets. It uses fairly standard jQuery
// to perform its thing...
// --------------------------------------------------------------------------
/* global $ */
var exampleSocket = new WebSocket("ws://192.168.0.11:7474");
var oc = $("#ball");
var barBox = $("#value_1");
var beatBox = $("#value_2");
var tempoBox = $("#value_3");
var instructionBox = $("#instruction");
var tSBox = $("#value_4");
var theBeat = "yes";
var lastBeat = 0;
var color = 'red';

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

function setStp (tmp) {
    var outStp;
    if (tmp >= 300) {
	outStp = 0.4;
    }
    else if (tmp <= 30) {
	outStp = 0.08;
    }
    else {
	outStp = convertRange(tmp, [ 30, 300 ], [ 0.08, 0.4 ]);
    }
    return outStp;
}



exampleSocket.onopen = function (event) {
	console.log("sending data...");
	exampleSocket.send("Ready, willing and able!");
};

exampleSocket.onmessage = function (event) {
    let e = JSON.parse(event.data);
    var bar = e.value_1;
    var beat = e.value_2;
    var tempo = e.value_3;
    var instruction = e.value_6;
    var timeSig = e.value_7;
    var maxX = e.value_4;
    var maxY = e.value_5;
    var lastX = 0;
    var lastY = 0;
    var expt = 4;
    var stp = setStp(tempo);
    if (beat != lastBeat) {
	oc.stop();
	if (beat != 1) {
	    expt = 3;
	}
	else {
	    expt = 1;
	}
	switch (beat) {
	case 1:
	    color = 'rgb(0,128,0)'; //green
	    break;
	case 2:
	    color = 'rgb(30,144,255)'; //blue
	    break;
	case 3:
	    color = 'rgb(255,215,0)';//yellow
	    break;
	case 4:
	    color = 'rgb(255,69,0)';//red
	}

	conduct(maxX, maxY, expt, stp, color);
	metronome(beat);
    }
    lastBeat = beat;
    lastX = maxX;
    lastY = maxY;
    barBox.text(bar);
    beatBox.text(beat);
    tempoBox.text(tempo);
    instructionBox.text(instruction);
    tSBox.text(timeSig);
    
   
    //send back to Max
    exampleSocket.send(theBeat);
    
};


// Managing the interaction

$(window).on("beforeunload", function () {
	exampleSocket.close();
});
