wheelFactory = require("./wheel.js");

var Enigma = function(wheels) {
	var wheelLetters = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,?!'\" ";

	var wheel = wheelFactory.create(wheelLetters,1);

	this.encrypt = function (plaintext, callback) {

		wheel.position = 6;
		var cipherText = "";

		for (i=0; i< plaintext.length; i++) {
			cipherText += wheel.encrypt(plaintext.charAt(i));
		}

		callback(cipherText);
	}	
}

exports.createEnigma = function(wheels) {
	return new Enigma(wheels);
}
		

