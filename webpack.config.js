const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const path = require('path');
const postcssCombineMediaQuery = require('postcss-combine-media-query');
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes');
require('babel-polyfill');

const paths = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
	intern: path.join(__dirname, './node_modules/intern/browser/intern.js'),
	inputmaskdependencyLib: path.join(
		__dirname,
		'./node_modules/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib.js'
	),
	inputmask: path.join(
		__dirname,
		'./node_modules/jquery.inputmask/dist/inputmask/inputmask.js'
	)
};

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

module.exports = {
	mode,

	resolve: {

		alias: {

			intern: paths.intern,

			'inputmask.dependencyLib': paths.inputmaskdependencyLib,

			inputmask: paths.inputmask

		},
	},

	devtool: mode === 'production' ? false : 'source-map', // 'eval-cheap-module-source-map',

	entry: {

		index: ['babel-polyfill', 'intern', './src/index.js']

	},

	output: {
		path: paths.dist,
		publicPath: '/',
		asyncChunks: true,
		filename: 'js/[name]/[contenthash:8].bundle.js',
		sourceMapFilename: 'js/[name]/[contenthash:8].js.map',
		chunkFilename: 'js/[name]/[contenthash:8].js',
		clean: true
	},

	module: {

		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
			},

			{
				test: /\.html$/,
				loader: 'html-loader'
			},

			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-syntax-top-level-await', '@babel/plugin-proposal-class-properties'],
						sourceMap: true
					}
				},
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif|bmp)$/i,
				type: 'asset/resource',
				exclude: '/assets/fonts',
				generator: {
					filename: 'assets/img/[name].[contenthash].[ext]'
				}
			},

			{
				test: /\.(woff|svg|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				exclude: '/assets/img',
				generator: {
					filename: 'assets/fonts/[name][ext][query]'
				}
			},

			{
				test: /\.scss$/,
				use: [
					process.env.NODE_ENV === 'production'
						? MiniCssExtractPlugin.loader
						: 'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},

					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [
									autoprefixer,
									postcssFlexBugsFixes,
									postcssCombineMediaQuery,
									cssMqpacker,
									cssnano({
										preset: [
											'default',
											{
												discardComments: {
													removeAll: true
												}
											}
										]
									})
								]
							}
						}
					},

					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},

			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},

					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [
									autoprefixer,
									postcssFlexBugsFixes,
									postcssCombineMediaQuery,
									cssMqpacker,
									cssnano({
										preset: [
											'default',
											{
												discardComments: {
													removeAll: true
												}
											}
										]
									})
								]
							}
						}
					}
				]
			}
		]
	},

	plugins: [

		new CopyPlugin({
			patterns: [

				{
					from: path.resolve(__dirname, 'src/assets/favicons'),
					to: './assets/favicons'
				},

				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: './assets/img'
				},

				{
					from: path.resolve(__dirname, 'node_modules/intern/loaders'),
					to: './loaders'
				}
			]
		}),

		new HtmlWebpackPlugin(
			{
				template: '!!pug-loader!./src/index.pug'
			}
		),

		new MiniCssExtractPlugin(
			{
				filename: '[name].css'
			}
		)
	],

	optimization: {

		minimize: false,

		usedExports: 'global',
		mergeDuplicateChunks: true,
		flagIncludedChunks: true,
		concatenateModules: true,
		removeAvailableModules: true,
		splitChunks: {
			chunks: 'all',
			minSize: 1000,
			maxSize: 30000
		}
	},

	devServer: {
		static: {
			directory: path.join(__dirname, '')
		},
		https: false,
		port: 8080,
		liveReload: true,
		hot: true,
		client: {
			progress: false
		}
	},

	experiments: {
		topLevelAwait: true,
	}
};
