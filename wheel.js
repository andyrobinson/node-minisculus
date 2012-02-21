

var Wheel = function(multiplier) {
	
	// for explanation of private, public and priviledged
	// see http://javascript.crockford.com/private.html
	var wheelLetters = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,?!'\" ";
	var mult = multiplier;
	var self = this;

	this.position = 0; // public
	
	this.encrypt = function(char, previousCharPosition) { // priviledged method
		var index = wheelLetters.indexOf(char);
		return wheelLetters.charAt(offsetForEncryptionWithWrap(index,this.position, mult, previousCharPosition));
	};
	
	function offsetForEncryptionWithWrap(indexOfPlainTextChar, pos, multiplier, previousCharPosition) {
		var newPosition = indexOfPlainTextChar + pos * multiplier;
		var wrappedPosition = (newPosition + wheelLetters.length) % wheelLetters.length;
		return wrappedPosition;
	}

}

exports.create = function(multiplier) {
	return new Wheel(multiplier);
}