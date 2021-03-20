import CookieToString from '@helpers/CookieToString';
import { praktikumAxios } from './axios';
import {
  IServiceId, SignUpRequest, SignUser, UserResponse, SignUpResponse, SignInResponse, CookiesType,
} from '@types/types';

class AuthApi {
    static signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
      const response = await praktikumAxios('auth/signup', {
        method: 'post',
        data,
      });

      return response.data;
    }

    static signIn = async (data: SignUser): Promise<SignInResponse> => {
      const response = await praktikumAxios('auth/signin', {
        method: 'post',
        data,
      });

      return response.data;
    }

    static getUser = async (cookies?: CookiesType): Promise<UserResponse> => {
      const params = cookies ? { headers: { Cookie: CookieToString(cookies) } } : {};
      const response = await praktikumAxios('auth/user', params);

      return response.data;
    }

    static logout = async (): Promise<string> => {
      const response = await praktikumAxios('auth/loguot');

      return response.data;
    }

    static getServiceId = async (): Promise<IServiceId> => {
      const response = await praktikumAxios('oauth/yandex/service-id');

      return response.data;
    }

    static oAuth = async (code: string): Promise<string> => {
      const response = await praktikumAxios('oauth/yandex', {
        method: 'post',
        data: { code },
      });

      return response.data;
    }
}

export default AuthApi;
