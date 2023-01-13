import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {getProfileData} from "../../common/selectors/profile-selectors";
import {checkIsAuth} from "../../common/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogContent} from "@mui/material";
import {ProfileDialog} from "./ProfileDialog";


const Profile = () => {

    const profile = useAppSelector(getProfileData) as any

    const [open,setOpen] = useState(true)

    const handleClose = ()=>{
        setOpen(false)
    }
    const isAuth = useAppSelector(checkIsAuth)
    const navigate = useNavigate()
    useEffect(()=>{
        !open && navigate("/")
    },[open])

    if (!isAuth){
        navigate('login')
    }
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            aria-labelledby="alert-dialog-profile"
            aria-describedby="alert-dialog-profile-description">
            <DialogContent>
                <ProfileDialog {...profile}/>
            </DialogContent>
        </Dialog>
    );
};

export default Profile;