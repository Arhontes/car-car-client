import React from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {getProfileData} from "../../common/selectors/profile-selectors";

const Profile = () => {

    const profile = useAppSelector(getProfileData) as any

    const props = [] as any[]


    for (const property in profile) {
        props.push(<div>{profile[property]}</div>)
    }
    return (
        <div>
            {props}
            {/*<div>{profile.email}</div>
            <div>{profile.phone}</div>
            <div>{profile.lastname}</div>
            <div>{profile.}</div>
            <div>{profile.email}</div>*/}
        </div>
    );
};

export default Profile;