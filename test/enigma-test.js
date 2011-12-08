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
	'encrypt with two wheels': { 
		topic: function () {
			var enigma2 = enigmaFactory.createEnigma(2,5);
			enigma2.encrypt('abc1', this.callback);
		},
		'shifts right by 2 characters, then left by 10 chars': function (result,err) {
			assert.equal(result,'STU.');
			
		}
	}	
	
}).export(module);
