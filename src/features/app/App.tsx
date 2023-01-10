import * as React from 'react';
import {Container, LinearProgress} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Main from "../main/Main";
import SignIn from "../auth/sign-in/SignIn";
import SignUp from "../auth/sign-up/SignUp";
import AppErrorSnackBar from "../../common/components/AppErrorSnackBar";
import Profile from "../profile/Profile";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {getAppStatus} from "../../common/selectors/app-selectors";
import {useEffect} from "react";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {authMeTC} from "../auth/auth-slice";
import {authAPI} from "../auth/auth-api";

export const App = () => {

    const appStatus = useAppSelector(getAppStatus)
    const dispatch = useAppDispatch()


    useEffect(()=>{
        dispatch(authMeTC())
    },[])

    const someFunc = () =>{
        authAPI.refresh()
    }
    return (

        <Container fixed>
            <button onClick={someFunc}> click here to disturb</button>
            {appStatus==="loading"&&<Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>}
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={'login'} element={<SignIn/>}/>
                <Route path={'register'} element={<SignUp/>}/>
                <Route path={'profile'} element={<Profile/>}/>
            </Routes>
            <AppErrorSnackBar/>
        </Container>
    );
}



