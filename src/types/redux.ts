import { Store } from 'redux';
import { SagaMiddleware } from '@redux-saga/core';
import { RouterState } from 'connected-react-router';

import { AuthState } from '../store/reducers/auth';
import { LeaderboardState } from '../store/reducers/leaderboard';
import { ThemeState } from '../store/reducers/theme';

interface State {
  readonly auth: AuthState;
  readonly leaderboard: LeaderboardState;
  readonly router: RouterState;
  readonly theme: ThemeState;
}

type AppStore = Store & {
    runSaga: SagaMiddleware['run'];
    close: () => void;
};

export { State, AppStore };
