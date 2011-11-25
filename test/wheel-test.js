var vows = require('vows');
var assert = require('assert');
var wheelFactory = require('../wheel.js');

vows.describe('Wheel').addBatch({       
	'create': {
		topic: wheelFactory.create("abcdefghijklmnopqrstuvwxyz"),
		'has encrypt function': function (topic) {
			assert.isFunction(topic.encrypt);
		}
	},	
	'encrypt with zero position': {
		topic: function () { 
					var wheel = wheelFactory.create("abcdefghijklmnopqrstuvwxyz");
					wheel.position = 0;
					return wheel;
				},
		'is identity' : function(topic) {
			assert.equal(topic.encrypt('b'),'b');
			assert.equal(topic.encrypt('c'),'c');
		}
	},	
	'encrypt with position should offset': {
		topic: function () { 
					var wheel = wheelFactory.create("abcdefghijklmnopqrstuvwxyz");
					wheel.position = 5;
					return wheel;
				},
		'should right shift' : function(topic) {
			assert.equal(topic.encrypt('b'),'g');
			assert.equal(topic.encrypt('c'),'h');
		},
		'should wrap' : function(topic) {
			assert.equal(topic.encrypt('y'),'d');
		}
	}	
}).export(module);