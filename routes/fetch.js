var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var dl = require('../lib/dl-apk');
var async = require('async');


/* GET users listing. */
router.get('/:query', function(req, res, next) {
	var query = req.params.query;
	var myRes = res;
	var basePath = "https://play.google.com/store/search?&c=apps&q="+query+"&hl=pt-br&price=1";

	request(basePath, function (error, res, chunk) {
		if (!error && res.statusCode == 200) {
			
			$ = cheerio.load(chunk);
			var card_list = $('.card-list');
			var items = [];
			var _lock = card_list.find('.card').length;


			var fillRes = function() {
			    myRes.json({
			    	items: items
			    });
			};
			
			if (_lock === 0) {
			   fillRes();
			} else {
				[].forEach.call(card_list.find('.card'), function(val, i){

					var item = card_list.find('.card')[i];
					var card = {};
					var card_data = $(item);
					var itemUri = 'https://play.google.com' + card_data.find('.details .title').attr('href');				
	
					var rating_style = card_data.find('.tiny-star .current-rating').attr('style');

					card  = {
						url: itemUri,
						cover_image: card_data.find('img.cover-image').attr('src'),
						click_target:card_data.find('.card-click-target').attr('src'),
						name: card_data.find('.details .title').attr('title'),
						company: card_data.find('.details .subtitle').attr('title'),
						html_description: card_data.find('.details .description').text(),
						rating_description:card_data.find('.tiny-star').attr('aria-label'),
						price: 'Gratuito',

					};

					if( rating_style != undefined )
						card['rating'] = parseFloat(rating_style.match(/\d+/g)[0]*5 / 100.0);

	

					dl.download(itemUri, function(dlink){

						card['downloadlink'] = 'http://downloader-apk.com/' + dlink;
						
						items.push(card);	

						if (--_lock === 0)
							fillRes();
					});
				});
			}
		}
	});

});

module.exports = router;
