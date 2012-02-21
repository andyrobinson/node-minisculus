var vows = require('vows');
var assert = require('assert');
var enigmaFactory = require('../enigma.js');

vows.describe('Enigma').addBatch({       
	'encrypt with one wheel': { 
		topic: function () {
			var enigma1 = enigmaFactory.createEnigma(4);
			enigma1.encrypt('ab ', this.callback);
		},
		'shifts right by 4 characters': function (result,err) {
			assert.equal(result,'ef3');
		}
	},
	'correctly escapes double quotes': {
		topic: function() {
			var enigma1 = enigmaFactory.createEnigma(7);
			enigma1.encrypt('xyz', this.callback);			
		},
		'escapes double quotes': function (result,err) {
			assert.equal(result,"'\\\" ");
		}
	},
	'encrypt with two wheels': { 
		topic: function () {
			var enigma2 = enigmaFactory.createEnigma(2,5);
			enigma2.encrypt('abc1', this.callback);
		},
		'shifts right by 2 characters, then left by 10 chars': function (result,err) {
			assert.equal(result,'STU.');
			
		}
	},
	'encrypt with three wheels using previous character': {
			topic: function () {
				var enigma3 = enigmaFactory.createEnigma(4,7,0);
				enigma3.encrypt("AAAAA", this.callback);
			},
			'shifts right by 4 characters, then left by 14 chars, then adds twice the position of the previous character': function (result,err) {
				assert.equal(result,"0KKKK");
			}		
	},
	'factory creates independent enigmas': {
		topic: function () {
			var enigma1 = enigmaFactory.createEnigma(4);
			var enigma2 = enigmaFactory.createEnigma(10,7);
			enigma1.encrypt('ab ', this.callback);			
		},
		'second enigma does not affect encryption of first' : function (result,err) {
			assert.equal(result, 'ef3');
		}
	}
	
}).export(module);
