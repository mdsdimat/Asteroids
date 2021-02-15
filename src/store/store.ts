import createSagaMiddleware, { END } from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { isServer } from '../helpers/isServer';

import watchGotLeaderboard from './sagas/leaderboard';
import watchLogin from './sagas/auth';

import createRootReducer from './reducers';

import { AppStore, State } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState: State, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(...middlewares),
  ) as AppStore;

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (!isServer) {
    sagaMiddleware.run(watchLogin);
    sagaMiddleware.run(watchGotLeaderboard);
  }

  return { store, history };
}
