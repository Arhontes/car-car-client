import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {AppStateType} from "../../common/types/app-types";

const initialState: AppStateType = {
    isInitialize:false,
    error:null,
    status:"idle",
}

export const authSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
// export const {incrementByAmount} = authSlice.actions

export const appReducer = authSlice.reducer

