const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // publicPath: process.env.NODE_ENV === 'production' ? '/kmcgallerycard.github.io/' : '/',
    clean: true, // Cleans the 'dist' folder before each build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // use: [
        //   {
        //     // loader: MiniCssExtractPlugin.loader,
        //     loader: 'style-loader',
        //     options: {
        //       defaultExport: true,
        //     },
        //   },
        //   {
        //     loader: "css-loader",
        //     options: {
        //       esModule: true,
        //       modules: {
        //         namedExport: true,
        //       },
        //     },
        //   },
        // ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Use the preset-env
          },
        },
      },
      {
        test: /\.(png)$/,
        type: 'asset/resource' // Emits a separate file and exports the URL
      },
      {
        test: /\.html$/,
        use: ['html-loader'], // Or 'raw-loader' if you want the HTML as a string
        exclude: /index\.html$/, // Exclude your main index.html if you're using HtmlWebpackPlugin for it
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regex to match common image extensions
        use: [
          {
            loader: 'url-loader', // Use url-loader
            options: {
              limit: 8192, // Images smaller than 8KB will be inlined as data URIs
              name: 'images/[name].[hash:8].[ext]', // Output path and naming convention
            },
          },
        ],
      },
      // {
      //   test: /\.(svg|png|jpg|jpeg|gif)$/,
      //   include: '/src',
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: 'assets[name].[ext]',
      //       outputPath: '/dist'
      //     }
      //   }
      // }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html', // Your main HTML template
      filename: 'index.html',
    }),
  ],
  devServer: {
    // contentBase: './dist',
    static: {
      directory: path.join(__dirname, 'src'),
    },
  },
  // watch: true,
};
