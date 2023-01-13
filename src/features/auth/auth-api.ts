import axios from 'axios'
import {LoginDtoType, LoginResponseType, RefreshResponseType, RegisterDtoType} from "../../common/types/auth-types";

export const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
    withCredentials: true
})
instance.interceptors.request.use((config) => {
        // @ts-ignore
        config.headers.set() ['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        console.log("in request")
        return Promise.reject(error);
    })
instance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    try {
        if (error.response.status === 401 && error.config.url !== "refresh") {
            const response = await authAPI.refresh()
            localStorage.setItem('token', response.data.access_token)
            return instance.request(error.congig)
        }
    } catch (error) {
        console.log(error)
    }
    throw error
})

export const authAPI = {

    async register(registerDto: RegisterDtoType) {
        return await instance.post(`reg`, registerDto)
    },
    async login(loginDTO: LoginDtoType) {
        return await instance.post<LoginResponseType>(`login`, loginDTO)
    },
    async refresh() {
        return await instance.post<RefreshResponseType>(`refresh`, {})
    },
    async logout() {
        return await instance.post(`logout`)
    },
}
