var vows = require("vows");
var assert = require("assert");
var main = require("../main.js");
var engimaFactory = require("../enigma.js")

var MockExaminer = function()  {
	var self = this;
	this.putAnswerCalls = 0;
	this.putAnswer = function (answerPath, answer, callback) {
		self.putAnswerCalls++;
		self.lastAnswer = answer;
	};
	this.getQuestion = function() {
		
	};
}

//Tests we want to write
//stops when gets an error from server
//recursively carries on when correct

vows.describe('Main Test').addBatch({       
	'answerQuestions' : {
		'does not call examiner when no enigma Machines' : {
			topic: function() {
				var enigmaMachines = {};
				var mockExaminer = new MockExaminer();
				main.answerQuestions({}, mockExaminer, enigmaMachines);
				return mockExaminer;
			},
			'does not put another question' : function(mockExaminer) {
				assert.equal(mockExaminer.putAnswerCalls,0);
			}			
		},
		'does not call examiner when answer indicates we are done' : {
			topic: function() {
				var enigmaMachines = [enigmaFactory.createEnigma(1)];
				var missionComplete = {"code": "ABC123"};
				var mockExaminer = new MockExaminer();
				main.answerQuestions(missionComplete, mockExaminer, enigmaMachines);
				return mockExaminer;
			},
			'does not put another question' : function(mockExaminer) {
				assert.equal(mockExaminer.putAnswerCalls,0);
			}			
		},
		'calls examiner with encrypted answer' : {
			topic: function() {
				var enigmaMachines = [enigmaFactory.createEnigma(1)];
				var question = {"question": "abc","reference-url":"ref"};
				var mockExaminer = new MockExaminer();
				main.answerQuestions(question, mockExaminer, enigmaMachines);
				return mockExaminer;
			},
			'answer is encrypted using enigma machine' : function(mockExaminer) {
				assert.equal(mockExaminer.lastAnswer,{"answer:":"bcd"});
			}			
		}
		
		
	}
}).export(module);

