import axios from "axios";

const API_V3_KEY = '68fd99303e96482d9eaff74537d24001';
const API_V3_BASE_URL = 'https://api.themoviedb.org/3'


const requestToken = axios.create ({
    baseURL: API_V3_BASE_URL,
    timeout: 1000,
    params: {
        api_key: API_V3_KEY,
    }
})

const request = axios.create({
    baseURL: API_V3_BASE_URL,
    timeout: 10000,
    params: {
        api_key: API_V3_KEY,
        append_to_response:"videos,images,credits"
    }
});

// const requestAction = axios.create({
//     baseURL: API_V3_BASE_URL,
//     timeout: 2000,
//     params: {
//         api_key: API_V3_KEY,
//         page: 2,
//         with_genres: 28
//     }
// });

// const requestDramma = axios.create({
//     baseURL: API_V3_BASE_URL,
//     timeout: 2000,
//     params: {
//         api_key: API_V3_KEY,
//         page: 2,
//         with_genres: 18
//     }
// });

// const requestCommedy = axios.create({
//     baseURL: API_V3_BASE_URL,
//     timeout: 2000,
//     params: {
//         api_key: API_V3_KEY,
//         page: 2,
//         with_genres: 35
//     }
// });

export const apiV3TotalMovie = async () => {
    const response = await request.get(`discover/movie`);
    return response.data;
}


export const apiV3Discover = async (pageId=1) => {
    const response = await axios.get(`${API_V3_BASE_URL}/discover/movie?api_key=${API_V3_KEY}&page=${pageId}`);
    return response.data;
}

export const apiV3DiscoverAction = async (pageId=1) => {
    const response = await axios.get(`${API_V3_BASE_URL}/discover/movie?api_key=${API_V3_KEY}&page=${pageId}&with_genres=28`);
    return response.data;
}

export const apiV3DiscoverCommedy = async (pageId=1) => {
    const response = await axios.get(`${API_V3_BASE_URL}/discover/movie?api_key=${API_V3_KEY}&page=${pageId}&with_genres=35`);
    return response.data;
}

export const apiV3DiscoverDramma = async (pageId=1) => {
    const response = await axios.get(`${API_V3_BASE_URL}/discover/movie?api_key=${API_V3_KEY}&page=${pageId}&with_genres=18`);
    return response.data;
}

export const apiV3GetMovieDetails = async (movieId) => {
    const response = await request.get(`movie/${movieId}`);
    return response.data;
}

export const apiV3SearchMovie = async (searchQuery) => {
    const response = await axios.get(`${API_V3_BASE_URL}/search/movie?api_key=${API_V3_KEY}&query=${searchQuery}`);
    return response.data.results;
}

export const apiV3GetToken = async () => {
    const response = await requestToken.get('authentication/token/new');
    const data = await response.data;
    return data["request_token"];
}

export const apiV3CreateSession = async (tmdbToken) => {
    const response = await axios.post(`${API_V3_BASE_URL}/authentication/session/new?api_key=${API_V3_KEY}`,{
        "request_token":tmdbToken
    });
    console.log("response session",response.data);
    return response.data;
    
    }


//   async function getRequestToken() {
//     let tmdbSessionTokenString = localStorage.getItem('tmdbTokenLocalStorage');
//     const askUserPermission = async () => {
//         window.location = `https://www.themoviedb.org/authenticate/${tmdbSessionTokenString}?redirect_to=http://localhost:3000/home`;
//     } 

//     if (!tmdbSessionTokenString) {
//       tmdbSessionTokenString = await apiV3GetToken();
//         localStorage.setItem('tmdbTokenLocalStorage', tmdbSessionTokenString);
//       await askUserPermission();
//       apiV3CreateSession(tmdbSessionTokenString);
//     }
//     console.log("tmdbSessionTokenString",tmdbSessionTokenString)
//     return tmdbSessionTokenString;
//   }

//   export {getRequestToken};