import {RootState} from "../../features/app/store";

export const selectorTrips = (state:RootState)=>{
    return state.admin.trips
}
export const selectorTripById = (state:RootState)=>{
    return state.admin.tripById
}