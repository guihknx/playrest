var server = require('../');

var assert = require('assert'),
	should = require('should'),
    http = require('http');

describe('GET /', function () {
	before(function () {
		server.listen(1337);
	});

	it('should return 200 at homepage', function (done) {
		http.get('http://localhost:1337', function (res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});
	after(function () {
		server.close();
	});
});

describe('GET /fetch', function(){
	before(function () {
		server.listen(1337);
	});
	it('should return a set of items if no param suppiled', function(done){
		http.get('http://localhost:1337/fetch/', function (res) {
			var data = '';

			res.on('data', function (chunk) {
				data += chunk;
			});

			res.on('end', function () {
				var myData = JSON.parse( data );
				myData.should.be.an.Object;
				Object.keys( myData ).length.should.be.equal(0);
				assert.equal(502, res.statusCode);

				done();
			});
		});

	});
	it('should return items set if param is suppiled', function(done){
		this.timeout(15000);
		http.get('http://localhost:1337/fetch/facebook', function (res) {
			var data = '';

			res.on('data', function (chunk) {
				data += chunk;
			});

			res.on('end', function () {
				console.log('mylength',Object.keys( JSON.parse( data ) ).length);
				Object.keys( JSON.parse( data ) ).length.should.not.equal(0);
				done();
			});
		});

	});
	after(function () {
		server.close();
	});
});