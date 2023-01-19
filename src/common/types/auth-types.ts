import {UserType} from "./common-types";


export type AuthStateType = {
    isAuth: boolean
    access_token: string | null
    refresh_token: string | null
}
export type RegisterDtoType = {
    firstName:string
    lastName:string
    password:string
    phone:string
    email:string
}

export type LoginDtoType = {
    email:string
    password:string
}
export type LoginResponseType = {
    access_token:string
    user:UserType
}
export type RefreshResponseType = {
    access_token:string
    user:UserType
}