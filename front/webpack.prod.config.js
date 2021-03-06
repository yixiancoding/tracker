const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./src/index'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: path.join(__dirname, 'public'),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 15000,
              name: "[name].[ext]",
            },
          }
        ],
      },
    ]
  },
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'public'), 'node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.css'],
    alias: {
      img: path.resolve(__dirname, 'public/img/'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk-[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ]
};