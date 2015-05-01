var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var utils     = require('util');

module.exports = {
	download: function(link, fn) {
		var _that = this;

		this.packageNameFormLink(link, function(packageName){
			_that.dl(packageName, function(link){
				if( typeof fn === "function" && link != null )
					fn(link);
			});			
		})
	},
	packageNameFormLink: function(link, fn){
		if( typeof fn === "function" )
			fn(link.replace(/((http|https):\/\/)?play.google.com\/store\/apps\/details\?id=/i, ''));
	},
	dl: function(packageName, fn){

		console.log('requesteing dl link')

		var options = {
		    url: 'http://downloader-apk.com/download/dl.php?dl='+packageName,
		};

		function callback(error, response, body) {
		    if (!error && response.statusCode == 200) {
		        fn(body.split('.href="../')[1].split('"\',25000')[0]);
		    }
		}

		request(options, callback);		
	},
};
