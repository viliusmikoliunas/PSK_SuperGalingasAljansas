const generateHttpRequest = (reqMethod,bodyVal) => {
    return({
        method: reqMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyVal ? JSON.stringify(bodyVal) : undefined
    })
}

export default generateHttpRequest

export const generatePOSTrequest = (bodyVal) => generateHttpRequest('POST', bodyVal)
