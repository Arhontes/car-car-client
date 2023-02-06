import React, {useCallback} from 'react';
import {PassengerType, UpdatePassengerDto} from "../../common/types/passengers-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {AdminTextField} from "./AdminTextField";
import AdminCheckbox from "./AdminCheckbox";

type AdminPassengerItemPropsType = {
    passenger:PassengerType
    removePassenger: (passengerId:string)=>void
    updatePassenger: (passengerId: string, updateDto: UpdatePassengerDto) => void
}

const AdminPassengerItem = ({passenger,removePassenger,...restProps}: AdminPassengerItemPropsType) => {

    const removeHandler = ()=>{
        removePassenger(passenger.passengerId!)
    }

    const updatePassenger = useCallback((updateDto:UpdatePassengerDto)=>{
        restProps.updatePassenger(passenger.passengerId!, updateDto)
    },[])

    return (
        <Grid container spacing={2} sx={{mt: 3, border: `1px solid black`}}>
            <Grid item xs={12} sm={6}>
                <Typography component={'span'} variant="body1" gutterBottom>Имя: {passenger.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography component={'span'} variant="body1" gutterBottom>Фамилия: {passenger.lastName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger}  name={"from"} label={"Откуда"} value={passenger.from!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger}  name={"to"} label={"Куда"} value={passenger.to!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField action={updatePassenger}  name={"phone"} label={"Телефон"} value={passenger.phone!}/>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Box sx={{display:"flex",alignItems:"flex-end",paddingTop:2}}>
                    <AdminCheckbox checked={passenger.approved!} label={"Поездка подтверждена: "}/>
                </Box>

            </Grid>
                <Box width={"max-content"}>
                    <Button>Изменить</Button>
                    <Button onClick={removeHandler}>Удалить</Button>
                </Box>



        </Grid>
    );
};

export default AdminPassengerItem;