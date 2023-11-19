import axios from 'axios';

const requestToken = axios.create ({
    baseURL: "https://be-project-web72.onrender.com/",
    timeout: 1000
})

export const logIn = async (username, password) => {
    const response = await requestToken.post('/login', {
        username,
        password
    });
    return response.data;
}

export const getVideos = async (token) => {
    const response = await requestToken.get('video',{token});
    return response.data;
}