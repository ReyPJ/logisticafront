import axios from 'axios';

const api = axios.create({
    baseURL: 'https://d28f-179-50-186-244.ngrok-free.app/api/orders/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
});

export default api;