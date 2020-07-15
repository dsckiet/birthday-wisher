const nodemailer = require("nodemailer");
const htmlToText = require("nodemailer-html-to-text").htmlToText;
const path = require("path");

let {
	EMAIL_USER,
	EMAIL_PASS,
	EMAIL_HOST,
	EMAIL_SENDER,
	WISH_MAIL_SUBJECT
} = require("../config/index");
const { logger, toTitleCase } = require("../utility/helpers");
const { generateMailHtml } = require("../utility/emailTemplate");

const transporter = nodemailer.createTransport({
	type: "SMTP",
	host: EMAIL_HOST,
	secure: true,
	debug: true,
	port: 465,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
});

module.exports.sendWishMail = async (email, data) => {
	let imagePath = path.join(
		__dirname,
		`../assets/images/wish_${data._id}.png`
	);
	let { name } = data;
	let mailOptions = {
		from: `DSCKIET <${EMAIL_SENDER}`,
		to: `${data.name} <${data.email}>`,
		cc: "dsckiet@gmail.com",
		subject: WISH_MAIL_SUBJECT,
		html: generateMailHtml(toTitleCase(String(name).trim().split(" ")[0])),
		attachments: [
			{
				filename: `wish_${data._id}.png`,
				path: imagePath,
				cid: "wish_banner"
			}
		],
		headers: {
			"x-priority": "1",
			importance: "high"
		}
	};
	transporter.use("compile", htmlToText());
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		logger("error", "emailService", err);
		throw err;
	}
};
