var Wheel = function(chars) {
	
	var self = this;
	this.characters = chars;
	this.position = 0;
	
	Wheel.prototype.setPosition = function(position) {
		self.position = position;
	};
	
	Wheel.prototype.encrypt = function(char) {
		var index = self.characters.indexOf(char);
		return self.characters.charAt(index+self.position);
	};

}

exports.create = function(chars) {
	return new Wheel(chars);
}