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

export const apiGetRequest = async (endpoint: string, headerProperties: object = {}) => {
    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...headerProperties
            },
            withCredentials: true
        });
        console.log(response);

        return response.data;
    } catch (error) {
        throw error;
    }
};

