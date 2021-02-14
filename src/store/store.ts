import createSagaMiddleware, { END } from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import reducers from './reducers';
import { isServer } from '../helpers/isServer';

import watchGotLeaderboard from './sagas/leaderboard';
import watchLogin from './sagas/auth';

import { AppStore, State } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState: any, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    combineReducers<State>({
      ...reducers,
      router: connectRouter(history),
    }),
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
