import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import vwLogo from "../assets/vwLogo.png";
import {Avatar} from '@mui/material';


export const VWCircular = () => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex'}}>
            <CircularProgress sx={{position:"absolute",top:0,left:0}} variant="indeterminate"  size={300} />
            <Avatar sx={{ width: 300, height: 300}} src={vwLogo}/>
        </Box>
    );
};

