import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AppStateType, AppStatusType} from "../../common/types/app-types";
import {authAPI} from "../auth/auth-api";
import {profileActions} from "../profile/profile-slice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {authActions} from "../auth/auth-slice";

const initialState: AppStateType = {
    isInitialize: false,
    error: null,
    status: "idle",
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleIsInitialize: (state, action: PayloadAction<boolean>) => {
            state.isInitialize = action.payload
        },
        setAppError: (state, action: PayloadAction<string|null>) => {
            state.error = action.payload
        },
        changeAppStatus: (state, action: PayloadAction<AppStatusType>) => {
            state.status = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions

export const appReducer = appSlice.reducer

/*--- thunks ---*/

export const initializeAppTC = createAsyncThunk('app/initialize', async (_, {dispatch}) => {

    try {

        const refreshToken = localStorage.getItem('refresh_token')

        if (refreshToken){
            const result = await authAPI.refresh(refreshToken)

            const {access_token,refresh_token,user} = result.data

            localStorage.setItem('token', access_token)
            localStorage.setItem('refresh_token', refresh_token)

            dispatch(profileActions.setProfileData(user))
            dispatch(authActions.setAuth(true))


            dispatch(appActions.changeAppStatus("succeeded"))
        }
        else{
            throw new AxiosError("first-entry")
        }
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }finally {
        dispatch(appActions.toggleIsInitialize(true))
      /*  setTimeout(()=>{
            dispatch(appActions.toggleIsInitialize(true))
        },2000)*/
    }

})