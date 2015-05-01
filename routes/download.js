var express = require('express');
var router = express.Router();
var dl = require('../lib/dl-apk');

/* GET home page. */
router.get('/:pack', function(req, res, next) {
  // res.render('index', { title: 'Express' });

	var packageName = req.params.pack;
	console.log(packageName)

	dl.download(packageName, function(e){
		// console.log(e);
			console.log('PACKAGE META =>', e)	

	});
});

module.exports = router;
