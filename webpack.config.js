require('babel-polyfill');

module.exports = {
	entry: './index.js',
	output: {
		libraryTarget: 'var',
		library:'App',
		path: './dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
		]
	}
	
}