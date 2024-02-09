/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#2A3D45",
				secondary: "#C17C74",
				tertiary: "#7A6C5D",
				background: "#DDC9B4",
				backgroundLight: "#efe6dc",
				black: "#1b1b1b",
				gray: "#e4e3e3",
				white: "#ffffff",
			},
		},
	},
	plugins: [],
};
