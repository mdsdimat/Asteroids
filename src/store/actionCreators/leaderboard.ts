import { AxiosError } from 'axios';
import { ColumnType, IRequestData } from '../../pages/LeaderboardPage/Table/LeaderboardTable';
import { ILeadBoardRequestData } from '../../pages/LeaderboardPage/LeaderboardPage';
import leaderboardActions from '../actions/leaderboard';

interface ISuccessType {
  type: string,
  data: ColumnType
}

interface IErrorType {
  type: string,
  error: AxiosError
}

interface IGotLeaderboard {
  type: string,
  leaderboardRequestData: ILeadBoardRequestData
}

export const requestLeaderboard = (): { type: string } => ({ type: leaderboardActions.requested });

export const requestLeaderboardSuccess = (data: ColumnType): ISuccessType => ({
  type: leaderboardActions.succeeded,
  data,
});

export const requestLeaderboardError = (error: AxiosError): IErrorType => ({ type: leaderboardActions.failed, error });

export const gotLeaderboard = (leaderboardRequestData: IRequestData): IGotLeaderboard => ({
  type: leaderboardActions.got_leaderboard,
  leaderboardRequestData,
});
