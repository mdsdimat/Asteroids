import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import ErrorBoundary from '@components/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { sagaMiddleware } from './store/store';
import watchGotLeaderboard from './store/sagas/leaderboard';
import watchLogin from './store/sagas/auth';

sagaMiddleware.run(watchGotLeaderboard);
sagaMiddleware.run(watchLogin);

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
