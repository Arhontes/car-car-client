import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "../auth/auth-slice";
import {appReducer} from "./appSlice";
import {profileReducer} from "../profile/profile-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app:appReducer,
        profile:profileReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch