const cron = require("node-cron");
const axios = require("axios");

const {
	GET_BIRTHDAYS_PROCESS_API,
	GET_BIRTHDAYS_PROCESS_SECRET
} = require("../config/index");
const { sendWishMail } = require("./emailService");
const { generateImage } = require("../utility/generateWishImage");
const { toTitleCase, logger } = require("../utility/helpers");

const time = "0 0 * * *"; // everyday 0:0:0
const scheduled = true,
	timezone = "Asia/Kolkata";

const tickFunction = async () => {
	console.log(`Running cron task for ${new Date().toDateString()}`);
	try {
		const res = await axios.get(GET_BIRTHDAYS_PROCESS_API, {
			headers: {
				"x-access-token": GET_BIRTHDAYS_PROCESS_SECRET
			}
		});
		const wishes = res.data.data;
		wishes.map(async wish => {
			let buffer = await generateImage(
				toTitleCase(String(wish.name).trim().split(" ")[0]),
				wish.image,
				wish._id
			);
			wish.content = buffer;
			await sendWishMail(wish);
			console.log(
				`Sent wishes to ${wish.name} <${wish.email}> with uid ${wish._id}`
			);
			logger("info", "wishes", {
				id: wish._id,
				name: wish.name,
				email: wish.email
			});
		});
	} catch (err) {
		console.log(err);
		logger(
			"error",
			"error",
			{
				message: err.message,
				status: err.status || 500,
				stack: err.stack
			},
			err
		);
	}
};

cron.schedule(time, tickFunction, { scheduled, timezone });
