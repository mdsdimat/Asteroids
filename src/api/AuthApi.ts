import axios from 'axios';
import {
  IServiceId, SignUpRequest, SignUser, UserResponse,
} from '../types/types';
import { buildUrl } from '../helpers/ApiHelpers';

class AuthApi {
    static signUp = async (data: SignUpRequest): Promise<void> => {
      const url = buildUrl('auth/signup');
      const response = await axios.post(url, data);

      return response.data;
    }

    static signIn = async (data: SignUser): Promise<void> => {
      const url = buildUrl('auth/signin');
      const response = await axios.post(url, data, { withCredentials: true });

      return response.data;
    }

    static getUser = async (): Promise<UserResponse> => {
      const url = buildUrl('auth/user');
      const response = await axios.get(url, { withCredentials: true });

      return response.data;
    }

    static logout = async (): Promise<void> => {
      const url = buildUrl('auth/loguot');

      return await axios.post(url);
    }

    static getServiceId = async (): Promise<IServiceId> => {
      const url = buildUrl('oauth/yandex/service-id');
      const response = await axios.get(url);

      return response.data;
    }

    static oAuth = async (code: string): Promise<void> => {
      const url = buildUrl('oauth/yandex');
      const response = await axios.post(url, {
        code,
      }, { withCredentials: true });

      return response.data;
    }
}

export default AuthApi;
