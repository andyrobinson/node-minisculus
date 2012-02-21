var vows = require('vows');
var assert = require('assert');
var wheelFactory = require('../wheel.js');

vows.describe('Wheel').addBatch({       
	'create': {
		topic: wheelFactory.create(0, 0),
		'has encrypt function': function (topic) {
			assert.isFunction(topic.encrypt);
		}
	},	
	'encrypt with zero position': {
		topic: function () { 
					var wheel = wheelFactory.create(1,0);
					wheel.position =0;
					return wheel;
				},
		'is identity' : function(topic) {
			assert.equal(topic.encrypt('b',0),'b');
			assert.equal(topic.encrypt('c',0),'c');
		}
	},	
	'encrypt with position should offset 1': {
		topic: function () { 
					var wheel = wheelFactory.create(1,0);
					wheel.position = 5;
					return wheel;
				},
		'should right shift' : function(topic) {
			assert.equal(topic.encrypt('b',0),'g');
			assert.equal(topic.encrypt('c',0),'h');
		},
		'should wrap' : function(topic) {
			assert.equal(topic.encrypt(' ',0),'4');
		}
	},
	'encrypt with position should use negative offset': {
		topic: function () {
					var wheel = wheelFactory.create(-2,0);
					wheel.position = 3;
					return wheel;
				},
		'should left shift' : function(topic) {
			assert.equal(topic.encrypt('g',0),'a');
			assert.equal(topic.encrypt('z',0),'t');
		},
		'should wrap' : function(topic) {
			assert.equal(topic.encrypt('1',0),'?');
		}
	},
	'each created wheel is different': {
		topic : function() {
			var wheel1 = wheelFactory.create(1,0);
			wheel1.position = 5;
			var wheel2 = wheelFactory.create(-2,0);
			wheel2.position = 17;
			return wheel1;
		},
		'should right shift by 5': function(topic) {
			assert.equal(topic.encrypt('b',0),'g');			
		}
	},
	'should offset using previous character position': {
		topic : function() {
			var wheel = wheelFactory.create(1,2);
			wheel.position = 5;
			return wheel;
		},
		'should right shift by 5, then another 10': function(topic) {
			assert.equal(topic.encrypt('b',5),'q');			
		}		
	},
	'should expose the index of a character as a method': {
		topic : function() {
			var wheel = wheelFactory.create(1,0);
			return wheel;
		},
		'wheel position for B': function(topic) {
			assert.equal(topic.positionOf('B'),11);
		}
		
	}
}).export(module);