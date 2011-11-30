var Wheel = function(chars, increment) {
	
	// for explanation of private, public and priviledged
	// see http://javascript.crockford.com/private.html
	var characters = chars; // private
	var inc = increment;
	var self = this;

	this.position = 0; // public
		
	this.encrypt = function(char) { // priviledged method
		var index = characters.indexOf(char);
		return characters.charAt(offsetForEncryptionWithWrap(index));
	};
	
	function offsetForEncryptionWithWrap(indexOfPlainTextChar) {
		var newPosition = indexOfPlainTextChar+self.position * inc;
		var wrappedPosition = (newPosition + characters.length) % characters.length;
		return wrappedPosition;
	}

}

exports.create = function(chars, increment) {
	return new Wheel(chars, increment);
}