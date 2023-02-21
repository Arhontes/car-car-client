import React from 'react';
import {TableBody} from "@mui/material";
import {AdminTripTableRow} from "./AdminTripTableRow";
import {TripType} from "../../../../common/types/trip-types";

type AdminTripsTableBodyPropsType = {
    trips: TripType[]
    removeTrip: (tripsId: string) => void
}

const AdminTripsTableBody: React.FC<AdminTripsTableBodyPropsType> = ({trips, removeTrip}) => {
    return (
        <TableBody>
            {
                trips?.length
                    ? trips.map(trip =>
                        <AdminTripTableRow trip={trip} removeTrip={removeTrip} key={trip.tripId}/>)

                    : <tr key={"none"}>
                        <td>Не найдено</td>
                    </tr>
            }
        </TableBody>
    );
};

export default AdminTripsTableBody;