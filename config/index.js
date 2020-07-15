require("dotenv").config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	EMAIL_USER: process.env.EMAIL_USER,
	EMAIL_PASS: process.env.EMAIL_PASS,
	EMAIL_HOST: process.env.EMAIL_HOST,
	EMAIL_SENDER: process.env.EMAIL_SENDER,
	GET_BIRTHDAYS_PROCESS_API: process.env.GET_BIRTHDAYS_PROCESS_API,
	GET_BIRTHDAYS_PROCESS_SECRET: process.env.GET_BIRTHDAYS_PROCESS_SECRET,
	WISH_MESSAGE: "Happy Birthday!!",
	WISH_MAIL_SUBJECT: "Happy Birthday - DSC KIET"
};
