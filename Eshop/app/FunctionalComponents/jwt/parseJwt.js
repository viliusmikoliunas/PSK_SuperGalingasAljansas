const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export default parseJwt

export const getUserRoleFromToken = () => {
    const token = localStorage.getItem('jwtToken')
    return token && parseJwt(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
}

export const getUsernameFromToken = () => {
    const token = localStorage.getItem('jwtToken')
    return token && parseJwt(token)['sub']
}
