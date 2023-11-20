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

export const createVideo = (data) => {
    return requestToken.post(`/video/addVideo`, data)
}

export const deleteVideo = (id, data) => {
    requestToken.interceptors.request.use((config) => {
        const token = JSON.parse(localStorage.getItem("token")).token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    })
    return requestToken.delete(`/video/delete-video/${id}`, { data })
}