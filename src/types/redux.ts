import { Action, Store } from 'redux';
import { SagaMiddleware } from '@redux-saga/core';
import { RouterState } from 'connected-react-router';

interface State {
  readonly router: RouterState;
}

type AppStore = Store & {
    runSaga: SagaMiddleware['run'];
    close: () => void;
};

export { State, AppStore };
