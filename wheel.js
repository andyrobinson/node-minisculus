var Wheel = function(multiplier, previousMultiplier) {
	
	// for explanation of private, public and priviledged
	// see http://javascript.crockford.com/private.html
	var wheelLetters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,?!'\" ";
	var self = this;

	this.position = 0; // public
	
	this.positionOf = function(ch) {
		return wheelLetters.indexOf(ch);
	}
	
	this.encrypt = function(ch, previousCharPosition) { // priviledged method
		return wheelLetters.charAt(offsetForEncryptionWithWrap(self.positionOf(ch),self.position, previousCharPosition));
	};
	
	function offsetForEncryptionWithWrap(indexOfPlainTextChar, pos, previousCharPosition) {
		var newPosition = indexOfPlainTextChar + (pos * multiplier) + (previousCharPosition * previousMultiplier);
		var wrappedPosition = (newPosition + wheelLetters.length) % wheelLetters.length;
		return wrappedPosition;
	}

}

exports.create = function(multiplier, previousMultiplier) {
	return new Wheel(multiplier, previousMultiplier);
}