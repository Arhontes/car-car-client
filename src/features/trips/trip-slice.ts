import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {CreateTripDto, TripsSearchEntitiesType, TripType, UpdateTripDto} from "../../common/types/trip-types";
import {tripApi} from "./trip-api";

type TripsStateType = {
    trips: TripType[],
    tripById: TripType | null
}
const initialState: TripsStateType = {
    trips: [],
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
        removeTrip: (state, action: PayloadAction<string>) => {
            const index = state.trips?.findIndex(el => el.tripId === action.payload)
            if (index!==undefined && index > -1) {
                if (state.trips) {
                    state.trips.splice(index,1)
                }
            }
        },
        createTrip: (state, action: PayloadAction<TripType>) => {
            state.trips.push(action.payload)
        },
    },
})

export const tripsReducer = tripsSlice.reducer
export const tripsActions = tripsSlice.actions
export const getTripsTC = createAsyncThunk('trips/getTrips', async (params: TripsSearchEntitiesType, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const result = await tripApi.getTrips(params)
        dispatch(tripsActions.setTrips(result))
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

        dispatch(tripsActions.setTripById(result))
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

        dispatch(tripsActions.updateTrip(trip))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})

export const removeTripTC = createAsyncThunk('trips/removeOne', async (tripId:string, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const trip = await tripApi.removeTrip(tripId)

        dispatch(tripsActions.removeTrip(trip.tripId))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})
export const createTripTC = createAsyncThunk('trips/createOne', async (createTripDto:CreateTripDto, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const trip = await tripApi.createTrip(createTripDto)

        dispatch(tripsActions.createTrip(trip))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})