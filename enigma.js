wheelFactory = require("./wheel.js");

var wheel = wheelFactory.create([
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  ".", ",", "?", "!", "'", "\"", " "
]);

exports.encrypt = function (plaintext, callback) {

	wheel.setPosition(6);
	var cipherText = "";
	
	for (i=0; i< plaintext.length; i++) {
		cipherText = "" + wheel.encrypt(plaintext.charAt(i));
	}

	callback(cipherText);
}
		

