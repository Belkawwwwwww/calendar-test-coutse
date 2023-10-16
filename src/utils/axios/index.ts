import axios from "axios";

axios.defaults.withCredentials = true

const ax = axios.create({
    baseURL: 'https://api.safechron.online',
    timeout: 360 * 1000,
    withCredentials: true
})

export default ax;