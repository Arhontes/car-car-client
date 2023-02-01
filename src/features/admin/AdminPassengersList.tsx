import {TripType} from "../../common/types/trip-types";
import AdminPassengerItem from "./AdminPassengerItem";
import {PassengerType} from "../../common/types/passengers-types";
import {Box, Button} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AdminPassengersListPropsType = {
    trip: TripType
    passengers: PassengerType[] | null
    removePassengerHandler: (passengerId: string) => void
}

export const AdminPassengersList = ({passengers, removePassengerHandler}: AdminPassengersListPropsType) => {


    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {
                passengers?.length
                    ?
                    passengers.map(passenger => <AdminPassengerItem
                        removePassengerHandler={removePassengerHandler}
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