import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
})

export const authAPI = {

    async register(registerDto:RegisterDtoType){
        const result = await instance.post(`reg`,registerDto)
    },
    async login(){

    },
    async refresh(){

    },
    async logout(){

    },
}

export type RegisterDtoType = {
    username:string,
    password:string,
    phone:string,
    email:string
}

