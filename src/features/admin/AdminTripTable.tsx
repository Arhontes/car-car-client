import React, {useEffect} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../common/selectors/profile-selectors";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {getTripsTC} from "../trips/trip-slice";
import {selectorGetTrips} from "../../common/selectors/trips-selectors";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TripsSearch} from "../trips/TripsSearch";
import {AdminTripTableRow} from "./AdminTripTableRow";

export const AdminTripTable = React.memo(() => {
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
                        <TableRow key={"trip-table-head"}>
                            <TableCell>Направление</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Время</TableCell>
                            <TableCell>Машина</TableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {
                            trips?.length ? trips.map(trip =>
                                <AdminTripTableRow key={trip.tripId} {...trip}/>) : <tr key={"none"}><td >Не найдено</td></tr>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
})

