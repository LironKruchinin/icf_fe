export const apiPostRequest = async (endpoint: string, data: object, headerProperties: object = {}) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headerProperties
            },
            body: JSON.stringify(data)
        })

        const json = await response.json()
        return json
    } catch (error) {
        throw (error)
    }
}