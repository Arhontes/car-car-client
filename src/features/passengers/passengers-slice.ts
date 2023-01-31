import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {CreatePassengerDto, PassengerType} from "../../common/types/passengers-types";
import {passengersApi} from "./passengers-api";
import {PassengersSearchEntities} from "../../common/selectors/passengers-selectors";

type PassengersStateType = {
    isAdded: null | boolean
    addedPassenger: null | PassengerType
    passengersList: null | PassengerType[]
}
const initialState: PassengersStateType = {
    passengersList: null,
    addedPassenger: null,
    isAdded: null
}

export const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {
        setAddedPassenger: (state, action: PayloadAction<PassengerType>) => {
            state.addedPassenger = action.payload
        },
        setIsAdded: (state, action: PayloadAction<boolean>) => {
            state.isAdded = action.payload
        },
        setPassengersList: (state, action: PayloadAction<PassengerType[]>) => {
            state.passengersList = action.payload
        },

    },
    /*extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state, action) => {
        });*/
})

export const passengersActions = passengersSlice.actions
export const passengersReducer = passengersSlice.reducer

export const addPassengerTC = createAsyncThunk('passengers/addPassenger', async (passenger: CreatePassengerDto, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const addedPassenger = await passengersApi.addPassenger(passenger)

        dispatch(passengersActions.setIsAdded(true))
        dispatch(passengersActions.setAddedPassenger(addedPassenger))

        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})

export const getPassengersTC = createAsyncThunk('passengers/getPassengers', async (params: PassengersSearchEntities, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const passengers = await passengersApi.findPassengers(params)

        dispatch(passengersActions.setPassengersList(passengers))

        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})