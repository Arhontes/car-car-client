import {TripType} from "../../common/types/trip-types";
import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Container, Divider, Paper, Typography} from "@mui/material";

export const CustomTripCard = (props: TripType) => {

    const [elevation, setElevation] = useState(3)
    const navigate = useNavigate()
    const paramString = `/trip/${props.tripId}`

    const onClickHandler = () => {
        navigate(paramString)
    }

    return (
        <Container fixed>
            <Paper onClick={onClickHandler} onMouseOut={() => setElevation(3)} onMouseOver={() => setElevation(10)}
                   sx={{padding: 4}}
                   elevation={elevation}>
                <Typography variant={"body2"} sx={{textAlign: "center"}} width={"max-content"}>
                    Какой то хэдер с красивой картинокой и названием проекта
                </Typography>

                <Box
                    sx={{display: "flex", flexDirection: "row", position: "relative", justifyContent: "space-between"}}>

                    <Box sx={{margin: 1}}>
                        <Typography variant="h6">{props.direction}</Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem/>

                    <Box sx={{margin: 1}}>
                        <Typography variant="h6">Выезд в {props.startTime}</Typography>
                    </Box>

                </Box>
                <Typography variant="h6">{`Осталось мест: ${7 - props.passengers.length}`}</Typography>
            </Paper>
        </Container>


    )
}