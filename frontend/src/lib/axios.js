import axios from 'axios';

//use this instance in all files and components where you need to make api calls, so that the base url will be applied to all requests automatically
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //we would send request to this url
    withCredentials: true, //by adding this field , browser will send the cookies to the server automatically, on every single request so that clerk can check if the user is authenticated or not
})

export default axiosInstance;

