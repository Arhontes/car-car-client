import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Trip, TripsSearchEntitiesType} from "../../common/types/trip-types";
import {Car} from "../../common/types/car-types";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../app/store";
import {tripApi} from "../../common/api/trip-api";

type AdminStateType = {
    trips: Trip[] | null,
    cars: Car[] | null,
}
const initialState: AdminStateType = {
    trips: null,
    cars: null,

}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setTrips: (state, action: PayloadAction<Trip[]>) => {
            state.trips = action.payload
        },
        setCars: (state, action: PayloadAction<Car[]>) => {
            state.cars = action.payload
        },
    },
    /*extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state, action) => {
        });*/
})

export const adminActions = adminSlice.actions
export const adminReducer = adminSlice.reducer

export const getTripsTC = createAsyncThunk('admin/getTrips', async (params: TripsSearchEntitiesType, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const result = await tripApi.getTrips(params)
        dispatch(adminActions.setTrips(result))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})