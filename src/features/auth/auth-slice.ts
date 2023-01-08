import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthStateType, LoginDtoType, RegisterDtoType} from "../../common/types/auth-types";
import {authAPI} from "./auth-api";
import {appActions} from "../app/appSlice";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AxiosError} from "axios";
import {AppDispatch} from "../app/store";

const initialState: AuthStateType = {
    isAuth: false,
    email: null,
    username: null,
    lastname: null,
    phone: null,
    userId: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})


// export const {incrementByAmount} = authSlice.actions

export const authReducer = authSlice.reducer

/* ---thunks---*/

export const registerTC = createAsyncThunk('auth/register', async (registerDto:RegisterDtoType, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        await authAPI.register(registerDto)
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch )
    }

})

export const loginTC = createAsyncThunk('auth/login', async (loginDto:LoginDtoType, {dispatch}) => {
   dispatch(appActions.changeAppStatus("loading"))

    try {
        await authAPI.login(loginDto)
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch )
    }

})
