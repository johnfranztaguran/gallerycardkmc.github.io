const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    // publicPath: process.env.NODE_ENV === 'production' ? '/kmcgallerycard.github.io/' : '/',
    clean: true, // Cleans the 'dist' folder before each build
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'), // Allows importing like '@/components/MyComponent'
  //     'images': path.resolve(__dirname, 'src/images'), // Example for an images folder
  //   },
  //   extensions: ['.js', '.jsx', '.json', '.html'], // Add other extensions as needed
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
        test: /\.html$/i,
        use: ['html-loader'], // Or 'raw-loader' if you want the HTML as a string
        exclude: /index\.html$/, // Exclude your main index.html if you're using HtmlWebpackPlugin for it
      },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      //   options: {
      //     sources: {
      //       list: [
      //         {
      //           tag: 'img',
      //           attribute: 'src',
      //           type: 'src',
      //         },
      //       ],
      //     },
      //   },
      //   exclude: /index\.html$/,
      // },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regex to match common image extensions
      //   use: [
      //     {
      //       loader: 'url-loader', // Use url-loader
      //       options: {
      //         limit: 8192, // Images smaller than 8KB will be inlined as data URIs
      //         name: 'images/[name].[hash:8].[ext]', // Output path and naming convention
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // or 'asset/inline', 'asset/dataurl' based on your needs
        generator: {
          filename: 'images/[name].[hash][ext]', // Output images to an 'images' folder
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        include: '/src',
        use: {
          loader: 'file-loader',
          options: {
            name: 'images[name].[ext]',
            outputPath: '/dist'
          }
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html', // Your main HTML template
      filename: 'index.html',
    }),
    // new CopyWebpackPlugin({'patterns': [
    //   { from: './src/images', to: 'images' }
    // ]}),
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images' }, // Copies all files from 'src/images' to 'dist/images'
        // You can add more patterns for other static assets
      ],
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
