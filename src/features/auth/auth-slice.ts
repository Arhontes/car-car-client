import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AuthStateType} from "../../common/types/auth-types";
import {authAPI, RegisterDtoType} from "./auth-api";

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

export const loginTC = createAsyncThunk('auth/register', async (registerDto:RegisterDtoType, thunkAPI) => {

    try {
        await authAPI.register(registerDto)
        console.log(" registration successfully complete ")
    } catch (error) {
        console.log(" registration failed ")
    }

})
