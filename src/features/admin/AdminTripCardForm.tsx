import {CreateTripDto, TripDirection, TripType, UpdateTripDto} from "../../common/types/trip-types";
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
import dayjs, {Dayjs} from "dayjs";
import {Car} from "../../common/types/cars-types";
import {TripMainFields} from "./TripMainFields";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetCars} from "../../common/selectors/cars-selectors";

export type AdminTripCardFormType = {
    direction: TripDirection
    date: Dayjs
    time: Dayjs
    car:string
}
const directions = ["Arkhangelsk-Onega", "Onega-Arkhangelsk"]

type AdminTripCardFormPropsType = {
    userId:string,
    purpose: "create"|"update"
    trip?: TripType,
    updateTrip?: (tripId: string, updateDto: UpdateTripDto) => void
    createTrip?:(createTripDto:CreateTripDto)=>void
}

export const AdminTripCardForm = React.memo(({trip, ...restProps}: AdminTripCardFormPropsType) => {

    const cars = useAppSelector(selectorGetCars)

    const {control, handleSubmit, formState: {isValid}, getValues, setError} = useForm<AdminTripCardFormType>({
        mode: "all", defaultValues: {
            time: getTimeFromStringHHmm(trip?.startTime || "00:00"),
            date: millisecondsToLocalDate(trip?.date || Number(getDateInMilliseconds(dayjs()))),
            car: ""
        }
    })

    const onSubmit: SubmitHandler<AdminTripCardFormType> = data => {
        const startTime = getTimeFromDayjs(data.time)
        const date = getDateInMilliseconds(data.date)
        const car = cars?.find(el=>el.licensePlate===getValues("car"))

        const dto = {
            startTime,
            date: Number(date),
            direction: data.direction,
            car
        }
        switch (restProps.purpose){
            case "update":
                if (trip && trip.tripId){
                    restProps.updateTrip!(trip.tripId, {
                        ...dto
                    })
                }
                break;
            case "create":

                // @ts-ignore
                restProps.createTrip!({userId:restProps.userId,
                    ...dto
                })
                break;
        }

    };
    const carSelectLabel =  `Машина ${trip?.car?.licensePlate||"не выбрана"}`
    return (
        <Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>

                <Grid container spacing={2}>

                    <TripMainFields
                        carSelectLabel={carSelectLabel}
                        control={control as any}
                        cars={cars}

                    />

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
        </Box>

    )
})