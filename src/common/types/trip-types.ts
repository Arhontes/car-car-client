import {Car} from "./cars-types";
import {PassengerType} from "./passengers-types";

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

export type UpdateTripDto = {
     direction?:TripDirection
     startTime?:string
     date?:number
     car?:Car
}