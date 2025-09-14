import axios from 'axios';

const API_URL = 'http://localhost:5001/api/company/';

/**
 * Sends a POST request to the company registration endpoint
 * @param {object} companyData - The company's profile data
 * @param {string} token - The user's JWT for authentication
 * @returns {Promise} The response from the server
 */
const registerCompany = async (companyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + 'register', companyData, config);
    return response.data;
};

const getCompanyProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + 'profile', config);
    return response.data;
};

const companyService = {
    registerCompany,
    getCompanyProfile,
};

export default companyService;