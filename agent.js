examiner = require('./examiner.js');
enigmaFactory = require('./enigma.js');
enigma = enigmaFactory.createEnigma(6);

var self = exports;

exports.putUrl = function(url) {
	return url.substring(url.lastIndexOf("/"), url.indexOf("."));
}

exports.getAnswer = function(question, url) {
	var enigmas = [enigma];
	self.getAnswers(question, url, examiner, enigmas);
}

exports.getAnswers = function(question, url, examiner, enigmas) {

    enigma = enigmas[0];
	enigma.encrypt(question, function(cipher) {

		console.log("question: "+ question);	
		console.log("url: "+ url);
		console.log("cipher: "+ cipher + "\n");

		examiner.putAnswer(url,'{"answer":"'+ cipher +'"}', function(result) {
			console.log("question: "+ result["question"]);
			console.log("url: "+ result["reference-url"]);			
			console.log('\n---------------------\nEnd of test run\n');
		});
	});	
}


