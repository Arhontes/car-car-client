import {axiosInstance} from "../../common/api/axios-instance";
import {Car, CarsSearchEntities} from "../../common/types/cars-types";


export const carsApi = {

    async findCars(params: CarsSearchEntities) {
        const result =  await axiosInstance.get<Car[]>(`cars`,{params})
        return result.data
    },
}
