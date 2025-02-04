// base API
export const baseAPI = `https://backend.scholarnet.in/api`;

// token from localstorage
export const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;

}

// set Authorization
// export const getAuthHeader = () => {
//     const token = getToken()
//     return token ? { Authorization: `Bearer ${token}` } : {}
// }

// default Headers
export const defaultHeaders = {
    'Content-Type': 'application/json',
}

export const getHeaders = () => {
    const token = getToken();
    return {
        ...defaultHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
}