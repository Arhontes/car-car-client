import {TripType} from "../../common/types/trip-types";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {getTimeFromStringHHmm} from "../../common/utils/getTimeFromStringHHmm";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
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

type AdminTripCardFormType = {
    direction: "Arkhangels-Onega" | "Onega-Arkhangels"
    date: Dayjs
    time: Dayjs
}
const directions = ["Arkhangels-Onega", "Onega-Arkhangels"]
export const AdminTripCardForm = (props: TripType) => {

    const {control, handleSubmit, formState: {isValid}, getValues} = useForm<AdminTripCardFormType>({
        mode: "all", defaultValues: {
            time: getTimeFromStringHHmm(props.startTime),
            date: millisecondsToLocalDate(props.date)
        }
    })

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<AdminTripCardFormType> = data => {

        const time = getTimeFromDayjs(data.time)
        const date = getDateInMilliseconds(data.date)
        console.dir({
            date,
            time,
            direction: data.direction
        })
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <FormSelectField
                        label={"Направление"}
                        control={control as any}
                        name={"direction"}
                        defaultValue={"Onega-Arkhangels"}
                        children={directions.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
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
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Подтвердить
                </Button>
            </Grid>
        </Box>
    )
}