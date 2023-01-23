import {Car} from "./car-types";
import {PassengerType} from "./passenger-types";

export type CreateTripDto = {
     direction: string;
     date: number;
     car: Car;
     tripId: string;
     managerId: string;
}
export type TripDirection = "Onega-Arkhangelsk" | "Arkhangelsk-Onega"

export type TripType = {
     direction: TripDirection
     date: number;
     startTime: string;
     car: Car;
     passengers: PassengerType[];
     tripId: string;
     userId: string;
}

export type TripsSearchEntitiesType = {
     date?: string;
     direction?: string;
     userId?: string;
};