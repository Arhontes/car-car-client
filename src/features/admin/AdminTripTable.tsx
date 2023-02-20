import React, {useCallback, useEffect, useState} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../common/selectors/profile-selectors";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {createTripTC, getTripsTC, removeTripTC} from "../trips/trip-slice";
import {selectorGetTrips} from "../../common/selectors/trips-selectors";
import {
    Box,
    Dialog,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {TripsSearch} from "../trips/TripsSearch";
import {AdminTripTableRow} from "./AdminTripTableRow";
import AddIcon from '@mui/icons-material/Add';
import {AdminTripCardForm} from "./AdminTripCardForm";
import {getCarsTC} from "../cars/cars-slice";
import {CreateTripDto} from "../../common/types/trip-types";

export const AdminTripTable = React.memo(() => {
    const [open,setOpen] = useState(false)

    const profile = useAppSelector(selectorGetProfileData)
    const trips = useAppSelector(selectorGetTrips)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTripsTC({userId: profile.userId!}))
        if (profile.userId){
            dispatch(getCarsTC({userId: profile.userId}))
        }
    }, [])
    const  createTripHandler = useCallback((createTripDto:CreateTripDto)=>{
        dispatch(createTripTC(createTripDto))
    },[dispatch])
    const removeTripHandler = useCallback((tripId:string) =>{
        dispatch(removeTripTC(tripId))
    },[dispatch])

    const handleOpen = ()=>{
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }
    return (
        <Box>
            <TripsSearch navigateOption={() => {
            }}/>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">

                    <TableHead>
                        <TableRow key={"trip-table-head"}>
                            <TableCell padding="checkbox">
                                <IconButton onClick={handleOpen} aria-label="delete-trip-from-cell">
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>Направление</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Время</TableCell>
                            <TableCell>Машина</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {
                            trips?.length ? trips.map(trip =>
                                <AdminTripTableRow trip={trip} removeTrip={removeTripHandler} key={trip.tripId}/>) : <tr key={"none"}><td >Не найдено</td></tr>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog onClose={handleClose} open={open} >
                <AdminTripCardForm userId={profile.userId!} purpose={"create"} createTrip={createTripHandler}/>
            </Dialog>
        </Box>

    );
})

