// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router';

import auth from './middlewares/auth';
import catchError from './middlewares/catchError';

const app = express();

app
  .disable('x-powered-by')

  .use(cors({
    credentials: true,
    origin: 'https://local.ya-praktikum.tech:3000',
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(catchError)
  .use(cookieParser())
  .use(auth)
  .use(router);

export default app;
