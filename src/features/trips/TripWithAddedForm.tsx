import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {Box, Button, Container} from "@mui/material";
import {TripType} from "../../common/types/trip-types";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddPassengerForm from "../passengers/AddPassengerForm";
import {selectorGetTripById, selectorGetTrips} from "../../common/selectors/trips-selectors";
import {getTripByIdTC} from "./trip-slice";
import {CustomTripCard} from "./CustomTripCard";

const TripWithAddedForm = () => {

    const [open, setOpen] = useState(false)
    let {tripId} = useParams();

    let trip = useAppSelector(selectorGetTrips)?.find(el => el.tripId === tripId) as TripType | null


    const tripById = useAppSelector(selectorGetTripById)

    if (!trip ) trip = tripById

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!trip && tripId) {
            dispatch(getTripByIdTC(tripId))
        }
    }, [tripId])

    return (
        !trip ? <div>Не найдено</div>
            : <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                <CustomTripCard {...trip}/>

                <Button onClick={() => setOpen(true)} sx={{marginY: 3}} variant="text" endIcon={<ControlPointIcon/>}>
                    Забронировать
                </Button>

                {open && <Box>
                    <AddPassengerForm trip={trip} direction={trip.direction}/>
                </Box>}
            </Container>
    );
};

export default TripWithAddedForm;