import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import Helmet, { HelmetData } from 'react-helmet';
import { SnackbarProvider } from 'notistack';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import { configureStore } from './store/store';
import watchLogin from './store/sagas/auth';
import getInitialState from './store/getInitialState';
import { getUserServer } from './store/actionCreators/auth';

import theme from './theme';

export default (req: Request, res: Response) => {
  const location = req.url;
  const context: StaticRouterContext = {};

  const { store } = configureStore(getInitialState(location), location);

  function renderApp() {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={location}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <CssBaseline />
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </StaticRouter>
      </ReduxProvider>
    );

    const sheets = new ServerStyleSheets();

    const reactHtml = renderToString(sheets.collect(jsx));
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const css = sheets.toString();

    res
      .status(context.statusCode || 200)
      .send(getHtml(reactHtml, css, reduxState, helmetData));
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
      store.dispatch(getUserServer(req.cookies));
    })
    .then(() => {
      store.close()
    })
    .catch(err => {
      throw err;
    });
};

function getHtml(reactHtml: string, css: string, reduxState = {}, helmetData: HelmetData) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <style id="jss-server-side">${css}</style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        ${helmetData.title.toString()}
        ${helmetData.meta.toString()}
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
        </script>
        <script src="/main.js"></script>
    </body>
    </html>
    `;
}
