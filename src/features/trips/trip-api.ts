import {axiosInstance} from "../../common/api/axios-instance";
import {CreateTripDto, TripType, TripsSearchEntitiesType, UpdateTripDto} from "../../common/types/trip-types";

export const tripApi = {
    async createTrip(trip: CreateTripDto) {
        const result = await axiosInstance.post("trip", trip)
        return result.data
    },
    async getTrips(params: TripsSearchEntitiesType) {
        const result = await axiosInstance.get<TripType[]>("trip", {params})
        return result.data
    },
    async getTripById(tripId:string) {
        const result = await axiosInstance.get<TripType>(`trip/${tripId}`, )
        return result.data
    },
    async updateTrip(tripId:string, updateDto:UpdateTripDto) {
        const result = await axiosInstance.patch<TripType>(`trip/${tripId}`, updateDto)
        return result.data
    },
    async removeTrip(tripId:string) {
        const result = await axiosInstance.delete<TripType>(`trip/${tripId}`, )
        return result.data
    },
}