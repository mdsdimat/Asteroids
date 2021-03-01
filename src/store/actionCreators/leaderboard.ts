import { AxiosError } from 'axios';
import { ColumnType, IRequestData } from '../../pages/LeaderboardPage/Table/LeaderboardTable';
import leaderboardActions from '../actions/leaderboard';
import { IErrorType, IGotLeaderboard, ISuccessLeaderboardType } from '@types/types';

export const requestLeaderboard = (): { type: string } => ({ type: leaderboardActions.requested });

export const requestLeaderboardSuccess = (data: ColumnType): ISuccessLeaderboardType => ({
  type: leaderboardActions.succeeded,
  data,
});

export const requestLeaderboardError = (error: AxiosError): IErrorType => (
  { type: leaderboardActions.failed, error }
);

export const gotLeaderboard = (leaderboardRequestData: IRequestData): IGotLeaderboard => ({
  type: leaderboardActions.gotLeaderboard,
  leaderboardRequestData,
});
