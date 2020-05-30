require("dotenv").config();

module.exports = {
	ENV: process.env.ENV,
	PORT: process.env.PORT,
	MONGO_URI_DEV: process.env.MONGO_URI_DEV,
	MONGO_URI_PROD: process.env.MONGO_URI_PROD,
	JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
	EMAIL_USER: process.env.EMAIL_USER,
	EMAIL_PASS: process.env.EMAIL_PASS,
	GET_BIRTHDAYS_PROCESS_API: process.env.GET_BIRTHDAYS_PROCESS_API,
	GET_BIRTHDAYS_PROCESS_SECRET: process.env.GET_BIRTHDAYS_PROCESS_SECRET
};
