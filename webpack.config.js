// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const configJs = {
  entry: [
      "./src/bootstrap-lightbox.ts"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bootstrap-lightbox.min.js',
    library: 'BootstrapLightboxModule',
    libraryTarget: 'global'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

const configCss = {
  entry: [
    "./src/bootstrap-lightbox.scss"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: 'bootstrap-lightbox.min.css',
    // library: 'BootstrapLightboxModule',
    // libraryTarget: 'global'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // exclude: /node_modules\/(?!(animate.css)\/).*/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: './', name: 'bootstrap-lightbox.min.css'}
          },
          'sass-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    configJs.mode = "production";
  } else {
    configJs.mode = "development";
  }
  return [configJs, configCss];
};
