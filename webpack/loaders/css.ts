const path = require('path');
const postcssNested = require('postcss-nested');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');
const postcssImportAliasResolver = require('postcss-import-alias-resolver');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');

const { IS_DEV } = require('../env');

export default {
  client: {
    test: /\.less$/,
    use: [
      IS_DEV && 'css-hot-loader',
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader', options: { modules: 'global' } },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  server: {
    test: /\.(less|css)$/,
    loader: 'null-loader',
  },
};
