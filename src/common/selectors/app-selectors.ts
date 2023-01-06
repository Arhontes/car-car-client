import {RootState} from "../../features/app/store";

export const getAppErrorMessage = (state:RootState):string|null=>{
    return state.app.error
}

