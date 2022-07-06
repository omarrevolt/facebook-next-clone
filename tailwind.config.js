/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				openSans: ['Open Sans', 'sans-serif'],
			},
			colors: {
				mainColor: '#246FE5',
				secondary: '#F0F2F5',
				secondaryIcon: '#65676B',
			},
		},
	},
	plugins: [],
}
