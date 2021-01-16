import { AxiosError } from 'axios';
import { ColumnType } from '../../pages/LeaderboardPage/Table/LeaderboardTable';

interface RootState {
  leaderboard: {
    data: ColumnType[],
    error: boolean,
    errorData: AxiosError
  }
}

const leaderboardSelector = (state: RootState) => state.leaderboard;
export default leaderboardSelector;
