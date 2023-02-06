import {axiosInstance} from "../../common/api/axios-instance";
import {CreatePassengerDto, PassengerType, UpdatePassengerDto} from "../../common/types/passengers-types";
import {PassengersSearchEntities} from "../../common/selectors/passengers-selectors";

export const passengersApi = {
    async addPassenger(passenger:CreatePassengerDto) {
        const result = await axiosInstance.post<PassengerType>("passengers", passenger)
        return result.data
    },

    async findPassengers(params:PassengersSearchEntities) {
        const result = await axiosInstance.get<PassengerType[]>("passengers", {params})
        return result.data
    },
    async removePassenger(passengerId:string) {
        const result = await axiosInstance.delete<PassengerType>(`passengers/${passengerId}`,)
        return result.data
    },
    async updatePassenger(passengerId:string,updateDto:UpdatePassengerDto) {
        const result = await axiosInstance.patch<PassengerType>(`passengers/${passengerId}`,updateDto)
        return result.data
    },
}