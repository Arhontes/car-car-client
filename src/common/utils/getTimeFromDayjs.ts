import {Dayjs} from "dayjs";

export const getTimeFromDayjs = (value:Dayjs)=>{
    return value.format("HH:mm").toString()
}