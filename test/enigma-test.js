var vows = require('vows');
var assert = require('assert');
var wheelFactory = require('../wheel.js');

vows.describe('Wheel').addBatch({       
	'create': {
		topic: wheelFactory.create("abcdefghijklmnopqrstuvwxyz"),
		'has position and encrypt functions': function (topic) {
			assert.isFunction(topic.setPosition);
			assert.isFunction(topic.encrypt);
		}
	},	
	'encrypt with zero position': {
		topic: function () { 
					var wheel = wheelFactory.create("abcdefghijklmnopqrstuvwxyz");
					wheel.setPosition(0);
					return wheel;
				},
		'is identity' : function(topic) {
			assert.equal(topic.encrypt('b'),'b');
			assert.equal(topic.encrypt('c'),'c');
		},
		'encrypt with position should offset': {
			topic: function () { 
						var wheel = wheelFactory.create("abcdefghijklmnopqrstuvwxyz");
						wheel.setPosition(5);
						return wheel;
					},
			'should right shift' : function(topic) {
				assert.equal(topic.encrypt('b'),'g');
				assert.equal(topic.encrypt('c'),'h');
			}
		}
	}	
}).export(module);