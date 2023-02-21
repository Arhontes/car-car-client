import React from 'react';
import Grid from "@mui/material/Grid";
import {FormSelectField} from "../../../common/components/FormSelectField";
import {MenuItem} from "@mui/material";
import {Control, Controller} from "react-hook-form";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import {TimePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {UseControllerProps} from "react-hook-form/dist/types/controller";
import {Car} from "../../../common/types/cars-types";
import {AdminTripCardFormType} from "../admin-trips/trip-panel/main/AdminTripMain";

type TripMainFieldsPropsType = {
    cars: Car[] | null
    carSelectLabel? : string
    control: Control<AdminTripCardFormType, any>
}

const directions = ["Arkhangelsk-Onega", "Onega-Arkhangelsk"]

export const TripMainFields = ({control,cars,...restProps}:TripMainFieldsPropsType) => {


    return (
        <>
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
                        label={restProps.carSelectLabel||""}
                        control={control as any}
                        name={"car"}
                        defaultValue={cars?.[0].licensePlate || ""}
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
        </>
    );
};

