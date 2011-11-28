http = require('http');

var minisculusServer = {
		host: 'minisculus.edendevelopment.co.uk', 
		port: 80, 

		getHeader: function(path,bodyLength) {
			return {
				host: this.host,
				port: this.port,
				path: path,
				'content-length': bodyLength,
				accept: 'application/json',
				'content-Type': 'application/json',
			}
		}
};

function doRequest(httpVerb,path,body,callback) {

	var result = {};
	var header = minisculusServer.getHeader(path,body.length);
    var httpClient = http.createClient(minisculusServer.port, minisculusServer.host);

	var request = httpClient.request(httpVerb, path, header);
	request.end(body);
	
	request.on('response', function (jsonResponse) {

		if (jsonResponse.statusCode < 400) {
			jsonResponse.on('data', function(buffer) {
				result = JSON.parse(buffer.toString('utf-8'));
			});

			jsonResponse.on('end',function() {
				result.result = "ok";
				callback(result);
			});			
		}
		else {
			console.log("Got HTTP error response code: " + jsonResponse.statusCode + "\n");
			callback({
				httpStatus: jsonResponse.statusCode,
				result: "error!"
			});
		}
	});
		
}

exports.getQuestion = function (questionPath, callback) {

	doRequest('GET',questionPath,'',callback);
}

exports.putAnswer = function (answerPath, answer, callback) {
	doRequest('PUT',answerPath,answer,callback);
}

