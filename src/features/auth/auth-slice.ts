import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthStateType, LoginDtoType, LoginResponseType, RegisterDtoType} from "../../common/types/auth-types";
import {authAPI} from "./auth-api";
import {appActions} from "../app/appSlice";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AxiosError} from "axios";
import {AppDispatch} from "../app/store";
import {profileActions} from "../profile/profile-slice";

const initialState: AuthStateType = {
    isAuth: false,
    access_token: null,
    refresh_token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<LoginResponseType>) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
    /*extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state, action) => {
        });*/
})


export const authActions = authSlice.actions

export const authReducer = authSlice.reducer

/* ---thunks---*/

export const registerTC = createAsyncThunk('auth/register', async (registerDto: RegisterDtoType, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        await authAPI.register(registerDto)
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})

export const loginTC = createAsyncThunk('auth/login', async (loginDto: LoginDtoType, {dispatch}) => {
    dispatch(appActions.changeAppStatus("loading"))

    try {
        const result = await authAPI.login(loginDto)
        /* dispatch(authActions.setTokens(result.data))*/
        localStorage.setItem('token', result.data.access_token)
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})
export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
    dispatch(appActions.changeAppStatus("loading"))

    try {
        await authAPI.logout()
        localStorage.removeItem('token')

        dispatch(profileActions.setProfileData(
            {
                lastname: null,
                phone: null,
                userId: null,
                username: null,
                email: null
            }))

        dispatch(authActions.setAuth(false))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})

export const authMeTC = createAsyncThunk('auth/me', async (_, thunkAPI) => {
    thunkAPI.dispatch(appActions.changeAppStatus("loading"))

    try {
        const result = await authAPI.authMe()
        thunkAPI.dispatch(profileActions.setProfileData(result.data))
        thunkAPI.dispatch(authActions.setAuth(true))
        thunkAPI.dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, thunkAPI.dispatch as AppDispatch)
    }

})
export const refreshTC = createAsyncThunk('auth/refresh', async (_, {dispatch}) => {
    dispatch(appActions.changeAppStatus("loading"))

    try {

        const result = await authAPI.refresh()

        const {access_token,...user} = result.data

        dispatch(profileActions.setProfileData(user))
        dispatch(authActions.setAuth(true))
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})
