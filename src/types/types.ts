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