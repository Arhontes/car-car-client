import {LoginDtoType, LoginResponseType, RefreshResponseType, RegisterDtoType} from "../../common/types/auth-types";
import {axiosInstance} from "../../common/api/axios-instance";


export const authAPI = {

    async register(registerDto: RegisterDtoType) {
        return await axiosInstance.post(`auth/reg`, registerDto)
    },
    async login(loginDTO: LoginDtoType):Promise<LoginResponseType> {
        const result = await axiosInstance.post<LoginResponseType>(`auth/login`, loginDTO)
        return result.data
    },
    refresh: async function (refresh_token: string) {

        return await axiosInstance.post<RefreshResponseType>(`auth/refresh`, {refresh_token})
    },
    async logout() {
        return await axiosInstance.post(`auth/logout`)
    },
}

