import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {UserType} from "../../common/types/common-types";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

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


const ProfileInfo = ({phone, email, lastName, firstName}: UserType)=> {
    const [disabled, setDisabled] = React.useState(true);
    const changeDisabled = () => {
        setDisabled(!disabled)
    }

    return (

        <Box flexDirection={"column"} display={"flex"}>
            <TextField margin="dense" value={firstName||""} label="Имя" variant="outlined" disabled={disabled}/>
            <TextField margin="dense" value={lastName||""} label="Фамилия" variant="outlined" disabled={disabled}/>
            <TextField margin="dense" value={phone||""} label="Телефон" variant="outlined" disabled={disabled}/>
            <TextField margin="dense" value={email||""} label="Email" variant="outlined" disabled={disabled}/>
            <IconButton onClick={changeDisabled} color="primary" aria-label="edit profile ">
                <EditRoundedIcon/>
            </IconButton>
        </Box>
    )

}


export const ProfileDialog = (props: UserType) => {

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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ab amet, distinctio dolorum eius eos
                excepturi expedita facere ipsam optio porro
                sunt temporibus. Beatae, doloribus ea eum
                nulla odio ut voluptatibus!
            </TabPanel>

        </Box>
    );
};
