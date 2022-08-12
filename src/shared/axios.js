import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.37.89.214',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('Authorization');

    if(!token) {
        console.log(token);
        config.headers.common['Authorization'] = null;
        return config;
    }
    else {
        console.log(token);
        config.headers.common['Authorization'] = `${token}`;
        return config;
    }
})

export default instance;