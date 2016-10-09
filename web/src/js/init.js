var Page = View.extends({
	static: {
		ready(fn) {
			var page = new Page;
			var options = (Baic.isFunction(fn) ? fn.call(page, page, Baic.url.query()) : fn) || {};
		}
	}
});