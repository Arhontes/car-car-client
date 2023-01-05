import {RootState} from "../../features/app/store";

export const checkIsAuth = (state:RootState)=>{
    return state.auth.isAuth
}
