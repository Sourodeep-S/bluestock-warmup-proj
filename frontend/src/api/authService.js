import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

/**
 * Sends a POST request to the login endpoint
 * @param {object} userData
 * @returns {Promise}
 */


const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    // If the response includes a token, save it to localStorage
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    return response.data;
};

// Sends a POST request to the register endpoint
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
};

const authService = {
    login,
    register
};

export default authService;