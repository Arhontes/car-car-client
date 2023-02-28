import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import {PassengerType} from "../../common/types/passengers-types";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetTripById} from "../../common/selectors/trips-selectors";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {getTripByIdTC} from "../trips/trip-slice";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {removePassengerTC} from "./passengers-slice";

const PassengerInfo = (props: PassengerType) => {
    const [confirm, setConfirm] = useState(false)
    const [open, setOpen] = useState(false)
    const date = millisecondsToLocalDate(props.date!)
    const dispatch = useAppDispatch()


    const removePassengerHandler = () => {
        dispatch(removePassengerTC(props.passengerId!))
    }
    return (
        <Paper elevation={5}>

            <Box sx={{paddingY: 2, margin: 3, display: "flex", flexDirection: "column"}}>

                <BasicPassengerInfo date={date} destinationPlace={props.to!}boardingPlace={props.from!}/>
                {
                    open &&
                    <AdditionalPassengerInfo {...props}/>

                }

                <IconButton onClick={() => setOpen(!open)} aria-label="extend" color="primary">
                    <ArrowDropDownCircleIcon/>
                </IconButton>

                <Button onClick={removePassengerHandler}>
                    Отказаться от поездки
                </Button>
            </Box>

        </Paper>
    );
};

export default PassengerInfo;

type BasicPassengerInfoPropsType = {
    date: string
    boardingPlace: string
    destinationPlace: string
}
const BasicPassengerInfo: React.FC<BasicPassengerInfoPropsType> =

    React.memo(({boardingPlace, destinationPlace, date}) => {


        return (
            <Box sx={{flexDirection:"column"}}>

                <Typography variant="body1" gutterBottom>
                   Дата выезда: {date}
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Место посадки: {boardingPlace}
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Место назначения: {destinationPlace}
                </Typography>
            </Box>
        )

    })

const AdditionalPassengerInfo = (props: PassengerType) => {
    const trip = useAppSelector(selectorGetTripById)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTripByIdTC(props.tripId!))
    }, [])

    return (
        <>
            <Box>
                Поездка подтверждена: {props.approved ? "Да" : "Нет"}
            </Box>
            <Box>
                Время выезда {trip?.startTime}
            </Box>
            <Box>
                Время начала посадки за {props.reservedTime} минут до выезда
            </Box>
            <Box>
                Номерной знак машины {trip?.car?.licensePlate}
            </Box>
            <Box>
                Цвет машины {trip?.car?.color}
            </Box>

        </>
    )
}