import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios'
import {LoginDtoType, LoginResponseType, RegisterDtoType} from "../../common/types/auth-types";
import {UserType} from "../../common/types/common-types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
    withCredentials:true
})
// instance.interceptors.request.use((config)=>{
//     config.headers = { ...config.headers } as AxiosHeaders;
//     config.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
//
//     return config
// })

// instance.interceptors.request.use((config)=>{
//     return config
// }, async (error)=>{
//     const originalRequest = error.config
//     try {
//         if (error.response.status === 401 && error.config && !error.config._isRetry){
//             originalRequest._isRetry = true
//             const response = await authAPI.refresh()
//             return instance.request(originalRequest)
//         }
//     }catch(error){
//         console.log(error)
//     }
//     throw error
// })

export const authAPI = {

    async register(registerDto:RegisterDtoType){
        return await instance.post(`reg`,registerDto)
    },
    async login(loginDTO:LoginDtoType){
        return await instance.post<LoginResponseType>(`login`,loginDTO)
    },async authMe(){
        return await instance.get<UserType>(`me`)
    },
    async refresh(){
        return await instance.post(`refresh`,{phone:"89206703775"})
    },
    async logout(){

    },
}



