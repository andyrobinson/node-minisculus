http = require('http');

var minisculusServer = {host: 'minisculus.edendevelopment.co.uk', port: 80 };

var result = {};

exports.getQuestion = function (questionPath, callback) {

	minisculusServer.path = questionPath;

	http.get(minisculusServer, function(jsonResponse) {

		console.log("Got HTTP response code: " + jsonResponse.statusCode + "\n");
		
		jsonResponse.on('data', function(buffer) {
			result = JSON.parse(buffer.toString('utf-8'));
		});
	
		jsonResponse.on('end',function() {
			callback(result);
		});

	}).on('error', function(e) {
	console.log("Got error: " + e.message + "\n");
	});
}
		

