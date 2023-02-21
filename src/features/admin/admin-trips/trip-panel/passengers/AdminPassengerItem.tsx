import React, {useCallback} from 'react';
import {PassengerType, UpdatePassengerDto} from "../../../../../common/types/passengers-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import {AdminTextField} from "../../../common/AdminTextField";
import {AdminCheckbox} from "../../../common/AdminCheckbox";
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
    passenger: PassengerType
    removePassenger: (passengerId: string) => void
    updatePassenger: (passengerId: string, updateDto: UpdatePassengerDto) => void
}

export const AdminPassengerItem = ({passenger, removePassenger, ...restProps}: PropsType) => {

    const removeHandler = useCallback(() => {
        removePassenger(passenger.passengerId!)
    }, [])

    const updatePassenger = useCallback((updateDto: UpdatePassengerDto) => {
        restProps.updatePassenger(passenger.passengerId!, updateDto)
    }, [])
    const onCheckedHandler = (approved: boolean) => {
        restProps.updatePassenger(passenger.passengerId!, {approved})
    }
    return (
        <Grid container spacing={2} sx={{mt: 3, border: `1px solid black`, position: "relative"}}>
            <Grid item xs={12} sm={6}>
                <Typography component={'span'} variant="body1" gutterBottom>Имя: {passenger.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography component={'span'} variant="body1" gutterBottom>Фамилия: {passenger.lastName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger} name={"from"} label={"Откуда"} value={passenger.from!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger} name={"to"} label={"Куда"} value={passenger.to!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger} name={"phone"} label={"Телефон"} value={passenger.phone!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger} name={"reservedTime"} label={"Время посадки"}
                                value={passenger.reservedTime!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box sx={{display: "flex", alignItems: "flex-end", paddingTop: 2}}>
                    <AdminCheckbox onChange={onCheckedHandler} checked={passenger.approved!}
                                   label={"Поездка подтверждена: "}/>
                </Box>
            </Grid>
            <IconButton color={"error"} sx={{position: "absolute", top: 0, right: 0}} aria-label="delete" size="large">
                <DeleteIcon/>
            </IconButton>
        </Grid>
    );
};
