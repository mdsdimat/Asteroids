import { IS_DEV } from '../env';

export default {
  client: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
      IS_DEV && {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel'],
        },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  server: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader' },
  },
};
