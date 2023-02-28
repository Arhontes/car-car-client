import {UserType} from "./profile-types";


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
export type AuthGeneratedType = {
    access_token:string
    refresh_token:string
    user:UserType
}
