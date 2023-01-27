import {RootState} from "../store/store";

export const selectorGetAddedPassenger = (state:RootState)=>{
    return state.passengers.addedPassenger
}

export const selectorCheckIsPassengerAdded = (state:RootState)=>{
    return state.passengers.isAdded
}

export const selectorGetPassengersList = (state:RootState)=>{
    return state.passengers.passengersList
}
export type PassengersSearchEntities = {
    tripId?: string;
    userId?: string;
    approved?: boolean;
}