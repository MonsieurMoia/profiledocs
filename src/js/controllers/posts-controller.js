// Get Posts Template
var template = require('../../views/post-template.hbs');


function init (data){
	// Id of Container where Template will be inserted
	var container = document.getElementById("postsContainer");
	// Add Template with data into the Container
  	container.innerHTML = template(data);
}

module.exports = init;