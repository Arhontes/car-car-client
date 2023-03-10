import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../common/selectors/profile-selectors";
import {selectorCheckIsAuth} from "../../common/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogContent} from "@mui/material";
import {ProfileMenu} from "./ProfileMenu";


const Profile = () => {

    const profile = useAppSelector(selectorGetProfileData) as any

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }
    const isAuth = useAppSelector(selectorCheckIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login', {replace: true})
        }
        !open && navigate("/")
    }, [open,isAuth])


    return (
        <Dialog
            onClose={handleClose}
            open={open}
            aria-labelledby="alert-dialog-profile"
            aria-describedby="alert-dialog-profile-description">
            <DialogContent>
                <ProfileMenu {...profile}/>
            </DialogContent>
        </Dialog>
    );
};

export default Profile;