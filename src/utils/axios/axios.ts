import axios from "axios";

const ax = axios.create({
    baseURL: 'https://api.safechron.online',
    withCredentials: true
})

export default ax;