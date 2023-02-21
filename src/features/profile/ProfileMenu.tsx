import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ProfileInfo} from "./ProfileInfo";
import ProfileTrips from "./ProfileTrips";
import {UserType} from "../../common/types/profile-types";

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
                    <Typography component={'span'} >{children}</Typography>
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


export const ProfileMenu = (props: UserType) => {

    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Пользователь" {...a11yProps(0)} />
                    <Tab label="Поездки" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <ProfileInfo {...props}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfileTrips userId={props.userId!}/>
            </TabPanel>

        </Box>
    );
};
