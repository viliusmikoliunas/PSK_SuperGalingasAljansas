const generateHttpRequestAuth = (reqMethod,bodyVal) => {
    const jwtToken = localStorage.getItem('jwtToken')
    return({
        method: reqMethod,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: bodyVal ? JSON.stringify(bodyVal) : undefined
    })
}

export default generateHttpRequestAuth

export const generatePOSTRequestAuth = (bodyVal) => generateHttpRequestAuth('POST',bodyVal)
