import React, {PureComponent} from 'react';
import ErrorBoundary from "./components/ErrorBoundary";


export default class App extends PureComponent {
    public render() {
        return (
            <ErrorBoundary>
                <div/>
            </ErrorBoundary>
        );
    }
  
}


