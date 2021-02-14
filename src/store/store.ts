import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import reducers from './reducers';
import { isServer } from '../helpers/isServer';

import watchGotLeaderboard from './sagas/leaderboard';
import watchLogin from './sagas/auth';

export function configureStore(initialState: any, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    combineReducers({
      ...reducers,
      router: connectRouter(history),
    }),
    initialState,
    applyMiddleware(...middlewares),
  );

  if (!isServer) {
    sagaMiddleware.run(watchGotLeaderboard);
    sagaMiddleware.run(watchLogin);
  }

  return { store, history };
}
