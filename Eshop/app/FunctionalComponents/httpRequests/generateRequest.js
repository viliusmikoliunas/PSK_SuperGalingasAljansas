const generateHttpRequest = (reqMethod,bodyVal) => {
    return({
        method: reqMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    })
}

export default generateHttpRequest

export const generatePOSTrequest = (bodyVal) => generateHttpRequest('POST', bodyVal)
