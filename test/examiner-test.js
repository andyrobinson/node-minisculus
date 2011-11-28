var vows = require("vows");
var assert = require("assert");
var examiner = require("../examiner.js");

vows.describe('Examiner').addBatch({       
	'getQuestion' : {
		topic: function () {
			examiner.getQuestion('/14f7ca5f6ff1a5afb9032aa5e533ad95',this.callback);
		},
		'returns the url and question': function (result, err) {
			assert.equal(result["result"],"ok");
			assert.equal(result["reference-url"], "/questions/14f7ca5f6ff1a5afb9032aa5e533ad95.html");
			assert.equal(result["question"],"Strong NE Winds!");
		}			
	},
	'putAnswer' : {
		'Incorrect answer' : {
			topic: function() {
				examiner.putAnswer('/14f7ca5f6ff1a5afb9032aa5e533ad95','{"answer":"bad answer"}',this.callback);
			},
			'returns result with answer wrong' : function(response, err) {
				assert.equal(response["result"],"error!");
			}			
		},	
		'Correct answer' : {
			topic: function() {
				examiner.putAnswer('/14f7ca5f6ff1a5afb9032aa5e533ad95','{"answer":"Yzxutm5TK5cotjy2"}',this.callback);
			},
			'returns result with answer' : function(result, err) {
				assert.equal(result["result"],"ok");
				assert.equal(result["reference-url"], "/questions/2077f244def8a70e5ea758bd8352fcd8.html");
				assert.equal(result["question"],"The Desert Fox will move 30 tanks to Calais at dawn");
			}
		}
		
	}
}).export(module);

