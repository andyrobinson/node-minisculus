var wheelFactory = require("./wheel.js");

var Enigma = function(wheels) {

    var machineWheels = wheels;

	this.encrypt = function (plaintext, callback) {
		
		var i, cipherText = "";
		for (i=0; i< plaintext.length; i++) {
			cipherText += encryptChar(plaintext.charAt(i), machineWheels);
		}

		callback(cipherText);
	}
	
	encryptChar = function(plainChar, wheels) {
		var i,cipherChar = plainChar;
		for (i=0;i < wheels.length;i++) {
			cipherChar = wheels[i].encrypt(cipherChar); 
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
	var allWheels = [wheelFactory.create(1),wheelFactory.create(-2)];
	var wheels = allWheels.slice(0,arguments.length);
	setPositions(wheels, arguments);
	return new Enigma(wheels);
}
		

