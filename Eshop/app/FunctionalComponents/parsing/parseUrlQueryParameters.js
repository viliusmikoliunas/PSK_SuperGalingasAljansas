const parseUrlQueryParameters = () => {
    const queryString = require('query-string')
    return queryString.parse(location.search)
}

export default parseUrlQueryParameters
