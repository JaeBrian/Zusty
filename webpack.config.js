const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: { bundle: path.resolve(__dirname, 'src/client/index.js') },
  output: {
    path: path.join(__dirname, 'extension/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'], //sass-loader and postcss-loader may not get along
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      //filename: 'index.html',
      template: path.join(__dirname, './src/client/index.html'),
    }),
  ],
};

if ((process.env.NODE_ENV = 'development')) {
  console.log('config output:', config.output);
  console.log('config output path:', config.output.path);
  //
} else if ((process.env.NODE_ENV = 'production')) {
  //
}

module.exports = config;
