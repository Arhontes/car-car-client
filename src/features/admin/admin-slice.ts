import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TripType} from "../../common/types/trip-types";
import {Car} from "../../common/types/cars-types";

type AdminStateType = {
    trips: TripType[] | null,
    cars: Car[] | null,
    tripById: TripType | null
}
const initialState: AdminStateType = {
    trips: null,
    cars: null,
    tripById: null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setTrips: (state, action: PayloadAction<TripType[]>) => {
            state.trips = action.payload
        },
        setCars: (state, action: PayloadAction<Car[]>) => {
            state.cars = action.payload
        },
        setTripById: (state, action: PayloadAction<TripType>) => {
            state.tripById = action.payload
        },
    },

})

export const adminActions = adminSlice.actions
export const adminReducer = adminSlice.reducer


