import {RootState} from "../../features/app/store";

export const getProfileData = (state:RootState)=>{
    return state.profile
}