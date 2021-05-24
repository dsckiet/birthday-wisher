const { createCanvas, loadImage, registerFont } = require("canvas");

// registering font
registerFont("./assets/fonts/text_font.ttf", {
	weight: 600,
	style: "normal",
	family: "text_font"
});

const width = 1920;
const height = 960;

// handler function
module.exports.generateImage = async (name, image, id) => {
	const canvas = createCanvas(width, height);
	const context = canvas.getContext("2d");

	// background image settings
	const bg = await loadImage("./assets/images/template.png");
	context.drawImage(bg, 0, 0, width, height);

	// general text props for name
	context.fillStyle = "#F4B400";
	context.font = "46px 'text_font'";
	context.fillText(`${name} ${String.fromCodePoint(0x1f382)}`, 895, 315);

	// for image
	const photo = await loadImage(image);
	context.drawImage(photo, 198, 277, 425, 425);

	// generated buffer
	const buffer = canvas.toBuffer();
	return buffer;
};
