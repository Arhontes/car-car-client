import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {TripsSearchEntitiesType, TripType} from "../../common/types/trip-types";
import {tripApi} from "./trip-api";
import {adminActions} from "../admin/admin-slice";

type TripsStateType = {
    trips: TripType[] | null,
    tripById: TripType | null
}
const initialState: TripsStateType = {
    trips: null,
    tripById: null,
}

export const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        setTrips: (state, action: PayloadAction<TripType[]>) => {
            state.trips = action.payload
        },
        setTripById: (state, action: PayloadAction<TripType>) => {
            state.tripById = action.payload
        },
    },
})

export const tripsReducer = tripsSlice.reducer

export const getTripsTC = createAsyncThunk('trips/getTrips', async (params: TripsSearchEntitiesType, {dispatch}) => {

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

export const getTripByIdTC = createAsyncThunk('trips/getTripById', async (tripId:string, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const result = await tripApi.getTripById(tripId)

        dispatch(adminActions.setTripById(result))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})