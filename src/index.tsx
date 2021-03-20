import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import ErrorBoundary from '@components/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import CustomThemeProvider from './CustomThemeProvider';

import App from './App';
import { configureStore } from './store/store';

import theme from './theme';

const { store, history } = configureStore(window.__INITIAL_STATE__);

declare global {
    interface Window {
        __INITIAL_STATE__: any;
    }
}

const worker = require('serviceworker-webpack-plugin/lib/runtime');

if ('serviceWorker' in navigator) {
  worker.register();
}

const Main: React.FC = () => {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <CustomThemeProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </CustomThemeProvider>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

ReactDOM.hydrate(
  <Main />,
  document.getElementById('root'),
);
