import {UserType} from "./common-types";

export type PassengerType = UserType & {
    from:string
    to:string,
    approved:boolean
    reservedTime:string
}