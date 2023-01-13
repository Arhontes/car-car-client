import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserType} from "../../common/types/common-types";

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

