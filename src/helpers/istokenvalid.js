function isTokenValid(token){
    if (!token) return false;
    return token.iat < token.exp;
}

export default isTokenValid;