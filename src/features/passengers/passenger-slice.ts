import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TripType, TripsSearchEntitiesType} from "../../common/types/trip-types";
import {Car} from "../../common/types/car-types";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../app/store";
import {tripApi} from "../trip/trip-api";
import {adminActions} from "../admin/admin-slice";
import {CreatePassengerDto} from "../../common/types/passengers-types";
import {passengersApi} from "./passenger-api";

type PassengersStateType = {

}
const initialState: PassengersStateType = {

}

export const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {

    },
    /*extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state, action) => {
        });*/
})

export const addPassengerTC = createAsyncThunk('passengers/addPassenger', async (passenger:CreatePassengerDto, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const addedPassenger = await passengersApi.addPassenger(passenger)

        console.log(addedPassenger)

        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})