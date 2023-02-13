import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginDtoType} from "../../common/types/auth-types";
import {appActions} from "../app/appSlice";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AxiosError} from "axios";
import {AppDispatch} from "../../common/store/store";
import {profileActions} from "../profile/profile-slice";
import {Car, CarsSearchEntities, CarsStateType} from "../../common/types/cars-types";
import {carsApi} from "./cars-api";

const initialState: CarsStateType = {
    cars:  null
}

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setCars: (state, action: PayloadAction<Car[]>) => {
            state.cars = action.payload
        },
    },
})


export const carsActions = carsSlice.actions

export const carsReducer = carsSlice.reducer

/* ---thunks---*/

export const getCarsTC = createAsyncThunk('auth/getCars', async (params:CarsSearchEntities, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const cars = await carsApi.findCars(params)
        dispatch(carsActions.setCars(cars))
        dispatch(appActions.changeAppStatus("succeeded"))
    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})
