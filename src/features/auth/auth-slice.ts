import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthStateType, LoginDtoType, AuthGeneratedType, RegisterDtoType} from "../../common/types/auth-types";
import {authAPI} from "./auth-api";
import {appActions} from "../app/appSlice";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AxiosError} from "axios";
import {AppDispatch} from "../../common/store/store";
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
        setTokens: (state, action: PayloadAction<AuthGeneratedType>) => {
            state.access_token = action.payload.access_token
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
        const result = await authAPI.register(registerDto)

        dispatch(profileActions.setProfileData(result.user))
        localStorage.setItem('token', result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
        dispatch(authActions.setAuth(true))

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

        dispatch(profileActions.setProfileData(result.user))
        localStorage.setItem('token', result.access_token)
        localStorage.setItem('refresh_token', result.refresh_token)
        dispatch(authActions.setAuth(true))
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
        localStorage.removeItem('refresh_token')

        dispatch(profileActions.setProfileData(
            {
                lastName: null,
                phone: null,
                userId: null,
                firstName: null,
                email: null
            }))

        dispatch(authActions.setAuth(false))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})


export const refreshTC = createAsyncThunk('auth/refresh', async (_, {dispatch}) => {
    dispatch(appActions.changeAppStatus("loading"))

    try {

        const result = await authAPI.refresh("tempData")

        const {access_token,user} = result.data

        localStorage.setItem('token',access_token)

        dispatch(profileActions.setProfileData(user))
        dispatch(authActions.setAuth(true))
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})
