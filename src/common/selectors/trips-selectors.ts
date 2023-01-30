import {RootState} from "../store/store";

export const selectorGetTrips = (state:RootState)=>{
    return state.trips.trips
}
export const selectorGetTripById = (state:RootState)=>{
    return state.trips.tripById
}