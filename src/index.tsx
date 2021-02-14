import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './store/store';

const { store, history } = configureStore(window.__INITIAL_STATE__);

// global redeclared types
declare global {
    interface Window {
        __INITIAL_STATE__: any;
    }
}

const worker = require('serviceworker-webpack-plugin/lib/runtime');

if ('serviceWorker' in navigator) {
  worker.register();
}

ReactDOM.hydrate(
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
