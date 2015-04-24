function init (template,data,container){
	// Add Template with data into the Container
  	container.innerHTML = template(data);
}

module.exports = init;