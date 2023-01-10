import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import {Dialog, DialogContent} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type DialogAuthPropsType = {
    open:boolean
    handleCloseDialog:()=>void
    handleOpenDialog:()=>void
}



export default function DialogAuth(props:DialogAuthPropsType) {
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = ()=>{
        props.handleCloseDialog()
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby={"form-dialog-auth"} >

                <Box sx={{ width: '100%', top:"20%" }}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Войти" {...a11yProps(0)} />
                            <Tab label="Регистрация" {...a11yProps(1)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <SignIn />
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <SignUp/>
                    </TabPanel>

                </Box>

        </Dialog>

    );
}

