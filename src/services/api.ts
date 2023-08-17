import axios from 'axios';

export const apiRequest = async (
    method: 'GET' | 'POST' = 'GET',
    endpoint: string,
    data: object = {}, headerProperties: object = {}
) => {
    try {
        let response
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...headerProperties
            },
            withCredentials: true
        }

        if (method === 'POST') {
            response = await axios.post(endpoint, data, config)
        } else {
            response = await axios.get(endpoint, data)
        }
        return response.data;
    }


    catch (error) {
        throw error;
    }
}

