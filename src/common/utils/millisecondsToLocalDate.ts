import dayjs from "dayjs";

export const millisecondsToLocalDate = (mills:number)=>{
    return dayjs(mills).format("L")
}