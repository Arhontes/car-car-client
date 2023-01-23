import * as React from 'react';
import {useState} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Box, Container, Divider, ListItem, Paper, Stack, Typography} from "@mui/material";
import {TripSearch} from "../../features/main/trip-search/TripSearch";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectorTrips} from "../selectors/admin-selectors";
import {TripType} from "../types/trip-types";
import {createTheme, responsiveFontSizes,} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";


export const TripsList = () => {
    const [open, setOpen] = React.useState(true);

    const trips = useAppSelector(selectorTrips)

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Container maxWidth="sm" sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <TripSearch navigateOption={() => {
            }}/>
            <Stack spacing={2}>
                {!trips?.length ? <div>Нет поездок на эту дату</div>
                    : trips?.map((el) => <CustomTripCard key={el.tripId} {...el}/>)
                }
            </Stack>
        </Container>

    );
}


const CustomListItem = (props: TripType) => {

    const itemText = `Маршрут - ${props.direction}, время выезда - ${props.startTime}, свободно мест - ${7 - props.passengers.length}`

    return (
        <ListItem component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={itemText}/>
            </ListItemButton>
        </ListItem>
    );
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const CustomTripCard = (props: TripType) => {

    const [elevation, setElevation] = useState(3)
    const navigate = useNavigate()
    const paramString = `/trip/${props.tripId}`

    const onClickHandler = () => {
        navigate(paramString)
    }

    return (
        <Paper onClick={onClickHandler} onMouseOut={() => setElevation(3)} onMouseOver={() => setElevation(10)} sx={{padding: 4}}
               elevation={elevation}>
            <Typography variant={"body2"} sx={{textAlign: "center"}} width={"max-content"}>
                Какой то хэдер с красивой картинокой и названием проекта
            </Typography>

            <Box sx={{display: "flex", flexDirection: "row", position: "relative", justifyContent: "space-between"}}>

                <Box sx={{margin: 1}}>
                    <Typography variant="h6">{props.direction}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem/>

                <Box sx={{margin: 1}}>
                    <Typography variant="h6">Выезд в {props.startTime}</Typography>
                </Box>

            </Box>
            <Typography variant="h6">{`Осталось мест: ${7-props.passengers.length}`}</Typography>
        </Paper>

    )
}
// <List
//     sx={{ width: '100%', bgcolor: 'background.paper' }}
//     component="nav"
//     aria-labelledby="nested-list-subheader"
// >
//
//     <ListItemButton onClick={handleClick}>
//
//         <ListItemText sx={{textAlign:"center"}} primary="Найти поездки" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//     </ListItemButton>
//
//     <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//             {!trips?.length ? "На данную дату поездок не найдено"
//                 : trips.map((el,index)=><CustomListItem key={index} {...el}/>)
//             }
//         </List>
//     </Collapse>
// </List>