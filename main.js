agent = require('./agent.js');

console.log('\n\nBeginning MINISCULUS test run\n--------------------------------------------\n');

examiner.getQuestion('/start',function(result) {
	agent.getAnswers(result, function() {console.log('\n\nEnd MINISCULUS test run\n--------------------------------------------\n');});
});
		

