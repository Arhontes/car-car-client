import {UserType} from "./profile-types";

export type PassengerType = UserType & {
    tripId: string | null
    passengerId: string | null
    from: string | null
    to: string | null
    approved: boolean | null
    reservedTime: string | null
    date: number| null
}

export type CreatePassengerDto = UserType & {
    from: string
    to: string
    tripId: string
    date:number
}
export type UpdatePassengerDto = {
    phone?: string;
    email?: string;
    from?: string;
    to?: string;
    tripId?: string;
    approved?: boolean;
    reservedTime?: string;
    date?:number
}