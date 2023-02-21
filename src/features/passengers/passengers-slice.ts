import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../app/appSlice";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/error-handle-utils";
import {AppDispatch} from "../../common/store/store";
import {CreatePassengerDto, PassengerType, UpdatePassengerDto} from "../../common/types/passengers-types";
import {passengersApi} from "./passengers-api";
import {PassengersSearchEntities} from "../../common/selectors/passengers-selectors";

type PassengersStateType = {
    isAdded: null | boolean
    addedPassenger: null | PassengerType
    passengersList: PassengerType[]
}
const initialState: PassengersStateType = {
    passengersList: [],
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
        removePassenger: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                passengersList: state.passengersList!.filter(el => el.passengerId !== action.payload)
            }
        },
        updatePassenger: (state, action: PayloadAction<PassengerType>) => {
            const index = state.passengersList?.findIndex(el => el.passengerId === action.payload.passengerId)
            if (index && index > -1) {
                if (state.passengersList) {
                    state.passengersList[index] = action.payload
                }
            }
        },
        addPassenger: (state, action: PayloadAction<PassengerType>) => {
            state.passengersList.push(action.payload)
        },


    },
    /*extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state, action) => {
        });*/
})

export const passengersActions = passengersSlice.actions
export const passengersReducer = passengersSlice.reducer

export const addPassengerTC = createAsyncThunk('passengers/add', async (passenger: CreatePassengerDto, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const addedPassenger = await passengersApi.addPassenger(passenger)

        dispatch(passengersActions.setIsAdded(true))
        dispatch(passengersActions.setAddedPassenger(addedPassenger))
        dispatch(passengersActions.addPassenger(addedPassenger))
        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})

export const getPassengersTC = createAsyncThunk('passengers/getAll', async (params: PassengersSearchEntities, {dispatch}) => {

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
export const removePassengerTC = createAsyncThunk('passengers/removeOne', async (passengerId: string, {dispatch}) => {

    dispatch(appActions.changeAppStatus("loading"))

    try {
        const passengers = await passengersApi.removePassenger(passengerId)

        dispatch(passengersActions.removePassenger(passengerId))

        dispatch(appActions.changeAppStatus("succeeded"))

    } catch (error) {
        const err = error as AxiosError
        handleServerNetworkError(err, dispatch as AppDispatch)
    }

})
export const updatePassengerTC = createAsyncThunk('passengers/updateOne',
    async (data: { passengerId: string, updateDto: UpdatePassengerDto }, {dispatch}) => {

        dispatch(appActions.changeAppStatus("loading"))

        try {
            const passenger = await passengersApi.updatePassenger(data.passengerId,data.updateDto)

            dispatch(passengersActions.updatePassenger(passenger))

            dispatch(appActions.changeAppStatus("succeeded"))

        } catch (error) {
            const err = error as AxiosError
            handleServerNetworkError(err, dispatch as AppDispatch)
        }

    })