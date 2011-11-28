examiner = require('./examiner.js');
enigma = require('./enigma.js');

console.log('\n\nAttempting to connect to MINISCULUS server\n--------------------------------------------\n');

examiner.getQuestion('/14f7ca5f6ff1a5afb9032aa5e533ad95',function(result) {
	console.log("URL: "+ result["reference-url"]);
	console.log("question: "+ result["question"]);	

	enigma.encrypt(result["question"], function(cipher) {
		console.log("cipher: "+ cipher + "\n");
		
		examiner.putAnswer('/14f7ca5f6ff1a5afb9032aa5e533ad95','{"answer":"'+ cipher +'"}', function(result) {
			console.log("URL: "+ result["reference-url"]);
			console.log("question: "+ result["question"]);	
			console.log('\n---------------------\nEnd of response\n');
		});
	});
});
		

