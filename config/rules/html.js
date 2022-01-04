module.exports = {
	test: /\.html$/i,
	enforce: 'post',
	loader: 'html-loader',
	options: {
		sources: {
			list: [
				{
					attribute: 'src',
					type: 'src',
				},
				{
					attribute: 'srcset',
					type: 'srcset',
				},
				{
					attribute: 'data-src',
					type: 'src',
				},
			],
		},
		preprocessor: (content) => content.replace(/\url\('~@\/[^)]+'\)/g, (match) => {
			let url = '';
			match.replace(/'~@\/[^)]+'/, (path) => { url = path.replace(/'/g, ''); });
			return `${match.replace(/~@/, '')}" data-src="${url}`;
		}),
	},
};
