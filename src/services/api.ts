import axios from 'axios';

export const apiPostRequest = async (endpoint: string, data: object = {}, headerProperties: object = {}) => {
    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
                ...headerProperties
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
