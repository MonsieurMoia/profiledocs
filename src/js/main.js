// Libs
var Handlebars = require('handlebars');

// Controllers
var postsCtrl = require('./controllers/posts-controller.js');

//Data
var data = require('./docs.json');

function init(){
	//Get Posts Controller & Insert Data
  	postsCtrl(data);
}

init();
