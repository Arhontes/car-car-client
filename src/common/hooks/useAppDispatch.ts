import {AppDispatch} from "../../features/app/store";
import {useDispatch} from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>()