import {axiosInstance} from "./axios-instance";
import {CreateTripDto, TripType, TripsSearchEntitiesType} from "../types/trip-types";

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

}