import React, {useState} from "react";
import {TripType} from "../../common/types/trip-types";
import {Dialog, IconButton, TableCell, TableRow} from "@mui/material";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {AdminTripCard} from "./AdminTripCard";
import DeleteIcon from '@mui/icons-material/Delete';

type AdminTripTableRowPropsType = {
    trip: TripType,
    removeTrip: (tripId: string) => void
}

export const AdminTripTableRow = React.memo(({trip, removeTrip}: AdminTripTableRowPropsType) => {
    const [open, setOpen] = useState(false)

    const onOpenHandler = () => {
        setOpen(true)
    }
    const onCloseHandler = () => {
        setOpen(false)
    }

    const onDeleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        removeTrip(trip.tripId)
    }
    return (
        <>
            <TableRow onClick={onOpenHandler} key={trip.tripId}>

                <TableCell padding={"checkbox"}>
                    <IconButton onClick={(event)=>onDeleteHandler(event)} aria-label="delete-trip-from-cell">
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">{trip.direction}</TableCell>
                <TableCell component="th" scope="row">{millisecondsToLocalDate(trip.date)}</TableCell>
                <TableCell component="th" scope="row">{trip.startTime}</TableCell>
                <TableCell component="th" scope="row">{trip.car?.licensePlate || "Не назначено"}</TableCell>
            </TableRow>
            <Dialog onClose={onCloseHandler} open={open}>
                <AdminTripCard {...trip}/>
            </Dialog>
        </>

    )
})