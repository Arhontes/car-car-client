import React, {useEffect} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../common/selectors/profile-selectors";
import {checkIsAuth} from "../../common/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Tab, Tabs, Typography} from "@mui/material";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {AdminTripItem} from "./AdminTripItem";
import {selectorTrips} from "../../common/selectors/trips-selectors";
import {getTripsTC} from "../trips/trip-slice";

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

export const Admin = () => {

    const isAuth = useAppSelector(checkIsAuth)
    const profile = useAppSelector(selectorGetProfileData)
    const navigate = useNavigate()
    const trips = useAppSelector(selectorTrips)
    const dispatch = useAppDispatch()

    /* useEffect(() => {
         !isAuth&&navigate("/login",{
             replace:true})
     }, [isAuth])*/


    useEffect(() => {
        if (profile.userId) dispatch(getTripsTC({userId: profile.userId}))
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Поездки" {...a11yProps(0)} />
                    <Tab label="Машины" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>

                <Box sx={{
                    maxHeight: 400,
                    width: '100%',
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    overflow: "scroll"
                }}>
                    {trips && trips.map(trip => <AdminTripItem {...trip}/>)}
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Машины
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
};

