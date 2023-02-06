import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../common/selectors/profile-selectors";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {getTripsTC} from "../trips/trip-slice";
import {selectorGetTrips} from "../../common/selectors/trips-selectors";
import {Box, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TripsSearch} from "../trips/TripsSearch";
import {TripType} from "../../common/types/trip-types";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {AdminTripCard} from "./AdminTripCard";

export const AdminTripTable = () => {
    const profile = useAppSelector(selectorGetProfileData)
    const trips = useAppSelector(selectorGetTrips)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTripsTC({userId: profile.userId!}))
    }, [])
    return (
        <Box>
            <TripsSearch navigateOption={() => {
            }}/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Направление</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Время</TableCell>
                            <TableCell>Машина</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {
                            trips?.length ? trips.map(trip => <AdminTripTableRow key={trip.tripId} {...trip}/>) : <tr key={"none"}><td >Не найдено</td></tr>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
};

const AdminTripTableRow = (props: TripType) => {
    const [open,setOpen] = useState(false)

    const onOpenHandler = ()=>{
        setOpen(true)
    }
    const onCloseHandler = ()=>{
        setOpen(false)
    }

    return (
        <>
            <TableRow onClick={onOpenHandler} key={props.tripId}>
                <TableCell component="th" scope="row">{props.direction}</TableCell>
                <TableCell component="th" scope="row">{millisecondsToLocalDate(props.date)}</TableCell>
                <TableCell component="th" scope="row">{props.startTime}</TableCell>
                <TableCell component="th" scope="row">{props.car?.licensePlate || "Не назначено"}</TableCell>
            </TableRow>
            <Dialog  onClose={onCloseHandler}  open={open}>
                    <AdminTripCard {...props}/>
            </Dialog>
        </>

)
}