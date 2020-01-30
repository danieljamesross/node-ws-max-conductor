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
var spanBox = $("span");
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
    
    var topAmt = e.value_4;
    var leftAmt = e.value_5;
    var dur = e.value_6;
    //console.log(leftAmt);
    if (beat != lastBeat) {
	oc.stop();
	oc.animate({top: topAmt,left: leftAmt}, {duration: dur, easing: "swing"});
	spanBox.text(beat);
    }

    
    barBox.text(bar);
    beatBox.text(beat);
    tempoBox.text(tempo);

    
    lastBeat = beat;
};

// Managing the interaction

$(window).on("beforeunload", function () {
	exampleSocket.close();
});
