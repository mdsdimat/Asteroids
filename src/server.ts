import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import compression from 'compression';
import {
  expressCspHeader, INLINE, SELF, NONCE, EVAL,
} from 'express-csp-header';

import routes from './routes';

import 'babel-polyfill';
import serverRenderMiddleware from './server-render-middleware';

import webpackConfig from '../webpack/client.config';

const app = express();

app.use(compression())
  .use(cookieParser());

const compiler = webpack({ ...webpackConfig, mode: 'development' });

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output!.publicPath!,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(expressCspHeader({
  directives: {
    'connect-src': [SELF, 'helsinki-asteroids-02.ya-praktikum.tech:9001', 'ya-praktikum.tech'],
    'font-src': ['fonts.googleapis.com', 'fonts.gstatic.com'],
    'script-src': [SELF, NONCE, INLINE, EVAL],
    'img-src': ['data:', SELF, 'ya-praktikum.tech'],
    'worker-src': [SELF],
  },
}));

const paths = routes.map((v) => v.path);

app.get(paths, serverRenderMiddleware);

app.use(express.static('src/audio'));
app.use(express.static('src/dist'));

app.use((_req: Request, res: Response, next) => {
  res.sendStatus(404);
});

export { app };
