import { AxiosError } from 'axios';
import {
  GOT_LEADERBOARD,
  REQUESTED_LEADERBOARD,
  REQUESTED_LEADERBOARD_FAILED,
  REQUESTED_LEADERBOARD_SUCCEEDED,
} from '../actions/leaderboard';
import { ColumnType, IRequestData } from '../../pages/LeaderboardPage/Table/LeaderboardTable';
import { ILeadBoardRequestData } from '../../pages/LeaderboardPage/LeaderboardPage';

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

export const requestLeaderboard = (): { type: string } => ({ type: REQUESTED_LEADERBOARD });

export const requestLeaderboardSuccess = (data: ColumnType): ISuccessType => ({
  type: REQUESTED_LEADERBOARD_SUCCEEDED,
  data,
});

export const requestLeaderboardError = (error: AxiosError): IErrorType => ({ type: REQUESTED_LEADERBOARD_FAILED, error });

export const gotLeaderboard = (leaderboardRequestData: IRequestData): IGotLeaderboard => ({
  type: GOT_LEADERBOARD,
  leaderboardRequestData,
});
