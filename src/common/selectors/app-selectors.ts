import {RootState} from "../store/store";
import {AppStatusType} from "../types/app-types";

export const getAppErrorMessage = (state:RootState):string|null=>{
    return state.app.error
}
export const getAppStatus  = (state:RootState):AppStatusType=>{
    return state.app.status
}

export const checkIsAppInitialize =  (state:RootState)=>{
    return state.app.isInitialize
}