import {RootState} from "../store/store";

export const selectorCheckIsAuth = (state:RootState)=>{
    return state.auth.isAuth
}
