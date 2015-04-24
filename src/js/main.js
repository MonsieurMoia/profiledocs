// Require External Library Handlebars
var Handlebars = require('handlebars');


//Require the posts data in Json
var postsdata = require('./docs.json');


// This Controller comes expects the next things.
// function init (template,data,containerId){...}
// Tell which template you're going to use, which data will be inserted
// and the ID of the container where the template will be added in the DOM
// Example: insertData(poststemplate, postsdata, postscontainer)
// **reusable controller
var insertData = require('./controllers/insert-data-controller.js');


// Templates
// .hbs Template files
var poststemplate = require('../views/post-template.hbs');
var sidemenutemplate = require('../views/sidemenu-template.hbs')

//Containers
// Id of Container where a Template will be inserted
var postscontainer = document.getElementById("postsContainer");
var sidemenucontainer = document.getElementById("sidebarMenu");


function init(){
	//Get Posts Controller, use posts template file & Insert Data into it
  	insertData(poststemplate,postsdata,postscontainer);
  	insertData(sidemenutemplate,postsdata,sidemenucontainer);

  	var posts = document.querySelectorAll(".post");
  	for (var i = posts.length - 1; i >= 0; i--) {
  		console.log(posts[i]);
  		posts[i].onclick = function(e){
  			console.dir(this);

  			var img = this.querySelector('.post-cover img').src

  			console.dir(img);
  			
  			console.dir(e.target)
  			if (this.classList.contains('active')) {
  				this.classList.remove('active')
  			}else {
  				this.classList.add('active');
  			};
  		}
  	};

  	
}

function showArticle (){

}

init();
