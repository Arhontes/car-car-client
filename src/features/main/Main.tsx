import React from 'react';
import {Box} from "@mui/material";
import {TripsSearch} from "../trips/TripsSearch";
import {useNavigate} from "react-router-dom";

const Main = () => {

    const navigate = useNavigate()

    return (
        <Box>
            <TripsSearch navigateOption={() => navigate("searchresults")}/>
        </Box>
    );
};

export default Main;