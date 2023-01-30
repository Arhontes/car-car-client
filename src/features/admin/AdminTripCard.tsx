import React from 'react';
import {TripType} from "../../common/types/trip-types";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import Grid from "@mui/material/Grid";
import FormTextField from "../../common/components/FormTextField";
import {validationHelpers, validationMessages} from "../../common/constans/validation";
import Button from "@mui/material/Button";
import {registerTC} from "../auth/auth-slice";

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
                Пассажиры
            </TabPanel>

        </Box>
    );
};

type AdminTripCardFormType = {
    direction: "Arkhangels-Onega"|"Onega-Arkhangels"
}


const AdminTripCardForm = (props:TripType) => {

    const {control, handleSubmit, formState: {isValid}, getValues} = useForm<AdminTripCardFormType>({mode: "all"})
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<AdminTripCardFormType> = data => {
        console.log(data)
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField
                        label={"Направление"}
                        defaultValue={props.direction}
                        name={"direction"}
                        control={control as any}/>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Подтвердить
                </Button>
            </Grid>
        </Box>
    )
}