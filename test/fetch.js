var assert = require('assert')
	, should = require('should')
	, fetch = require('../lib/fetch');

describe('Fetch lib', function(){
	it('shouldn\'t fetch if no param suplied', function(done){
		this.timeout(15000);
		fetch('').items(function(items){
			items.should.be.an.Object;
			Object.keys( items ).length.should.be.equal(0);
			done();
		});
	});

	it('should return items set if param is suplied', function(done){
		this.timeout(15000);
		fetch('facebook').items(function(items){
			items.should.be.an.Object;
			Object.keys( items ).length.should.not.equal(0);
			done();
		});
	});
});