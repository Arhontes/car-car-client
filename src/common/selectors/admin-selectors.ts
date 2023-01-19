import {RootState} from "../../features/app/store";

export const getTrips = (state:RootState)=>{
    return state.admin.trips
}