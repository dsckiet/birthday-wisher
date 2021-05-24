const log4js = require("log4js");

log4js.configure({
	appenders: {
		server: { type: "file", filename: "logs/server.log" },
		wishes: { type: "file", filename: "logs/wishes.log" },
		error: { type: "file", filename: "logs/error.log" }
	},
	categories: {
		server: { appenders: ["server"], level: "DEBUG" },
		wishes: { appenders: ["wishes"], level: "DEBUG" },
		error: { appenders: ["error"], level: "DEBUG" },
		default: { appenders: ["server"], level: "DEBUG" }
	}
});
let logger = log4js.getLogger();
logger.level = "debug";

module.exports.logger = (type, category, logObject, err) => {
	logger = log4js.getLogger(category);
	if (type === "error") logger.error(logObject);
	else if (type === "fatal") logger.fatal(logObject);
	else if (type === "info") logger.info(logObject);
	else if (type === "warn") logger.warn(logObject);
	else if (type === "debug") logger.debug(logObject);
	else if (type === "trace") logger.trace(logObject);
};

module.exports.toTitleCase = str => {
	return str
		.toLowerCase()
		.split(" ")
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};
