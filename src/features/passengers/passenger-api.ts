import {CreateTripDto, TripsSearchEntitiesType, TripType} from "../../common/types/trip-types";
import {axiosInstance} from "../../common/api/axios-instance";
import {CreatePassengerDto, PassengerType} from "../../common/types/passengers-types";

export const passengersApi = {
    async addPassenger(passenger:CreatePassengerDto) {
        const result = await axiosInstance.post<PassengerType>("passengers", passenger)
        return result.data
    },
    async getTrips(params: TripsSearchEntitiesType) {
        const result = await axiosInstance.get<TripType[]>("passengers", {params})
        return result.data
    },
    async getTripById(tripId:string) {
        const result = await axiosInstance.get<TripType>(`passengers/${tripId}`, )
        return result.data
    },

}