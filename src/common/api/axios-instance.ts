import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.BASE_SERVER_URL || 'https://car-car.vercel.app/',
    withCredentials: true
})
axiosInstance.interceptors.request.use((config) => {
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    })
axiosInstance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    try {
        /* if (error.response.status === 401 && error.config.url !== "refresh") {
             const response = await authAPI.refresh()
             localStorage.setItem('token', response.data.access_token)
             return axiosInstance.request(error.congig)
         }*/
    } catch (error) {

    }
    throw error
})