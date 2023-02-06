import dayjs from "dayjs";

export const getTimeFromStringHHmm = (value:string)=>{
    //value format is HH:MM
    const [hours,minutes]  = value.split(":")

    const someDate = dayjs()
        .hour(Number(hours))
        .minute(Number(minutes))

    return someDate
}