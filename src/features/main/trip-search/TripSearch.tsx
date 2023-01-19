import React, {useState} from 'react';
import {Box, Button, IconButton, TextField} from "@mui/material";
import {TripDirection} from "../../../common/types/trip-types";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {TripDatePicker} from "../../../common/components/TripDatePicker";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {getTripsTC} from "../../admin/admin-slice";
import dayjs, {Dayjs} from "dayjs";

type TripSearchPropsType = {
    navigateOption: () => void
}

export const TripSearch = ({navigateOption}: TripSearchPropsType) => {
    const currentDate = new Date().toJSON().slice(0, 10);

    const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
        dayjs(currentDate),
    );
    const [direction, setDirection] = useState<TripDirection>("Onega-Arkhangelsk")

    const dispatch = useAppDispatch()

    const setDirectionHandler = () => {
        setDirection(direction === "Onega-Arkhangelsk" ? "Arkhangelsk-Onega" : "Onega-Arkhangelsk")
    }

    const redirectHandler = () => {
        const dateInMillisecond = (dayjs(datePickerValue).unix() * 1000).toString()
        dispatch(getTripsTC({date: dateInMillisecond, direction: direction}))
        navigateOption()

    }

    const displayDirection = direction.split("-")
    return (
        <Box sx={{
            display: "flex",
            alignItems: "top",
            justifyContent: "center",
            padding: 3
        }}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{
                    opacity: 0.9,
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                }}>
                    <TextField sx={{opacity: 0.9, backgroundColor: "white"}} id="direction-from"
                               value={displayDirection[0]} variant="outlined"/>
                    <IconButton sx={{position: "absolute", zIndex: 1}} onClick={setDirectionHandler}
                                aria-label="switch-direction">
                        <ChangeCircleIcon/>
                    </IconButton>
                    <TextField sx={{textAlign: "center", backgroundColor: "white"}} id={"direction-to"}
                               value={displayDirection[1]} variant="outlined"/>
                </Box>
                <TripDatePicker datePickerValue={datePickerValue} setDatePickerValue={setDatePickerValue}/>
                <Button onClick={redirectHandler} variant="contained">Найти</Button>
            </Box>

        </Box>

    );
};

/*const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'] as const;

const TripDate = () =>{
    const [locale, setLocale] = React.useState<typeof locales[number]>('ru');

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
    const selectLocale = (newLocale: any) => {
        setLocale(newLocale);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}*/

