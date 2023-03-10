import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorGetProfileData} from "../../common/selectors/profile-selectors";
import Grid from "@mui/material/Grid";
import FormTextField from "../../common/components/FormTextField";
import {validation, validationHelpers, validationMessages} from "../../common/constans/validation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {selectorGetAppStatus} from "../../common/selectors/app-selectors";
import {SubmitHandler, useForm} from "react-hook-form";
import {TripDirection, TripType} from "../../common/types/trip-types";
import {Paper, TextField} from "@mui/material";
import Destination from "../../common/components/Destination";
import {CreatePassengerDto} from "../../common/types/passengers-types";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {addPassengerTC} from "./passengers-slice";

export type AddPassengerFormType = {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    from: string,
    to: string,
}
type PropsType = {
    actionAfterSubmit?: ()=>void
    adminMode: boolean
    direction: TripDirection
    trip: TripType
}
const AddPassengerForm:React.FC<PropsType> = ({trip,direction,adminMode,...restProps}) => {
    const [open, setOpen] = useState(false)
    const [field, setField] = useState<"from" | "to">("from")

    const {email, firstName, lastName, phone, userId} = useAppSelector(selectorGetProfileData)
    const appStatus = useAppSelector(selectorGetAppStatus)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handleOpen = (field: "from" | "to") => {
        setField(field)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const [townFrom, townTo] = direction.split("-")

    const {
        control,
        handleSubmit,
        formState: {isValid},
        getValues,
        setValue
    } = useForm<AddPassengerFormType>({mode: "all"});

    const onSubmit: SubmitHandler<AddPassengerFormType> = (data, event) => {

        const passenger: CreatePassengerDto = {...data, userId: userId, tripId: trip!.tripId,date: trip.date }

        if (adminMode){
            dispatch(addPassengerTC(passenger))
            restProps.actionAfterSubmit&&restProps.actionAfterSubmit()
        }
        else {
            navigate("/trip/book", {
                state: {
                    passenger,
                    trip
                }
            })
        }
    };

    useEffect(() => {
        setValue("from", townFrom)
        setValue("to", townTo)
    }, [])

    return (
        <Paper>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{px: 3}}>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            label={"??????"}
                            defaultValue={firstName}
                            name={"firstName"}
                            rules={{
                                required: validationMessages.isRequired,
                                maxLength: validationHelpers.getMaxLengthMessage(20)
                            }}
                            control={control as any}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            label={"??????????????"}
                            defaultValue={lastName}
                            name={"lastName"}
                            rules={{
                                required: validationMessages.isRequired,
                                maxLength: validationHelpers.getMaxLengthMessage(20)
                            }}
                            control={control as any}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <FormTextField
                            type={"email"}
                            label={"Email"}
                            defaultValue={email}
                            name={"email"}
                            rules={{
                                required: validationMessages.isRequired,
                                pattern: {value: validation.email, message: validationMessages.incorrectEmail},
                                maxLength: validationHelpers.getMaxLengthMessage(50)
                            }}
                            control={control as any}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            label={"?????????? ????????????????"}
                            defaultValue={phone}
                            name={"phone"}
                            rules={{
                                required: validationMessages.isRequired,
                                pattern: {
                                    value: validation.phone,
                                    message: "????????????: 89103123167 ?????? +7-910-221-22-22 ?????? +7(910)-221-22-22"
                                },
                                maxLength: validationHelpers.getMaxLengthMessage(50)
                            }}
                            control={control as any}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={"????????????"}
                            spellCheck={false}
                            multiline
                            onClick={() => handleOpen("from")}
                            fullWidth
                            value={getValues('from') || townFrom}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={"????????"}
                            spellCheck={false}
                            multiline
                            onClick={() => handleOpen("to")}
                            fullWidth
                            value={getValues('to') || townTo}/>
                    </Grid>

                </Grid>

                <Button
                    disabled={!isValid || appStatus === "loading"}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    ????????????????????
                </Button>
            </Box>
            <Destination

                handleClose={handleClose}
                getValues={getValues}
                field={field}
                setOpen={setOpen}
                open={open}
                setValue={setValue}/>

        </Paper>

    );
};

export default AddPassengerForm;
