import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error?: Error,
  errorInfo?: React.ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): React.ReactNode {
    const { error, errorInfo } = this.state;

    const errorStr = error ? error.toString() : '';

    if (errorInfo) {
      return (
        <div>
          <h2>Что-то пошло не так.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {errorStr}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
