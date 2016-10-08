var log4js = require("log4js");
var config = require("../config").LOG4JS_CONFIG;

log4js.configure(config);

var logAll = log4js.getLogger('logAll');
var logDebug = log4js.getLogger('logDebug');
var logInfo = log4js.getLogger('logInfo');
var logWarn = log4js.getLogger('logWarn');
var logErr = log4js.getLogger('logErr');

module.exports = {
	use(app) {
		app.use(log4js.connectLogger(logAll, {
			level: "info"
		}));
	},
	debug(msg) {
		if (msg) logDebug.debug(msg)
	},
	info(msg) {
		if (msg) logInfo.info(msg)
	},
	warn(msg) {
		if (msg) logWarn.warn(msg)
	},
	error(msg) {
		if (msg) logErr.error(msg)
	},
}