import React from 'react';
import {IconButton, TableCell, TableHead, TableRow} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AdminTripsTableHeadPropsType = {
    handleOpen: ()=>void
}

const AdminTripsTableHead: React.FC<AdminTripsTableHeadPropsType> = ({handleOpen}) => {
    return (
        <TableHead>
            <TableRow key={"trip-admin-trips-table-head"}>
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
    );
};

export default AdminTripsTableHead;