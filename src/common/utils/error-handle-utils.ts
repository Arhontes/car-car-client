import axios, { AxiosError } from 'axios';
import {AppDispatch} from "../../features/app/store";
import {appActions} from "../../features/app/appSlice";


export const handleServerNetworkError = (
    e: Error | AxiosError<{ error: string }>,
    dispatch: AppDispatch,
): void => {
    const err = e as Error | AxiosError<{ error: string }>;

    dispatch( appActions.changeAppStatus('failed'));

    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response.data.error : err.message;

        dispatch(appActions.setAppError(error));
    } else {
        dispatch(appActions.setAppError(`Native error ${err.message}`));
    }

    setTimeout(()=>{
        dispatch(appActions.setAppError(null))
        dispatch(appActions.changeAppStatus("idle"))
    },3000)
};