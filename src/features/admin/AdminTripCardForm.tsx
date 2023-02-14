import {TripDirection, TripType, UpdateTripDto} from "../../common/types/trip-types";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {getTimeFromStringHHmm} from "../../common/utils/getTimeFromStringHHmm";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {getTimeFromDayjs} from "../../common/utils/getTimeFromDayjs";
import {getDateInMilliseconds} from "../../common/utils/getDateInMilliseconds";
import {Box, MenuItem} from "@mui/material";
import Grid from "@mui/material/Grid";
import {FormSelectField} from "../../common/components/FormSelectField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import {TimePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import React from "react";
import {Dayjs} from "dayjs";
import {Car} from "../../common/types/cars-types";

type AdminTripCardFormType = {
    direction: TripDirection
    date: Dayjs
    time: Dayjs
    car:string
}
const directions = ["Arkhangelsk-Onega", "Onega-Arkhangelsk"]

type AdminTripCardFormPropsType = {
    cars: Car[] | null,
    trip: TripType,
    updateTrip: (tripId: string, updateDto: UpdateTripDto) => void
}

export const AdminTripCardForm = React.memo(({trip, cars, ...restProps}: AdminTripCardFormPropsType) => {


    const {control, handleSubmit, formState: {isValid}, getValues, setError} = useForm<AdminTripCardFormType>({
        mode: "all", defaultValues: {
            time: getTimeFromStringHHmm(trip.startTime),
            date: millisecondsToLocalDate(trip.date),
            car: ""
        }
    })

    const onSubmit: SubmitHandler<AdminTripCardFormType> = data => {
        const startTime = getTimeFromDayjs(data.time)
        const date = getDateInMilliseconds(data.date)
        const car = cars?.find(el=>el.licensePlate===getValues("car"))

        restProps.updateTrip(trip.tripId, {
            startTime,
            date: Number(date),
            direction: data.direction,
            car
        })
    };
    const carSelectLabel =  `Машина ${trip.car?.licensePlate||"не выбрана"}`
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <FormSelectField
                        label={"Направление"}
                        control={control as any}
                        name={"direction"}
                        defaultValue={"Onega-Arkhangelsk"}
                        children={directions.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormSelectField
                        label={carSelectLabel}
                        control={control as any}
                        name={"car"}
                        defaultValue={cars?.[0].licensePlate||""}
                        children={cars?.map(el => <MenuItem
                            key={el.carId}
                            value={el.licensePlate}>{el.licensePlate}</MenuItem>)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name={"time"}
                        control={control}
                        render={({
                                     field: {onChange, onBlur, value, name, ref},
                                     fieldState: {error},
                                 }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                <Stack spacing={3}>
                                    <TimePicker
                                        closeOnSelect
                                        inputFormat={"HH:mm"}
                                        label="Время поездки"
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        )}
                    />
                </Grid>


                <Grid item xs={12}>
                    <Controller
                        name={"date"}
                        control={control}
                        render={({
                                     field: {onChange, onBlur, value, name, ref},
                                     fieldState: {error},
                                 }) => (

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                <Stack spacing={3}>
                                    <DatePicker
                                        label="Установить дату"
                                        value={value}
                                        onChange={onChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        )}
                    />
                </Grid>

                <Button
                    type={"submit"}
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Подтвердить
                </Button>

            </Grid>
        </Box>
    )
})