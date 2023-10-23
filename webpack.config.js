const config = {
	mode: 'production',
	entry: {
		index: './src/scripts/entry-scripts/main-index.js',
		office: './src/scripts/entry-scripts/main-office.js',
		contacts: './src/scripts/entry-scripts/main-contacts.js',
		services: './src/scripts/entry-scripts/main-services.js',
		faq: './src/scripts/entry-scripts/main-faq.js',
		error: './src/scripts/entry-scripts/main-error.js',
		successOrder: './src/scripts/entry-scripts/main-success-order.js',
		calcOrder: './src/scripts/entry-scripts/main-calc-order.js',
		afterRepair: './src/scripts/entry-scripts/main-after-repair.js',
	
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
