import React, {useState} from "react";
import {TripType} from "../../common/types/trip-types";
import {Dialog, TableCell, TableRow} from "@mui/material";
import {millisecondsToLocalDate} from "../../common/utils/millisecondsToLocalDate";
import {AdminTripCard} from "./AdminTripCard";

export const AdminTripTableRow = React.memo((props: TripType) => {
    const [open, setOpen] = useState(false)
    console.log("check props")
    console.dir(props)

    const onOpenHandler = () => {
        setOpen(true)
    }
    const onCloseHandler = () => {
        setOpen(false)
    }
    console.log("check direction")
    console.log(props.direction)
    return (
        <>
            <TableRow onClick={onOpenHandler} key={props.tripId}>
                <TableCell component="th" scope="row">{props.direction}</TableCell>
                <TableCell component="th" scope="row">{millisecondsToLocalDate(props.date)}</TableCell>
                <TableCell component="th" scope="row">{props.startTime}</TableCell>
                <TableCell component="th" scope="row">{props.car?.licensePlate || "Не назначено"}</TableCell>
            </TableRow>
            <Dialog onClose={onCloseHandler} open={open}>
                <AdminTripCard {...props}/>
            </Dialog>
        </>

    )
})