import {axiosInstance} from "./axios-instance";
import {CreateTripDto, Trip, TripsSearchEntitiesType} from "../types/trip-types";

export const tripApi = {
    async createTrip(trip: CreateTripDto) {
        const result = await axiosInstance.post("trip", trip)
        return result.data
    },
    async getTrips(params: TripsSearchEntitiesType) {
        const result = await axiosInstance.get<Trip[]>("trip", {params})
        return result.data
    },


}