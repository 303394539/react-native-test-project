var _RANDOM = Date.now().toString(36);

document.getElementsByTagName('head')[0].appendChild((() => {
	var script = document.createElement('script');
	script.setAttribute('src', `js/baic.min.js?r=${_RANDOM}`);
	script.onload = function() {
		require([
			'init.js'
		].map(name => {
			return `${name}?r=${_RANDOM}`;
		})).then(() => {
			Baic.ready(() => {
				require(`${location.href.replace(/\.html.*/i, '.js')}?r=${_RANDOM}`);
			});
		});
	};
	return script
})());