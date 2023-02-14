import React, {useCallback, useEffect} from 'react';
import {TripType, UpdateTripDto} from "../../common/types/trip-types";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {AdminPassengersList} from "./AdminPassengersList";
import {AdminTripCardForm} from "./AdminTripCardForm";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetPassengersList} from "../../common/selectors/passengers-selectors";
import {getPassengersTC, removePassengerTC, updatePassengerTC} from "../passengers/passengers-slice";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {UpdatePassengerDto} from "../../common/types/passengers-types";
import {updateTripTC} from "../trips/trip-slice";
import {getCarsTC} from "../cars/cars-slice";
import {selectorGetCars} from "../../common/selectors/cars-selectors";
import AdminTripCar from "./AdminTripCar";
import {Car} from "../../common/types/cars-types";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const AdminTripCard = (props: TripType) => {

    const [value, setValue] = React.useState(0);
    const dispatch = useAppDispatch()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const passengers = useAppSelector(selectorGetPassengersList)
    const cars = useAppSelector(selectorGetCars)

    //trip actions
    const updateTrip = useCallback((tripId: string, updateDto: UpdateTripDto) => {
        dispatch(updateTripTC({tripId, updateDto}))
    }, [])

    //passengers actions
    const updatePassenger = useCallback((passengerId: string, updateDto: UpdatePassengerDto) => {
        dispatch(updatePassengerTC({passengerId, updateDto}))
    }, [dispatch])
    const removePassenger = useCallback((passengerId: string) => {
        dispatch(removePassengerTC(passengerId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getPassengersTC({tripId: props.tripId}))
        dispatch(getCarsTC({userId: props.userId}))
    }, [props.tripId])

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Основные" {...a11yProps(0)} />
                    <Tab label="Пассажиры" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AdminTripCardForm cars={cars} trip={props} updateTrip={updateTrip}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AdminPassengersList
                    updatePassenger={updatePassenger}
                    passengers={passengers}
                    trip={props}
                    removePassenger={removePassenger}/>
            </TabPanel>
        </Box>
    );
};

