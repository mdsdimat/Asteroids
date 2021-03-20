import { praktikumAxios } from './axios';
import { PasswordRequest, UserRequest, UserResponse } from '@types/types';

class UserApi {
    static editProfile = async (data: UserRequest): Promise<UserRequest> => {
      const response = await praktikumAxios('user/profile', {
        method: 'put',
        data,
      });

      return response.data;
    }

    static uploadAvatar = async (avatar: File): Promise<UserResponse> => {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await praktikumAxios('user/profile/avatar', {
        method: 'put',
        headers: {
          'Content-Type': avatar.type,
        },
        data: formData,
      });

      return response.data;
    }

    static changePassword = async (data: PasswordRequest): Promise<string> => {
      const response = await praktikumAxios('user/password', {
        method: 'put',
        data,
      });

      return response.data;
    }

    static getUser = async (id: string): Promise<UserResponse> => {
      const response = await praktikumAxios(`user/${id}`);

      return response.data;
    }

    static findUsers = async (login: string): Promise<UserResponse[]> => {
      const response = await praktikumAxios('user/search', {
        method: 'post',
        data: { login },
      });

      return response.data;
    }
}

export default UserApi;
