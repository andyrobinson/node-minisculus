examiner = require('./examiner.js');
agent = require('./agent.js');

console.log('\n\nBeginning MINISCULUS test run\n--------------------------------------------\n');

examiner.getQuestion('/start',function(result) {
	var firstQuestion = result["question"];
	var firstUrl = agent.putUrl(result["reference-url"]);
	agent.getAnswer(firstQuestion, firstUrl);
});
		

