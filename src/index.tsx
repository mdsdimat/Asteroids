import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import ErrorBoundary from '@components/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import { configureStore } from './store/store';

import theme from './theme';

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

const Main: React.FC = () => {
  React.useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

ReactDOM.hydrate(
  <Main />,
  document.getElementById('root'),
);
