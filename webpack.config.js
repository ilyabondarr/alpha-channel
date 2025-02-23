const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

// Упростите имя файла
const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`; // Убираем './'

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: path.resolve(__dirname, "src", "js", "main.js"),
  output: {
    filename: `js/${filename("js")}`, // Убедитесь, что здесь нет './'
    path: path.resolve(__dirname, "app"),
    publicPath: "/", // Установите это значение
    assetModuleFilename: path.join("assets", "[hash][ext][query]"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "app"),
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: false,
    port: 3003,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "manager.html"),
        filename: "manager.html",
        minify: {
          collapseWhitespace: isProd,
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "work-panel.html"),
        filename: "work-panel.html",
        minify: {
          collapseWhitespace: isProd,
        },
      }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/${filename("css")}`, // Тоже убираем './'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("assets", "[hash][ext][query]"),
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Добавляем правило для шрифтов
        type: "asset/resource",
        generator: {
          filename: path.join("fonts", "[hash][ext][query]"), // Папка для шрифтов
        },
      },
    ],
  },
};
