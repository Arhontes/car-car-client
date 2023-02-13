import {RootState} from "../store/store";

export const selectorGetCars = (state:RootState)=>{
    return state.cars.cars
}