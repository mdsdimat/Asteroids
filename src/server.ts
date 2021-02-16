import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import compression from 'compression';

import routes from './routes';

import 'babel-polyfill';
import serverRenderMiddleware from './server-render-middleware';

import webpackConfig from '../webpack/client.config';

const app = express();

app.use(compression())
  .use(cookieParser());

const compiler = webpack({ ...webpackConfig, mode: 'development' });

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output!.publicPath!
}));

app.use(require('webpack-hot-middleware')(compiler));

const paths = routes.map(v => v.path);

app.get(paths, serverRenderMiddleware);

app.use((_req: Request, res: Response, next) => {
  res.sendStatus(404);
});

export { app };
