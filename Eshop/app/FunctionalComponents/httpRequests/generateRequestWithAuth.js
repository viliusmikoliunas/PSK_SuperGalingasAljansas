const generateHttpRequestAuth = (reqMethod,bodyVal) => {
    return({
        method: reqMethod,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem['jwtToken']}`
        },
        body: body ? JSON.stringify(body) : undefined
    })
}

export default generateHttpRequestAuth

export const generatePOSTRequestAuth = (bodyVal) => generateHttpRequestAuth('POST',bodyVal)
