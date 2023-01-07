const { DefinePlugin, ProgressPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("node:path");

const mode = process.env.NODE_ENV || "production";

const dev = mode !== "production";
const filename = dev //
  ? "[name]-[contenthash:16]"
  : "[contenthash:16]";
const chunkFilename = dev //
  ? "[name]-[contenthash:16]"
  : "[contenthash:16]";
const assetModuleFilename = dev //
  ? "[name]-[contenthash:16]"
  : "[contenthash:16]";
const localIdentName = dev //
  ? "[name]__[local]__[hash:base64:10]"
  : "[hash:base64:10]";

module.exports = {
  mode,
  target: "web",
  context: __dirname,
  entry: "./src/index.tsx",
  output: {
    clean: true,
    path: path.resolve(__dirname, "build"),
    filename: `${filename}.js`,
    chunkFilename: `${chunkFilename}.js`,
    assetModuleFilename: `${assetModuleFilename}[ext]`,
    module: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "source-map-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "style-loader",
            options: {},
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              modules: {
                namedExport: true,
                localIdentName,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new DefinePlugin({
      "typeof window": JSON.stringify("object"),
    }),
    new CompressionPlugin({
      test: /\.(json|js|css|svg)$/,
      filename: "[file].gz",
      algorithm: "gzip",
    }),
    new CompressionPlugin({
      test: /\.(json|js|css|svg)$/,
      filename: "[file].br",
      algorithm: "brotliCompress",
    }),
    new HtmlWebpackPlugin({
      scriptLoading: "module",
      meta: { viewport: null },
    }),
  ],
  experiments: {
    outputModule: true,
  },
  devtool: "source-map",
  performance: {
    maxAssetSize: 1048576,
    maxEntrypointSize: 1048576,
  },
};
