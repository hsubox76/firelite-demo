var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getConfig(appName) {
  const config = {
    name: appName,
    mode: "production",
    entry: {
      [appName]: `./src/${appName}.js`,
    },
    output: {
      path: path.resolve(__dirname, `build/${appName}`),
      filename: "[name].js",
      chunkFilename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: "10",
                  },
                },
              ],
            ],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        },
      ],
    },
    resolve: {
      mainFields: ["browser", "main"],
    },
    stats: {
      colors: true,
    },
    devtool: "source-map",
    devServer: {
      static: "./build",
      compress: true,
      client: {
        overlay: {
          warnings: false,
        },
      },
    },
    plugins: [new HtmlWebpackPlugin()],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
      splitChunks: {
        name: (module, chunks) => {
          return chunks[0].name;
        },
      },
    },
  };
  return config;
}

module.exports = [
  getConfig("dynamic"),
  getConfig("dynamic-preshake"),
  getConfig("full-get"),
  getConfig("full-snapshot"),
  getConfig("lite-get"),
  {
    ...getConfig("split"),
    entry: {
      split1: `./src/split-1.js`,
      split2: `./src/split-2.js`,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        chunks: ["split1"],
      }),
      new HtmlWebpackPlugin({
        filename: "split-2.html",
        chunks: ["split2"],
      }),]
  },
];
