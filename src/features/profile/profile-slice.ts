import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AuthStateType, LoginDtoType, RegisterDtoType} from "../../common/types/auth-types";
import {appActions} from "../app/appSlice";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AxiosError} from "axios";
import {AppDispatch} from "../app/store";
import {UserType} from "../../common/types/common-types";

const initialState: UserType = {
    email: null,
    username: null,
    lastname: null,
    phone: null,
    userId: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<UserType>) => {
            state = action.payload
        },
    },
})


export const profileActions = profileSlice.actions

export const profileReducer = profileSlice.reducer

/* ---thunks---*/

