import {TripType} from "../../common/types/trip-types";
import AdminPassengerItem from "./AdminPassengerItem";
import {PassengerType, UpdatePassengerDto} from "../../common/types/passengers-types";
import {Box, Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useAppDispatch} from "../../common/hooks/useAppDispatch";

type AdminPassengersListPropsType = {
    trip: TripType
    passengers: PassengerType[] | null
    removePassenger: (passengerId: string) => void
    updatePassenger: (passengerId: string, updateDto: UpdatePassengerDto) => void
}

export const AdminPassengersList = ({passengers,...restProps}: AdminPassengersListPropsType) => {



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
                passengers?.length! < 7 && <Button
                    sx={{marginTop: 3}}
                    variant="contained"
                    endIcon={<AddCircleOutlineIcon/>}
                >
                    Добавить
                </Button>
            }

        </Box>
    )
}