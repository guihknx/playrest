var parse = require('./parse')
	, cheerio = require('cheerio')
	, request = require('request');

module.exports = function(query){
	return {

		items: function(fn){
			if( query == "" || query == null ){
				fn({});
				return;
			}
			var apiUrl = "https://play.google.com/store/search?&c=apps&q="+query+"&hl=pt-br&price=1";
			request(apiUrl, function (error, res, body) {
				if (!error && res.statusCode == 200) {					
					var items = parse(body);
					fn(items.getItems());
				}
			});
		}
	}
}