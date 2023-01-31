export const getTimeFromStringHHmm = (value:string)=>{
    const [hours,minutes]  = value.split(":")

    const someDate = new Date()
    someDate.setHours(Number(hours))
    someDate.setMinutes(Number(minutes))

    return someDate
}