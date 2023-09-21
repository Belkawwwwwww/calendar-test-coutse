export interface IAuth {
    username: string;
    password: string;
}
export interface IUser {
    id: number;
    username: string;
    email: string;
}
export interface IAuthResponse {
    access: string
    refresh: string
}