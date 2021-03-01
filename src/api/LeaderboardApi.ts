import { IAddUserLeaderboard } from '@types/types';
import { praktikumAxios } from './axios';

import { ColumnType, IRequestData } from '../pages/LeaderboardPage/Table/LeaderboardTable';

class LeaderboardApi {
    static getAllLeaderboard = async (data: IRequestData): Promise<{ data: ColumnType }[]> => {
      const response = await praktikumAxios('leaderboard/all', {
        method: 'post',
        data,
      });

      return response.data;
    }

  static addLeaderboard = async (data: IAddUserLeaderboard): Promise<void> => {
    const sendData = {
      data,
      ratingFieldName: 'points',
    };

    const response = await praktikumAxios('leaderboard', {
      method: 'post',
      data: sendData,
    });

    return response.data;
  }
}

export default LeaderboardApi;
