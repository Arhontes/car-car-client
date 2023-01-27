import {CreateTripDto, TripsSearchEntitiesType, TripType} from "../../common/types/trip-types";
import {axiosInstance} from "../../common/api/axios-instance";
import {CreatePassengerDto, PassengerType} from "../../common/types/passengers-types";
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
}