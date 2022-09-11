import axios from 'axios';

const instance = axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('Authorization');

    if(!token) {
        config.headers.common['Authorization'] = null;
        return config;
    }
    else {
        config.headers.common['Authorization'] = token;
        return config;
    }
})

instance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if(err.response && err.response.status === 401) {
        console.log("access_token 갱신!");
        const refreshToken = sessionStorage.getItem("refresh__token");
        const originRequest = err.config; // 원래의 요청

        return axios.get(`${process.env.REACT_APP_API_URL}/api/${refreshToken}`).then((res) => {
            const newAccessToken = res.headers.authorization;
            sessionStorage.setItem("Authorization", newAccessToken);
            originRequest.headers.Authorization= newAccessToken;

            return instance.request(originRequest); // 원래의 요청으로 다시 요청
        }).catch((err) => {
            sessionStorage.removeItem("Authorization");
            window.location.href="/login";
        })
    }
    return Promise.reject(err);
})

export default instance;