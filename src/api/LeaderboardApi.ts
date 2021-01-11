import axios from 'axios';
import { buildUrl } from '@helpers/ApiHelpers';
import { ColumnType, IRequestData } from '../pages/LeaderboardPage/Table/LeaderboardTable';

class LeaderboardApi {
    static getAllLeaderboard = async (data: IRequestData): Promise<{ data: ColumnType }[]> => {
      const url = buildUrl('leaderboard/all');
      const response = await axios.post(url, data, { withCredentials: true });

      return response.data;
    }
}

export default LeaderboardApi;
