import {RootState} from "../store/store";

export const selectorGetTrips = (state:RootState)=>{
    return state.trips.trips
}
export const selectorTripById = (state:RootState)=>{
    return state.trips.tripById
}