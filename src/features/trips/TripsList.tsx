import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {TripsSearch} from "./TripsSearch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetTrips} from "../../common/selectors/trips-selectors";
import {CustomTripCard} from "./CustomTripCard";


export const TripsList = () => {

    const trips = useAppSelector(selectorGetTrips)

    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center",alignItems:"center"}}>
            <TripsSearch navigateOption={() => {}}/>
            <Stack spacing={2}>
                {!trips?.length ? <div>Нет поездок на эту дату</div>
                    : trips?.map((el) => <CustomTripCard key={el.tripId} {...el}/>)
                }
            </Stack>
        </Box>

    );
}

