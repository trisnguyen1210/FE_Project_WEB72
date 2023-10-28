import users from './mock-data/users.json'

export const login = (username, password) => {

    const matchedUser = users.find(user => user.username === username && user.password === password);

    if (matchedUser) {
        return {
            username: matchedUser.username,
            expire_at: new Date(new Date().getTime() + (60 * 60 * 1000)) // 30 minutes from now
        };
    }
    return null;
}

export const isLoggedIn = () => {

    const tokenString = localStorage.getItem('token');

    if (!tokenString) {
        return false;
    }

    let token = null;
    try {
        token = JSON.parse(tokenString);
    } catch (e) {
        console.error('Error parsing token to JSON', e.message);
        return false;
    }

    if (!token || !token.expire_at) {
        return false;
    }

    return new Date(token.expire_at) > new Date();

}

export const getCurrentUserName = () => {

    const tokenString = localStorage.getItem('token');

    if (!tokenString) {
        return null;
    }

    let token = null;
    try {
        token = JSON.parse(tokenString);
    } catch (e) {
        console.error('Error parsing token to JSON', e.message);
        return null;
    }

    if (!token || !token.username) {
        return null;
    }

    return token.username;

}

export const logOut = () => {
    localStorage.removeItem('token');
}