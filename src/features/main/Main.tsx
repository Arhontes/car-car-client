import React from 'react';
import {Box} from "@mui/material";
import {TripSearch} from "./trip-search/TripSearch";
import {useNavigate} from "react-router-dom";

const Main = () => {

    const navigate = useNavigate()

    return (
        <Box sx={{}}>
            <TripSearch navigateOption={() => navigate("searchresults")}/>
        </Box>
    );
};

export default Main;