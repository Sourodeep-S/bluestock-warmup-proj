import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

/**
 * Sends a POST request to the login endpoint
 * @param {object} userData
 * @returns {Promise}
 */
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    return response.data;
};

const authService = {
    login,
};

export default authService;