import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Box, Container, Divider, ListItem, Paper, Stack, Typography} from "@mui/material";
import {TripSearch} from "../../features/main/trip-search/TripSearch";
import {useAppSelector} from "../hooks/useAppSelector";
import {getTrips} from "../selectors/admin-selectors";
import {Trip} from "../types/trip-types";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import {useState} from "react";



export const TripsList = () => {
    const [open, setOpen] = React.useState(true);

    const trips = useAppSelector(getTrips)

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


const CustomListItem = (props: Trip) => {

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

export const CustomTripCard = (props: Trip) => {
    const [elevation, setElevation] = useState(3)


    return (
        <Paper onMouseOut={()=>setElevation(3)} onMouseOver={()=>setElevation(10)} sx={{padding:4}} elevation={elevation}>
            <Typography variant={"body2"} sx={{textAlign:"center"}} width={"max-content"}>
                    Какой то хэдер с красивой картинокой и названием проекта
            </Typography>
            <Box sx={{display:"flex",flexDirection:"row",position:"relative",justifyContent:"space-between"}} >
                <Box sx={{margin:1}}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h6">{props.direction}</Typography>
                    </ThemeProvider>

                </Box>
                <Divider  orientation="vertical" flexItem />
                <Box sx={{margin:1}}>
                    <Typography variant="h6">Выезд в {props.startTime}</Typography>
                </Box>

            </Box>

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