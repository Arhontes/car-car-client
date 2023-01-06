import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthStateType} from "../../common/types/auth-types";
import {authAPI, RegisterDtoType} from "./auth-api";
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

export const loginTC = createAsyncThunk('auth/register', async (registerDto:RegisterDtoType, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        await authAPI.register(registerDto)
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch )
    }


})
