import axios, { AxiosError } from 'axios';
import {AppDispatch} from "../store/store";
import {appActions} from "../../features/app/appSlice";

const exceptionsList = ['first-entry']

export const handleServerNetworkError = (
    e: Error | AxiosError<{ error: string }>,
    dispatch: AppDispatch,
): void => {
    const err = e as Error | AxiosError<{ error: string }>;

    dispatch( appActions.changeAppStatus('failed'));

    if (axios.isAxiosError(err)) {
        // @ts-ignore
        const error = err.response?.data ? err.response.data?.message : err.response.data.error;

        const exception = checkIsException(error)

        if (!exception){
            dispatch(appActions.setAppError(error));
        }

    } else {
        dispatch(appActions.setAppError(`Native error ${err.message}`));
    }

    setTimeout(()=>{
        dispatch(appActions.setAppError(null))
        dispatch(appActions.changeAppStatus("idle"))
    },3000)
};

export const checkIsException = (exception:string):boolean=>{
    const result = exceptionsList.find(el=>el===exception)
    return !!result
}