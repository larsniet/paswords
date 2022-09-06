const themes = require("./src/themes/index");
module.exports = {
	content: ["{pages,src}/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media",
	important: true, // important in prod is must be
	theme: ["dark"],
	plugins: [require("daisyui")],
	daisyui: {
		themes: [{ ...themes }],
	},
};
