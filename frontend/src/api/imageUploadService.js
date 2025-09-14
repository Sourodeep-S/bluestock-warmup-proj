import axios from 'axios';

const API_URL = 'http://localhost:5001/api/company/';

/**
 * Uploads a company logo
 * @param {File} file - The image file to upload
 * @param {string} token - The user's JWT
 * @returns {Promise} The response from the server
 */
const uploadLogo = async (file, token) => {
    const formData = new FormData();
    formData.append('logo', file);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + 'upload-logo', formData, config);
    return response.data;
};

const uploadBanner = async (file, token) => {
    const formData = new FormData();
    formData.append('banner', file);
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    
    const response = await axios.post(API_URL + 'upload-banner', formData, config);
    return response.data;
};

const imageUploadService = {
    uploadLogo,
    uploadBanner,
};

export default imageUploadService;