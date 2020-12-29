import React, { Component } from 'react';

interface state {
  error: object | null,
  errorInfo: React.ErrorInfo | null
}

export default class ErrorBoundary extends Component {
  state: state = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: object, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error } = this.state;

    const errorStr = error ? error.toString() : '';

    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Что-то пошло не так.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {errorStr}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
