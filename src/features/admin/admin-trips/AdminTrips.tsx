import React, {useCallback, useEffect, useState} from 'react';
import {TripsSearch} from "../../trips/TripsSearch";
import {CreateTripDto} from "../../../common/types/trip-types";
import {createTripTC, getTripsTC, removeTripTC} from "../../trips/trip-slice";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../../common/selectors/profile-selectors";
import {AdminTripMain} from "./trip-panel/main/AdminTripMain";
import {Box, Dialog} from "@mui/material";
import {selectorGetTrips} from "../../../common/selectors/trips-selectors";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import {getCarsTC} from "../../cars/cars-slice";
import {AdminTripsTable} from "./admin-trips-table/AdminTripsTable";

export const AdminTrips = () => {

    const [open,setOpen] = useState(false)
    const handleOpen = ()=>{
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }


    const profile = useAppSelector(selectorGetProfileData)
    const trips = useAppSelector(selectorGetTrips)

    const dispatch = useAppDispatch()


    const  createTripHandler = useCallback((createTripDto:CreateTripDto)=>{
        dispatch(createTripTC(createTripDto))
    },[dispatch])

    const removeTripHandler = useCallback((tripId:string) =>{
        dispatch(removeTripTC(tripId))
    },[dispatch])


    useEffect(() => {
        dispatch(getTripsTC({userId: profile.userId!}))
        if (profile.userId){
            dispatch(getCarsTC({userId: profile.userId}))
        }
    }, [])

    return (
        <div>
            <TripsSearch navigateOption={() => {
            }}/>

            <AdminTripsTable
                trips={trips}
                removeTrip={removeTripHandler}
                handleOpen={handleOpen}/>

            <Dialog onClose={handleClose} open={open}>
                <Box sx={{m:3}}>
                    <AdminTripMain
                        userId={profile.userId!}
                        purpose={"create"}
                        createTrip={createTripHandler}/>
                </Box>


            </Dialog>
        </div>
    );
};

