var vows = require("vows");
var assert = require("assert");
var agent = require("../agent.js");
var engimaFactory = require("../enigma.js")

var MockExaminer = function()  {
	var self = this;

	this.putAnswerCalls = 0;
	
	this.putAnswer = function (answerPath, answer, callback) {
		self.putAnswerCalls++;
		self.lastAnswer = answer;
		callback(self.result);
	};

	this.getQuestion = function() {
	};
	
}

//Tests we want to write
//stops when gets an error from server
//recursively carries on when correct

vows.describe('Agent Test').addBatch({       
	'answerQuestions' : {
		'does not call examiner when no enigma Machines' : {
			topic: function() {
				var enigmaMachines = [];
				var mockExaminer = new MockExaminer();
				agent.answerQuestions({}, mockExaminer, enigmaMachines, this.callback);
			},
			'does not put another question' : function(mockExaminer, err) {
				assert.equal(mockExaminer.putAnswerCalls,0);
			}			
		},
		'does not call examiner when answer indicates we are done' : {
			topic: function() {
				var enigmaMachines = [enigmaFactory.createEnigma(1)];
				var missionComplete = {"code": "ABC123"};
				var mockExaminer = new MockExaminer();
				agent.answerQuestions(missionComplete, mockExaminer, enigmaMachines, this.callback);
			},
			'does not put another question' : function(mockExaminer,err) {
				assert.equal(mockExaminer.putAnswerCalls,0);
			}			
		},
		'calls examiner with encrypted answer' : {
			topic: function() {
				var enigmaMachines = [enigmaFactory.createEnigma(1)];
				var question = {"question": "abc","reference-url":"ref"};
				var mockExaminer = new MockExaminer();
				mockExaminer.result = {"question": "def","reference-url":"question/ref2.html"}
		
				agent.answerQuestions(question, mockExaminer, enigmaMachines, this.callback);
			},
			'answer is encrypted using enigma machine' : function(mockExaminer, err) {
				assert.equal(mockExaminer.lastAnswer, '{"answer":"bcd"}');
			}			
		},
		'repeatedly calls examiner when more questions and enigmas' : {
			topic: function() {
				var enigmaMachines = [enigmaFactory.createEnigma(1), enigmaFactory.createEnigma(2)];
				var question = {"question": "abc","reference-url":"ref"};
				var mockExaminer = new MockExaminer();
				mockExaminer.result = {"question": "def","reference-url":"question/ref2.html"}
				agent.answerQuestions(question, mockExaminer, enigmaMachines, this.callback);
			},
			'answer is encrypted using enigma machine' : function(mockExaminer, err) {
				assert.equal(mockExaminer.putAnswerCalls, 2);
				assert.equal(mockExaminer.lastAnswer, '{"answer":"fgh"}');
			}			
		}
		
		
	}
}).export(module);

