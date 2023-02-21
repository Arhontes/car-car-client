import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {UpdateProfileDto, UserType} from "../../common/types/profile-types";
import {profileApi} from "./profile-api";

const initialState: UserType = {
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    userId: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<UserType>) => {
           return action.payload
        },
    },
})


export const profileActions = profileSlice.actions

export const profileReducer = profileSlice.reducer

/* ---thunks---*/

export const updateProfileTC = createAsyncThunk('profile/update', async ({profileId,updateProfileDto}:{
    profileId:string,
    updateProfileDto:UpdateProfileDto
}, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
       const profile =  await profileApi.updateProfile(profileId,updateProfileDto)
        dispatch(profileActions.setProfileData(profile))
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})