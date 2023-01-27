import React, {useEffect} from 'react';
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetTrips} from "../../common/selectors/trips-selectors";
import {getPassengersTC} from "../passengers/passengers-slice";
import {selectorGetPassengersList} from "../../common/selectors/passengers-selectors";

type ProfileTripsPropsType = {
    userId:string
}

const ProfileTrips = ({userId}:ProfileTripsPropsType) => {

    const passengers = useAppSelector(selectorGetPassengersList)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getPassengersTC({userId}))
    },[])
    return (
        <div>
            {passengers?.length&&passengers.map(el=><div>{el.tripId}</div>)}
            </div>
    );
};

export default ProfileTrips;