import { AxiosError } from 'axios';
import { ColumnType } from '../pages/LeaderboardPage/Table/LeaderboardTable';
import { ILeadBoardRequestData } from '../pages/LeaderboardPage/LeaderboardPage';

export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ProfileUser {
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login?: string,
  phone?: string,
  email?: string,
  oldPassword?: string,
  newPassword?: string
}

export interface SignUser {
  login: string;
  password: string;
}

export type SignInResponse = string | BadRequest;

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

type BadRequest = {
  message: string;
  body: Record<string, unknown>;
}

export type SignUpResponse = SignUpRequest | BadRequest;

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

export interface IAddUserLeaderboard {
  name: string,
  points: number,
  date: string
}

export interface IServiceId {
  service_id: string
}

export interface IYandexOAuth {
  type: string,
  code: string
}

export interface CookiesType {
    [property: string]: any
}

export interface UserAsync {
  cookies?: CookiesType,
  [property: string]: any
}

export interface ISetTheme {
  theme: string,
}

export interface IGetTheme {
  name: string,
}

export interface ThemeType {
  id: number,
  name: string,
  params?: string,
}

export interface ISuccessThemeType {
  type: string,
  name?: string,
}

export interface ThemeResponse {
  id: boolean,
  name: string,
  params?: string,
}

export interface DefaultApiResponse {
  ok: boolean,
  message: string,
}

export interface FeedbackFields {
  message: string,
}

export interface LoginFormFields {
  login: string,
  password: string,
}

type SimpleObject = {
  [key: string]: string;
};

export type RegisterFormFields = SignUpRequest;
