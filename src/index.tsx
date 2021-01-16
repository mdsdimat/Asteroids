import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { sagaMiddleware } from './store/store';
import watchGotLeaderboard from './store/sagas/leaderboard';

sagaMiddleware.run(watchGotLeaderboard);

import './index.less';
const worker = require('serviceworker-webpack-plugin/lib/runtime')

if ('serviceWorker' in navigator) {
  worker.register();
}

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
