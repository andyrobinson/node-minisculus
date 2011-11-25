wheelFactory = require("./wheel.js");

var wheel = wheelFactory.create("01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,?!'\" ");

exports.encrypt = function (plaintext, callback) {

	wheel.position = 6;
	var cipherText = "";
	
	for (i=0; i< plaintext.length; i++) {
		cipherText += wheel.encrypt(plaintext.charAt(i));
	}

	callback(cipherText);
}
		

