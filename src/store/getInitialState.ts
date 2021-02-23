import { RouterState } from 'connected-react-router';
import { State } from '../types';
import { initialState as auth } from './reducers/auth';
import { initialState as leaderboard } from './reducers/leaderboard';

const getInitialState = (pathname = '/'): State => ({
  auth,
  leaderboard,
  router: {
    location: {
      pathname, search: '', hash: '', key: '',
    },
    action: 'POP',
  } as RouterState,
});

export default getInitialState;
