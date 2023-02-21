import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Paper} from "@mui/material";
import {PassengerType} from "../../common/types/passengers-types";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetTripById} from "../../common/selectors/trips-selectors";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {getTripByIdTC} from "../trips/trip-slice";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {removePassengerTC} from "./passengers-slice";

const PassengerInfo = (props:PassengerType) => {
    const [open,setOpen] = useState(false)
    const date = millisecondsToLocalDate(props.date!)
    const dispatch = useAppDispatch()

    const removePassengerHandler = ()=>{
        dispatch(removePassengerTC(props.passengerId!))
    }
    return (
        <Paper elevation={5}>

            <Box sx={{margin:3,display:"flex",flexDirection:"column"}}>
                <Box>
                    Дата поездки {date}
                </Box>
                <Box>
                    Место посадки {props.from}
                </Box>
                <Box>
                    Место назначения {props.to}
                </Box>
                <IconButton onClick={()=>setOpen(!open)} aria-label="extend" color="primary">
                    <ArrowDropDownCircleIcon />
                </IconButton>
                {
                    open&&
                    <AdditionalPassengerInfo {...props}/>

                }
                <Button onClick={removePassengerHandler}>
                    Отказаться от поездки
                </Button>
            </Box>

        </Paper>
    );
};

export default PassengerInfo;

const AdditionalPassengerInfo = (props:PassengerType)=>{
    const trip = useAppSelector(selectorGetTripById)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getTripByIdTC(props.tripId!))
    },[])

    return (
        <>
            <Box>
                Поездка подтверждена: {props.approved?"Да":"Нет"}
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