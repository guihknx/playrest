var http = require('http')
	, Router = require('router')
	, fetch = require('./lib/fetch');

var router = Router();

router.get('/fetch/:keyword', function(req, res){
	var keyword = req.params.keyword || "";
	res.writeHead(200, {'Content-Type': 'application/json'});
	fetch(keyword).items(function(items){
		res.end(JSON.stringify(items));	
	});
});
router.get('/fetch/', function(req, res){
	res.writeHead(502, {'Content-Type': 'application/json'});
	res.end("{}");			
});
router.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end("Hello, world!\n");
});


this.server = http.createServer(function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
	router(req, res, function(){});
});
var listen = function () {
	this.server.listen.apply(this.server, arguments);
};
exports.listen = listen;

exports.close = function (callback) {
	this.server.close(callback);
};
