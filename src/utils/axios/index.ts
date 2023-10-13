import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.safechron.online',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});