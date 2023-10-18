import jwtDecode from 'jwt-decode';

export const jwtDecodeProfile = (accessToken) => {
    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken;
    } catch (error) {
        console.error('Error decoding token: ', error);
    }
}
