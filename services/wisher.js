const cron = require("node-cron");
const axios = require("axios");

const {
	GET_BIRTHDAYS_PROCESS_API,
	GET_BIRTHDAYS_PROCESS_SECRET
} = require("../config/index");
const { sendWishMail } = require("./emailService");
const { generateImage } = require("../utility/generateWishImage");
const { toTitleCase } = require("../utility/helpers");

let time = "0 0 * * *"; // everyday 0:0:0
let scheduled = true,
	timezone = "Asia/Kolkata";

let tickFunction = async () => {
	let res = await axios.get(GET_BIRTHDAYS_PROCESS_API, {
		headers: {
			"x-access-token": GET_BIRTHDAYS_PROCESS_SECRET
		}
	});

	console.log(res.data);

	if (!res || !res.data || res.data.message !== "success") {
		console.log("Something went wrong!!");
		return;
	}

	let wishes = res.data.data;
	console.log("Running cron task!!");
	let promises = [];

	wishes.map(async wish => {
		let buffer = await generateImage(
			toTitleCase(String(wish.name).trim().split(" ")[0]),
			wish.image,
			wish._id
		);
		wish.content = buffer;
		await sendWishMail(wish.email, wish);
		console.log(`Sent wishes to ${wish.name} (${wish.email})`);
	});
	await Promise.all(promises);
};

cron.schedule(time, tickFunction, { scheduled, timezone });
