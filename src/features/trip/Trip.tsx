import React from 'react';
import {Box, Button, Dialog, IconButton, Typography} from "@mui/material";
import {Trip} from "../../common/types/trip-types";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Paper from "@mui/material/Paper";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type TripPropsType = {
    trip: Trip | null
}

export const TripItem = (props: TripPropsType) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const splitedDirection = props.trip!.direction.split("-")
    const date = new Date(props!.trip!.date).toLocaleDateString()


    // @ts-ignore
    return (

        <Paper elevation={4} sx={{
            position: "relative",
            border: "1px solid black",
            borderRadius: 5,
            margin: 1,
            padding: 5,
            maxWidth: 150
        }}>

            <IconButton onClick={handleClickOpen} sx={{position: "absolute", top: 0, right: 0}} aria-label="more"
                        size="small">
                <MoreVertIcon fontSize="inherit"/>
            </IconButton>

            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Typography variant="overline" display="block" gutterBottom>
                        {splitedDirection[0]}
                    </Typography>
                    <ArrowRightAltIcon/>
                    <Typography variant="overline" display="block" gutterBottom>
                        {splitedDirection[1]}
                    </Typography>
                </Box>

                <Typography variant="overline" gutterBottom>
                    {`Дата поездки ${date}`}
                </Typography>
                <Typography variant="overline" gutterBottom>
                    {`Осталось мест ${7 - props.trip!.passengers!.length}`}
                </Typography>
            </Box>

            <Dialog sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}
                    onClose={handleClose} open={open}>

                <Box sx={{height: 300}}>

                </Box>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Button sx={{margin: 1}} variant="outlined">
                        Отменить
                    </Button>
                    <Button sx={{margin: 1}} variant="outlined">
                        Поменять машину
                    </Button>
                    <Button sx={{margin: 1}} variant="outlined">
                        Добавить пассажира
                    </Button>
                    <Button sx={{margin: 1}} variant="outlined">
                        изменить дату
                    </Button>
                    <Button sx={{margin: 1}} variant="outlined">
                        изменить время
                    </Button>
                </Box>

            </Dialog>
        </Paper>

    );
};

// <Typography variant="overline" display="block" gutterBottom>
//     {splitedDirection[0]}
// </Typography>
// <IconButton onClick={()=>{
//     direction==="Onega-Arkhangelsk"? setDirection("Arkhangelsk-Onega"): setDirection("Onega-Arkhangelsk")
// }} aria-label="switch-direction">
//     <ChangeCircleIcon />
// </IconButton>
// <Typography variant="overline" display="block" gutterBottom>
//     {splitedDirection[1]}
// </Typography>