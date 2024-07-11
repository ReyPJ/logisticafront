import axios from 'axios';

const api = axios.create({
    baseURL: 'http://209.38.172.75/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
});

export default api;