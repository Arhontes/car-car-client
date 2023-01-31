import React from 'react';
import {TripType} from "../../common/types/trip-types";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {AdminPassengersCardForm} from "./AdminPassengersCardForm";
import {AdminTripCardForm} from "./AdminTripCardForm";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
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

export const AdminTripCard = (props: TripType) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Основные" {...a11yProps(0)} />
                    <Tab label="Пассажиры" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AdminTripCardForm {...props}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AdminPassengersCardForm {...props}/>
            </TabPanel>

        </Box>
    );
};

