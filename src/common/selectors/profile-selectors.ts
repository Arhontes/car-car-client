import {RootState} from "../store/store";

export const selectorProfileData = (state:RootState)=>{
    return state.profile
}