import createSagaMiddleware, { END } from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createLogger } from 'redux-logger';
import { isServer } from '../helpers/isServer';

import watchGotLeaderboard from './sagas/leaderboard';
import watchLogin from './sagas/auth';
import watchTheme from './sagas/theme';

import createRootReducer from './reducers';

import { AppStore, State } from '@types';

import { IS_DEV } from '../../webpack/env';

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState: State, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  if (IS_DEV) {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(...middlewares),
  ) as AppStore;

  store.dispatch({ type: '@@redux/INIT' });

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  if (!isServer) {
    sagaMiddleware.run(watchLogin);
    sagaMiddleware.run(watchTheme);
    sagaMiddleware.run(watchGotLeaderboard);
  }

  return { store, history };
}
