import {RootState} from "../store/store";

export const selectorGetProfileData = (state:RootState)=>{
    return state.profile
}