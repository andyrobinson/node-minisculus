var wheelFactory = require("./wheel.js");

var Enigma = function(wheels) {

	this.encrypt = function (plaintext, callback) {
		
		var i, ch, cipherText = "";
		var previousCharIndex = 0;
		
		for (i=0; i< plaintext.length; i++) {
			ch = plaintext.charAt(i);
			cipherText += encryptChar(ch, previousCharIndex);
			previousCharIndex = wheels[0].positionOf(ch);
		}

		callback(cipherText.replace(/"/g,"\\\""));
	}
	
	function encryptChar(plainChar, previousCharIndex) {
		var i,cipherChar = plainChar;
		for (i=0;i < wheels.length;i++) {
			cipherChar = wheels[i].encrypt(cipherChar,previousCharIndex); 
		}
		return cipherChar;
	}
}

var setPositions = function(wheels, initialPositions) {
  var i;
  for (i=0;i<initialPositions.length;i++) {
    wheels[i].position = initialPositions[i];
  }
}

exports.createEnigma = function() {
	var allWheels = [wheelFactory.create(1,0),wheelFactory.create(-2,0), wheelFactory.create(0,2)];
	var wheels = allWheels.slice(0,arguments.length);
	setPositions(wheels, arguments);
	return new Enigma(wheels);
}
		

