import axios from 'axios';
import { buildUrl } from '@helpers/ApiHelpers';
import { ColumnType, IRequestData } from '../pages/LeaderboardPage/Table/LeaderboardTable';
import {IAddUserLeaderboard} from "../types/types";

class LeaderboardApi {
    static getAllLeaderboard = async (data: IRequestData): Promise<{ data: ColumnType }[]> => {
      const url = buildUrl('leaderboard/all');
      const response = await axios.post(url, data, { withCredentials: true });

      return response.data;
    }

  static addLeaderboard = async (data: IAddUserLeaderboard): Promise<void> => {
    const url = buildUrl('leaderboard');
    const sendData = {
      data: data,
      ratingFieldName: 'points'
    }
    const response = await axios.post(url, sendData, { withCredentials: true });

    return response.data;
  }
}

export default LeaderboardApi;
