import {UserType} from "./common-types";

export type AuthStateType = { isAuth: boolean } & UserType

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