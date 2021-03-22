import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import Helmet, { HelmetData } from 'react-helmet';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets } from '@material-ui/core/styles';

import App from './App';
import { configureStore } from './store/store';
import watchLogin from './store/sagas/auth';
import getInitialState from './store/getInitialState';
import { getUserServer } from './store/actionCreators/auth';

import CustomThemeProvider from './CustomThemeProvider';

type dataForHtml = {
  helmet: helmetData,
  nonce: string,
}

export default (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};

  const { store } = configureStore(getInitialState(location), location);

  function renderApp() {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={location}>
          <CustomThemeProvider>
            <SnackbarProvider>
              <CssBaseline />
              <App />
            </SnackbarProvider>
          </CustomThemeProvider>
        </StaticRouter>
      </ReduxProvider>
    );

    const sheets = new ServerStyleSheets();

    const reactHtml = renderToString(sheets.collect(jsx));
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    const data: dataForHtml = {
      helmet: helmetData,
      nonce: req.nonce,
    };

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const css = sheets.toString();

    res
      .status(context.statusCode || 200)
      .send(getHtml(reactHtml, css, reduxState, data));
  }

  store
    .runSaga(watchLogin)
    .toPromise()
    .then(() => renderApp())
    .catch((err) => {
      throw err;
    });

  const dataRequirements: (Promise<void> | void)[] = [];

  return Promise.all(dataRequirements)
    .then(() => {
      console.log(req.cookies);
      store.dispatch(getUserServer(req.cookies));
    })
    .then(() => {
      store.close()
    })
    .catch(err => {
      throw err;
    });
};

function getHtml(reactHtml: string, css: string, reduxState = {}, data: dataForHtml) {
  const { nonce, helmet } = data;
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <meta property="csp-nonce" content=${nonce} />
        <style id="jss-server-side" nonce="${nonce}">${css}</style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link href="/main.css" nonce="${nonce}" rel="stylesheet">
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script nonce=${nonce}>
          window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script nonce=${nonce} src="/main.js"></script>
    </body>
    </html>
    `;
}
