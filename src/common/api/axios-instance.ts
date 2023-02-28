import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_SERVER_URL || 'https://car-car.vercel.app/',
    withCredentials: true
})
axiosInstance.interceptors.request.use((config) => {
        // @ts-ignore
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        if (config.url==="auth/refresh"){
            console.log(config.url)
            const refresh = localStorage.getItem('refresh_token')
            if (refresh){
                // @ts-ignore
                config.headers['Refresh'] = refresh;
            }
            else{
                throw new Error("Авторизируйтесь")
            }
        }
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