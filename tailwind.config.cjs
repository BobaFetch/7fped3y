module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brandBlue: '#1b1c5a',
				brandWhite: '#f9f9f9',
				brandTeal: '#52c0cc'
			},
			fontFamily: {
				header: ['Poppins', 'ui-sans-serif'],
				body: ['Open Sans', 'ui-sans-serif']
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite'
			}
		}
	},
	plugins: []
};
