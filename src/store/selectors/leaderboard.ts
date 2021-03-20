import { AxiosError } from 'axios';
import { ColumnType } from '../../pages/LeaderboardPage/Table/LeaderboardTable';

interface RootState {
  leaderboard: ILeaderboard
}

interface ILeaderboard {
  data: ColumnType[],
  error: boolean,
  errorData: AxiosError
}

const leaderboardSelector = (state: RootState): ILeaderboard => state.leaderboard;
export default leaderboardSelector;
