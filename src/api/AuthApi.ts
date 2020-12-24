import {SignUpRequest, SignUser, UserResponse} from "../types/types";
import {buildUrl} from "../helpers/ApiHelpers";
import axios from "axios";

class AuthApi {
    static signUp = async (data: SignUpRequest) => {
        const url = buildUrl('auth/signup');
        const response = await axios.post(url, data);

        return response.data
    }

    static signIn = async (data: SignUser) => {
        const url = buildUrl('auth/signin');
        const response = await axios.post(url, data);

        return response.data
    }

    static getUser = async (): Promise<UserResponse> => {
        const url = buildUrl('auth/user');
        const response = await axios.get(url);

        return response.data
    }

    static logout = async () => {
        const url = buildUrl('auth/loguot');

        return await axios.post(url);
    }
}

export default AuthApi;