import * as React from 'react';
import {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import {useAppSelector} from "../hooks/useAppSelector";
import {getAppErrorMessage} from "../selectors/app-selectors";
import {Alert} from "@mui/material";


export default function AppErrorSnackBar() {

    const errorMessage = useAppSelector(getAppErrorMessage)

    const [open,setOpen] = useState(!!errorMessage);

    useEffect(()=>{
        setOpen(!!errorMessage)
    },[errorMessage])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (

            <Snackbar
                anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
                open={open}
                onClose={handleClose}
                key={"errorbar"}
                autoHideDuration={4000}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
    );
}