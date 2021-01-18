import { AxiosError } from 'axios';
import { ColumnType } from '../pages/LeaderboardPage/Table/LeaderboardTable';
import { ILeadBoardRequestData } from '../pages/LeaderboardPage/LeaderboardPage';

export interface SignUpRequest {
    first_name: string;
    second_name: string;
    login: string;
    password: string;
    phone: string;
}

export interface SignUser {
    login: string;
    password: string;
}

export interface UserResponse {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface LeaderboardNewLeaderRequest {
    data: unknown;
    ratingFieldName: string;
}

export type UserRequest = Partial<SignUpRequest>;

export interface PasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface ILoginSuccessType {
  type: string,
  isAuth: boolean
}

export interface ILoginResult {
  type: string,
  values: SignUser
}

export interface IAuthSuccess {
  type: string,
  isAuth: boolean,
  userData: Record<string, unknown>
}

export interface ISuccessLeaderboardType {
  type: string,
  data: ColumnType
}

export interface IErrorType {
  type: string,
  error: AxiosError
}

export interface IGotLeaderboard {
  type: string,
  leaderboardRequestData: ILeadBoardRequestData
}
