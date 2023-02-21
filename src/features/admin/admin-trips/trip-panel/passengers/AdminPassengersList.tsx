import {TripType} from "../../../../../common/types/trip-types";
import {PassengerType, UpdatePassengerDto} from "../../../../../common/types/passengers-types";
import {Box, Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {AdminPassengerItem} from "./AdminPassengerItem";
import {useState} from "react";
import AddPassengerForm from "../../../../passengers/AddPassengerForm";

type AdminPassengersListPropsType = {
    trip: TripType
    passengers: PassengerType[] | null
    removePassenger: (passengerId: string) => void
    updatePassenger: (passengerId: string, updateDto: UpdatePassengerDto) => void
}

export const AdminPassengersList = ({passengers,...restProps}: AdminPassengersListPropsType) => {

    console.log("list")
    const [open,setOpen] = useState(false)

    const handleClose = ()=>{
        setOpen(false)
    }
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {
                passengers?.length
                    ? passengers.map(passenger => <AdminPassengerItem
                        key={passenger.passengerId}
                        updatePassenger={restProps.updatePassenger}
                        removePassenger={restProps.removePassenger}
                        passenger={passenger}/>)
                    : <div>
                        Пассажиров нет
                    </div>
            }

            {
                passengers?.length! < 7 && <Button onClick={()=>setOpen(!open)}
                    sx={{marginTop: 3}}
                    variant="contained"
                    endIcon={<AddCircleOutlineIcon/>}
                >
                    Добавить
                </Button>
            }
            {
                open && <AddPassengerForm
                    actionAfterSubmit={handleClose}
                    adminMode={true}
                    trip={restProps.trip}
                    direction={restProps.trip.direction} />
            }

        </Box>
    )
}