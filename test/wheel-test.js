var vows = require('vows');
var assert = require('assert');
var wheelFactory = require('../wheel.js');

vows.describe('Wheel').addBatch({       
	'create': {
		topic: wheelFactory.create(0, 1),
		'has encrypt function': function (topic) {
			assert.isFunction(topic.encrypt);
		}
	},	
	'encrypt with zero position': {
		topic: function () { 
					var wheel = wheelFactory.create(0,1);
					return wheel;
				},
		'is identity' : function(topic) {
			assert.equal(topic.encrypt('b'),'b');
			assert.equal(topic.encrypt('c'),'c');
		}
	},	
	'encrypt with position should offset 1': {
		topic: function () { 
					var wheel = wheelFactory.create(5,1);
					return wheel;
				},
		'should right shift' : function(topic) {
			assert.equal(topic.encrypt('b'),'g');
			assert.equal(topic.encrypt('c'),'h');
		},
		'should wrap' : function(topic) {
			assert.equal(topic.encrypt(' '),'4');
		}
	},
	'encrypt with position should use negative offset': {
		topic: function () {
					var wheel = wheelFactory.create(3,-2);
					return wheel;
				},
		'should left shift' : function(topic) {
			assert.equal(topic.encrypt('g'),'a');
			assert.equal(topic.encrypt('z'),'t');
		},
		'should wrap' : function(topic) {
			assert.equal(topic.encrypt('1'),'?');
		}
	}	
}).export(module);