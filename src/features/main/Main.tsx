import React from 'react';
import {Box} from "@mui/material";
import TripSearch from "./trip-search/TripSearch";
import Information from "./information/Information";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import AppErrorSnackBar from "../../common/components/AppErrorSnackBar";

const Main = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: '#cfe8fc',
            height: '100vh'
        }}>
            <Header/>
            <TripSearch/>
            <Information/>
            <AppErrorSnackBar/>
            <Footer/>
        </Box>
    );
};

export default Main;