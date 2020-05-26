const cron = require("node-cron");

let time = "0 0 * * *"; // everyday 0:0:0
let scheduled = true,
	timezone = "Asia/Kolkata";

let tickFunction = async () => {
	let today = new Date();
	today = new Date(2020, today.getMonth(), today.getDate() + 1).toUTCString();
	let wishes = []; // array of objects: { name, email, dob } for birthdays today;
	console.log("Running cron task!!");
	let promises = [];
	wishes.map(wish => {
		// do stuffs, send mail function, push to promises
		console.log(`Sending wishes to ${wish.name} (${wish.email})`);
	});
	await Promise.all(promises);
};

cron.schedule(time, tickFunction, { scheduled, timezone });
