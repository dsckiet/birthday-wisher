const nodemailer = require("nodemailer");

let { EMAIL_USER, EMAIL_PASS } = require("./index");
const { logger } = require("../utility/helpers");

const transporter = nodemailer.createTransport({
	service: "gmail",
	type: "SMTP",
	host: "smtp.gmail.com",
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
});

const generateMailHtml = name => {
	return `<html><body>hey ${name}</body></html>`;
};

module.exports.sendWishMail = async (email, data) => {
	let { name } = data;
	let mailOptions = {
		from: `DSCKIET <${EMAIL_USER}`,
		to: email,
		subject: `Happy Birthday ${name}`,
		text: "",
		html: generateMailHtml(name),
		headers: {
			"x-priority": "1",
			"x-msmail-priority": "High",
			importance: "high"
		}
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		logger("error", "emailService", err);
		throw err;
	}
};
