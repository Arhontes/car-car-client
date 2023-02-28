import {LoginDtoType, AuthGeneratedType, RegisterDtoType} from "../../common/types/auth-types";
import {axiosInstance} from "../../common/api/axios-instance";


export const authAPI = {

    async register(registerDto: RegisterDtoType) {
        const result =  await axiosInstance.post<AuthGeneratedType>(`auth/reg`, registerDto)
        return result.data
    },
    async login(loginDTO: LoginDtoType){
        const result = await axiosInstance.post<AuthGeneratedType>(`auth/login`, loginDTO)
        return result.data
    },
    refresh: async function (refresh_token: string) {
        return await axiosInstance.post<AuthGeneratedType>(`auth/refresh`, {refresh_token})
    },
    async logout() {
        return await axiosInstance.post(`auth/logout`)
    },
}

