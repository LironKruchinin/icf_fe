import axios from 'axios';

export const apiRequest = async (
    method: 'DELETE' | 'GET' | 'POST' | 'PATCH',
    endpoint: string,
    data: object = {},
    headerProperties: object = {}
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

        switch (method) {
            case 'POST':
                response = await axios.post(endpoint, data, config)
                break;
            case 'GET':
                response = await axios.get(endpoint, config)
                break;
            case 'DELETE':
                response = await axios.delete(endpoint, config)
                break;
            case 'PATCH':
                response = await axios.patch(endpoint, data, config)
                break;

            default:
                response = await axios.get(endpoint, data)
                break;
        }

        return response.data;
    }


    catch (error) {
        throw error;
    }
}

