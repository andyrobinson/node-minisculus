var vows = require('vows');
var assert = require('assert');
var enigma = require('../enigma.js');

vows.describe('Enigma').addBatch({       
	'encrypt': { 
		topic: function () {
			enigma.encrypt('ab', this.callback);
		},
		'shifts right by 6 characters': function (result,err) {
			assert.equal(result,'fg');
		}
	}	
}).export(module);