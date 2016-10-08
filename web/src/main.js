document.body.appendChild((() => {
	var script = document.createElement('script');
	script.setAttribute('src', 'js/baic.min.js?r=' + Date.now().toString(36));
	script.onload = onload;
	return script
})());

function onload(){

	// require([]);

	Baic.ready(ready)
}