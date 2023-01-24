import {UserType} from "./common-types";

export type PassengerType = UserType & {
    tripId: string | null
    passengerId: string | null
    from: string | null
    to: string | null
    approved: boolean | null
    reservedTime: string | null
}

export type CreatePassengerDto = UserType & {
    from: string
    to: string
    tripId: string
}
export type UpdatePassengerDto = {
    phone: string;
    email: string;
    from: string;
    to: string;
    firstName: string;
    lastName: string;
    tripId: string;
    userId: string;
    approved: boolean;
    reservedTime: string;
}