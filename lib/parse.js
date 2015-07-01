var cheerio = require('cheerio')
	, request = require('request')
	, util = require('util');


module.exports = function(markup){

	$                 = cheerio.load(markup);

	if( $('[title="Google Play"]').length > 0 ){
		var cardsCotainer = $('.card-list');
		var cards         = cardsCotainer.find('.card');
		var items         = [];
		var cardsLen      = cards.length;
		var card          = {};

		for( var i = 0; i < cardsLen; i++ ){
			card = $(cards[i]);
			items[i] = {
				name		: card.find('.details .title').attr('title'),
				company		: card.find('.details .subtitle').attr('title'),
				url			: util.format(
					'https://play.google.com%s',
					card.find('.details .title').attr('href')
				),
				coverImage	: card.find('img.cover-image').attr('src')
			}
		}
	}else{
		items = {};
	}

	return {
		getItems: function(){
			return items;
		}
	}	
};