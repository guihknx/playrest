var assert = require('assert')
	, should = require('should')
	, parse = require('../lib/parse')
	, http= require('http');

describe('Parse lib', function(){
	it('shouldn\'t parse strange html', function(done){
		this.timeout(15000);
	
		http.get('http://gogle.com/', function (res) {
			var data = '';

			res.on('data', function (chunk) {
				data += chunk;
			});

			res.on('end', function () {
				var items = parse(data);
				( items.getItems() ).should.be.an.Object;
				done();
			});
		});
	});
});