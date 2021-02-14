import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import Helmet, { HelmetData } from 'react-helmet';
import App from './App';
import { configureStore } from './store/store';
import watchLogin from './store/sagas/auth';
import { getUser } from './store/actionCreators/auth';

export default (req: Request, res: Response) => {

  const location = req.url;
  const context: StaticRouterContext = {};

  const { store } = configureStore({}, location);

  function renderApp() {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={location}>
          <App />
        </StaticRouter>
      </ReduxProvider>
    );

    const reactHtml = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    res
      .status(context.statusCode || 200)
      .send(getHtml(reactHtml, reduxState, helmetData));
  }

  store
    .runSaga(watchLogin)
    .toPromise()
    .then(() => {
      store.dispatch(getUser());
    })
    .then(() => renderApp())
    .catch((err) => {
      throw err;
    });

  store.close();
};

function getHtml(reactHtml: string, reduxState = {}, helmetData: HelmetData) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
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
