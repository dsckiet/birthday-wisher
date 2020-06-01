const express = require("express");
const { notFound, sendErrors } = require("./config/errorHandler");
const { sendSuccess } = require("./utility/helpers");
const app = express();

require("dotenv").config();
require("./config/cron-wisher");

//Routes
app.get("/", (req, res) => {
	return sendSuccess(
		res,
		"Welcome to DSC-KIET Birthday Wisher!! STATUS: 200 OK"
	);
});

app.use("*", notFound);

//Error Handlers
app.use(sendErrors);

const { NODE_ENV, PORT } = require("./config/index");

//Setting up server
(async () => {
	try {
		await app.listen(PORT);
		console.info(
			`NODE_ENV: ${NODE_ENV}\nServer is up and running on Port ${PORT}`
		);
	} catch (err) {
		console.info("Error in running server.", err);
	}
})();
