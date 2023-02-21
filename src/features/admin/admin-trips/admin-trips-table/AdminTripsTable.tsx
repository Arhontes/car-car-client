import React from 'react';
import {Paper, Table, TableContainer} from "@mui/material";
import AdminTripsTableHead from "./AdminTripsTableHead";
import AdminTripsTableBody from "./AdminTripsTableBody";
import {TripType} from "../../../../common/types/trip-types";

type PropsType = {
    handleOpen: () => void
    removeTrip: (tripId: string) => void
    trips: TripType[]
}

export const AdminTripsTable: React.FC<PropsType> = React.memo(({trips, removeTrip, handleOpen}) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">

                <AdminTripsTableHead handleOpen={handleOpen}/>
                <AdminTripsTableBody removeTrip={removeTrip} trips={trips}/>

            </Table>
        </TableContainer>
    );
})

