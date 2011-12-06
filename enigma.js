wheelFactory = require("./wheel.js");

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
		return machineWheels[0].encrypt(plainChar);
	}
}

exports.createEnigma = function(numberOfWheels) {
	var wheels = [wheelFactory.create(6,1)];	
	return new Enigma(wheels);
}
		

