import {RootState} from "../../features/app/store";

export const selectorProfileData = (state:RootState)=>{
    return state.profile
}