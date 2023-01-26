import React, {useState} from 'react';
import {Box, Button, IconButton, TextField} from "@mui/material";
import {TripDirection} from "../../common/types/trip-types";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {CustomDatePicker} from "../../common/components/CustomDatePicker";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import dayjs, {Dayjs} from "dayjs";
import {getTripsTC} from "./trip-slice";

type TripSearchPropsType = {
    navigateOption: () => void
}

export const TripsSearch = ({navigateOption}: TripSearchPropsType) => {
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
                <CustomDatePicker datePickerValue={datePickerValue} setDatePickerValue={setDatePickerValue}/>
                <Button onClick={redirectHandler} variant="contained">Найти</Button>
            </Box>

        </Box>

    );
};

