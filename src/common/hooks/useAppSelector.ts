import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../features/app/store";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector