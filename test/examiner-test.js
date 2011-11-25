var vows = require("vows");
var assert = require("assert");
var examiner = require("../examiner.js");

vows.describe('Examiner').addBatch({       
	'getQuestion' : {
		topic: function () {
			examiner.getQuestion('/14f7ca5f6ff1a5afb9032aa5e533ad95',this.callback);
		},
		'returns the url and question': function (result, err) {
			assert.equal(result["reference-url"], "/questions/14f7ca5f6ff1a5afb9032aa5e533ad95.html");
			assert.equal(result["question"],"Strong NE Winds!");
		}			
	} 
}).export(module);

