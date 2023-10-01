// export interface IAuth {
//     username: string;
//     password: string;
//     confirmPassword: string
// }

export interface IUser {
    id: number;
    username: string;
    password: string;
}

export interface IAuthResponse {
    access: string
    refresh: string
}
