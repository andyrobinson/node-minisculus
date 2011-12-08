var wheelFactory = require("./wheel.js");
var allWheels = [wheelFactory.create(1), wheelFactory.create(-2)];

var Enigma = function(wheels) {

    var machineWheels = wheels;

	this.encrypt = function (plaintext, callback) {

		var cipherText = "";

		for (i=0; i< plaintext.length; i++) {
			cipherText += encryptChar(plaintext.charAt(i));
		}

		callback(cipherText);
	}
	
	encryptChar = function(plainChar) {
		var i,cipherChar = plainChar;
		for (i=0;i<wheels.length;i++) {
			cipherChar = machineWheels[i].encrypt(cipherChar); 
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
	var wheels = allWheels.slice(0,arguments.length);
	setPositions(wheels, arguments);
	return new Enigma(wheels);
}
		

