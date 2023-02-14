import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from "../../features/auth/auth-slice";
import {appReducer} from "../../features/app/appSlice";
import {profileReducer} from "../../features/profile/profile-slice";
import {passengersReducer} from "../../features/passengers/passengers-slice";
import {tripsReducer} from "../../features/trips/trip-slice";
import {carsReducer} from "../../features/cars/cars-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app:appReducer,
        profile:profileReducer,
        passengers: passengersReducer,
        trips: tripsReducer,
        cars: carsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch