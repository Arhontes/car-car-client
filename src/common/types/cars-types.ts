export type Car = {
    carId:string
    licensePlate:string
    color:string
    userId:string
}
export type CarsStateType = {
    cars: null | Array<Car>
}
export type CarsSearchEntities = {
    userId?: string;
};