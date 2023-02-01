import React from 'react';
import {PassengerType} from "../../common/types/passengers-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Button, Checkbox} from "@mui/material";
import Box from "@mui/material/Box";
import {AdminTextField} from "./AdminTextField";
import AdminCheckbox from "./AdminCheckbox";

type AdminPassengerItemPropsType = {
    passenger:PassengerType
    removePassengerHandler: (passengerId:string)=>void
}

const AdminPassengerItem = ({passenger,removePassengerHandler}: AdminPassengerItemPropsType) => {


    const removeHandler = ()=>{
      removePassengerHandler(passenger.passengerId!)
    }

    return (
        <Grid container spacing={2} sx={{mt: 3, border: `1px solid black`}}>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>Имя: {passenger.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>Фамилия: {passenger.lastName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
                <AdminTextField label={"Откуда"} value={passenger.from!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField label={"Куда"} value={passenger.to!}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AdminTextField label={"Телефон"} value={passenger.phone!}/>
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