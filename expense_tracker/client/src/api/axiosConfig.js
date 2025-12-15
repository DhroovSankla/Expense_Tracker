import axios from 'axios';

// This is our direct line to the Backend
export default axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        "Content-type": "application/json"
    }
});