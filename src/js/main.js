var Handlebars = require('handlebars');
var data = require('./docs.json');

var posttpl = require('../views/post-template.hbs');


function init(){
  // var template = document.getElementById("posttpl").innerHTML;
  // var render = Handlebars.compile(template);
  var container = document.getElementById("postsContainer");

  container.innerHTML = posttpl(data);

}

init();
