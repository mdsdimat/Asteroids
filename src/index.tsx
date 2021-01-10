import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from "@components/ErrorBoundary";
import {BrowserRouter as Router} from "react-router-dom";

import './index.less';
const worker = require('serviceworker-webpack-plugin/lib/runtime')

if ('serviceWorker' in navigator) {
  worker.register();
}

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <App />
    </Router>
  </ErrorBoundary>,
  document.getElementById('root'),
);
