import {RootState} from "../store/store";

export const checkIsAuth = (state:RootState)=>{
    return state.auth.isAuth
}
