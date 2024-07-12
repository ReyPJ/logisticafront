import axios from 'axios';

const api = axios.create({
    baseURL: 'https://logistic-api-07a766e9f876.herokuapp.com/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
});

export default api;