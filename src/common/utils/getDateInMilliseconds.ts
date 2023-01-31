import dayjs from "dayjs";

export const getDateInMilliseconds = (value:dayjs.Dayjs|null)=>{
   return (dayjs(value).unix() * 1000).toString()
}