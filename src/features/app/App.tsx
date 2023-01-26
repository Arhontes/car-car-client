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
import Footer from "../main/footer/Footer";
import {initializeAppTC} from "./appSlice";
import {VWCircular} from "../../common/components/CircularProgress";
import {Admin} from '../admin/Admin';
import Main from "../main/Main";
import {TripsList} from "../trip/TripsList";
import Trip from '../trip/Trip';
import vw from '../../common/assets/vw.png'

export const App = () => {

    const dispatch = useAppDispatch()
    const isInitialize = useAppSelector(checkIsAppInitialize)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    console.log("isInitialize"+ " " + isInitialize)
    return (


        <Container fixed>

            <Box sx={{
                margin: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: isInitialize ? "space-between" : "space-around",
                bgcolor: '#f1f1f1',
                minHeight: '100vh',
            }}>

                {!isInitialize ?
                    <Box sx={{alignSelf: "center"}}>
                        <VWCircular/>
                    </Box>
                    : <>
                        <Header/>

                        <Routes>
                            <Route index element={<Main/>}/>
                            <Route path={'admin'} element={<Admin/>}/>
                            <Route path={'login'} element={<SignIn/>}/>
                            <Route path={'register'} element={<SignUp/>}/>
                            <Route path={'profile'} element={<Profile/>}/>
                            <Route path={'searchresults'} element={<TripsList/>}/>
                            <Route path={'trip/:tripId'} element={<Trip/>}/>


                        </Routes>

                        {/*<Information/>*/}

                        <Footer/>
                    </>
                }
                <AppErrorSnackBar/>
            </Box>

        </Container>
    );
}


/*backgroundImage: `url(${vw})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",*/
