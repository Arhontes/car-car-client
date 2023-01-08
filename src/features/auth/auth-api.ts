import axios from 'axios'
import {LoginDtoType, RegisterDtoType} from "../../common/types/auth-types";

export const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
})

export const authAPI = {

    async register(registerDto:RegisterDtoType){
        return await instance.post(`reg`,registerDto)
    },
    async login(loginDTO:LoginDtoType){
        return await instance.post(`login`,loginDTO)
    },
    async refresh(){

    },
    async logout(){

    },
}



