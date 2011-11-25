var Wheel = function(chars) {
	
	// for explanation of private, public and priviledged
	// see http://javascript.crockford.com/private.html
	var characters = chars; // private
	var self = this;

	this.position = 0; // public
		
	this.encrypt = function(char) { // priviledged method
		var index = characters.indexOf(char);
		return characters.charAt(offsetForEncryptionWithWrap(index));
	};
	
	function offsetForEncryptionWithWrap(indexOfPlainTextChar) {
		return (indexOfPlainTextChar+self.position) % characters.length
	}

}

exports.create = function(chars) {
	return new Wheel(chars);
}