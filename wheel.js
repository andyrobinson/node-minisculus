

var Wheel = function(increment) {
	
	// for explanation of private, public and priviledged
	// see http://javascript.crockford.com/private.html
	var wheelLetters = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,?!'\" ";
	var inc = increment;
	var self = this;

	this.position = 0; // public
		
	this.encrypt = function(char) { // priviledged method
		var index = wheelLetters.indexOf(char);
		return wheelLetters.charAt(offsetForEncryptionWithWrap(index));
	};
	
	function offsetForEncryptionWithWrap(indexOfPlainTextChar) {
		var newPosition = indexOfPlainTextChar+self.position * inc;
		var wrappedPosition = (newPosition + wheelLetters.length) % wheelLetters.length;
		return wrappedPosition;
	}

}

exports.create = function(initialPosition, increment) {
	return new Wheel(initialPosition, increment);
}