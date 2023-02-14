import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {TripsSearchEntitiesType, TripType, UpdateTripDto} from "../../common/types/trip-types";
import {tripApi} from "./trip-api";

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
        updateTrip: (state, action: PayloadAction<TripType>) => {
            const index = state.trips?.findIndex(el => el.tripId === action.payload.tripId)
            if (index!==undefined && index > -1) {
                if (state.trips) {
                    state.trips[index] = action.payload
                }
            }
        },
    },
})

export const tripsReducer = tripsSlice.reducer
export const tripActions = tripsSlice.actions
export const getTripsTC = createAsyncThunk('trips/getTrips', async (params: TripsSearchEntitiesType, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const result = await tripApi.getTrips(params)
        dispatch(tripActions.setTrips(result))
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

        dispatch(tripActions.setTripById(result))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})

export const updateTripTC = createAsyncThunk('trips/updateTrip', async (data:{tripId:string,updateDto:UpdateTripDto}, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const trip = await tripApi.updateTrip(data.tripId,data.updateDto)

        dispatch(tripActions.updateTrip(trip))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})