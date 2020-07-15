const cron = require("node-cron");
const axios = require("axios");

const {
	GET_BIRTHDAYS_PROCESS_API,
	GET_BIRTHDAYS_PROCESS_SECRET
} = require("./index");
const { sendWishMail } = require("../services/emailService");

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
	wishes.map(wish => {
		promises.push(sendWishMail(wish.email, wish));
		console.log(`Sending wishes to ${wish.name} (${wish.email})`);
	});
	await Promise.all(promises);
};

cron.schedule(time, tickFunction, { scheduled, timezone });
