import * as React from 'react';
import {useEffect} from 'react';
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import SignIn from "../auth/sign-in/SignIn";
import SignUp from "../auth/sign-up/SignUp";
import AppErrorSnackBar from "../../common/components/AppErrorSnackBar";
import Profile from "../profile/Profile";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {checkIsAppInitialize} from "../../common/selectors/app-selectors";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import Header from "../main/header/Header";
import TripSearch from "../main/trip-search/TripSearch";
import Information from "../main/information/Information";
import Footer from "../main/footer/Footer";
import {initializeAppTC} from "./appSlice";
import {VWCircular} from "../../common/components/CircularProgress";

export const App = () => {

    const dispatch = useAppDispatch()
    const isInitialize = useAppSelector(checkIsAppInitialize)

   useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    return (


        <Container fixed>

            <Box sx={{
                margin:0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: '#f1f1f1',
                minHeight: '100vh'
            }}>

                {!isInitialize ?
                    <Box sx={{alignSelf:"center"}}><VWCircular/></Box>
                    : <>
                        <Header/>

                        <Routes>
                            <Route index element={<TripSearch/>}/>
                            <Route path={'login'} element={<SignIn/>}/>
                            <Route path={'register'} element={<SignUp/>}/>
                            <Route path={'profile'} element={<Profile/>}/>
                        </Routes>

                        <Information/>

                        <Footer/>
                    </>
                }
                <AppErrorSnackBar/>
            </Box>

        </Container>
    );
}



