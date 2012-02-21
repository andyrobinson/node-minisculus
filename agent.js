examiner = require('./examiner.js');
enigmaFactory = require('./enigma.js');
enigmas = [enigmaFactory.createEnigma(6), enigmaFactory.createEnigma(9,3)];

var self = exports;

var extractName = function(url) {
	return url.substring(url.lastIndexOf("/"), url.indexOf("."));
}

var missionComplete = function(question) {
	return question.code !== undefined;
}

var noMoreEnigmas = function(enigmas) {
	return enigmas[0] === undefined;
}

exports.getAnswers = function(question, callback) {
	self.answerQuestions(question, examiner, enigmas, callback);
}

exports.answerQuestions = function(question, examiner, enigmas, callback) {

	console.log("question: "+ question["question"]);	
	console.log("url: "+ question["reference-url"]);

	if (noMoreEnigmas(enigmas) || missionComplete(question)) {
		callback(examiner);
		return;
	}

    enigma = enigmas.shift();

	enigma.encrypt(question["question"], function(cipher) {

		examiner.putAnswer(extractName(question["reference-url"]),'{"answer":"'+ cipher +'"}', function(result) {
            self.answerQuestions(result,examiner, enigmas, callback);

		});
	});	
	
}


