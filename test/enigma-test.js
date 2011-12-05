var vows = require('vows');
var assert = require('assert');
var enigmaFactory = require('../enigma.js');
var enigma = enigmaFactory.createEnigma(1);

vows.describe('Enigma').addBatch({       
	'encrypt': { 
		topic: function () {
			enigma.encrypt('ab ', this.callback);
		},
		'shifts right by 6 characters': function (result,err) {
			assert.equal(result,'gh5');
		}
	}	
}).export(module);
