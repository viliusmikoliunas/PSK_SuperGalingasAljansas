export default (reqMethod,bodyVal) => {
    return({
        method: reqMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyVal)
    })
}
