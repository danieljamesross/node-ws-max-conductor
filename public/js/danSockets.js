// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based Node host via websockets. It uses fairly standard jQuery
// to perform its thing...
// --------------------------------------------------------------------------
/* global $ */


var exampleSocket = new WebSocket("ws://localhost:7474");
var oc = $("#ball");
var barBox = $("#value_1");
var beatBox = $("#value_2");
var tempoBox = $("#value_3");
var instructionBox = $("#instruction");
var tSBox = $("#value_4");
exampleSocket.onopen = function (event) {
	console.log("sending data...");
	exampleSocket.send("Ready, willing and able!");
};

exampleSocket.onmessage = function (event) {
    let e = JSON.parse(event.data);
    
    // console.log(e.value_1);
    var bar = e.value_1;
    var beat = e.value_2;
    var lastBeat = 0;
    var tempo = e.value_3;
    
    //  var topAmt = e.value_4;
    //  var leftAmt = e.value_5;
    var instruction = e.value_6;
    var timeSig = e.value_7;
    //console.log(leftAmt);
    var maxX = e.value_4;
    var maxY = e.value_5;
    var lastX = 0;
    var lastY = 0;
    var expt = 4;
    if (beat != lastBeat) {
	oc.stop();
	if (beat != 1) {
	    expt = 4;
	}
	else {
	    expt = 1;
	}

	
	conduct(maxX, maxY, expt);
	lastBeat = beat;
	lastX = maxX;
	lastY = maxY;
	barBox.text(bar);
	beatBox.text(beat);
	tempoBox.text(tempo);
	instructionBox.text(instruction);
	tSBox.text(timeSig);
    }
    
   
    
};

// Managing the interaction

$(window).on("beforeunload", function () {
	exampleSocket.close();
});
