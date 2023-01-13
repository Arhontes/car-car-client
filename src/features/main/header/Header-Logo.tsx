import React from 'react';
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Typography from "@mui/material/Typography";

const HeaderLogo = () => {
    return (
        <>
            <AirportShuttleIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>

            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                CAR-CAR
            </Typography>
        </>
    );
};

export default HeaderLogo;