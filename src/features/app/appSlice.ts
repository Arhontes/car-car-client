import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {AppStateType, AppStatusType} from "../../common/types/app-types";

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

