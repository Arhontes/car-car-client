import React, {useState} from 'react';
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {selectorProfileData} from "../../common/selectors/profile-selectors";
import Grid from "@mui/material/Grid";
import FormTextField from "../../common/components/FormTextField";
import {validation, validationHelpers, validationMessages} from "../../common/constans/validation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {getAppStatus} from "../../common/selectors/app-selectors";
import {SubmitHandler, useForm} from "react-hook-form";
import {TripDirection} from "../../common/types/trip-types";
import FormSelectField from "../../common/components/FormSelectField";
import {Dialog, MenuItem, Select, TextField} from "@mui/material";
import Destination from "../../common/components/Destination";

const currencies = [
    {
        value: 'Онега',
        label: 'Онега',
    },
    {
        value: 'Кянда',
        label: 'Кянда',
    },
    {
        value: 'Тамица',
        label: 'Тамица',
    },
    {
        value: 'Cеверодвинск',
        label: 'Cеверодвинск',
    },
    {
        value: 'Архангелсьск',
        label: 'Архангелсьск',
    },
    {
        value: 'Другое',
        label: 'Другое',
    },
];

export type AddPassengerFormType = {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    from: string,
    to: string,
}
type AddPassengerFromPropsType = {
    direction: TripDirection

}
const AddPassengerFrom = ({direction}: AddPassengerFromPropsType) => {
    const [open,setOpen] = useState(false)
    const [field,setField] = useState<"from"|"to">("from")

    const {email, firstName, lastName, phone} = useAppSelector(selectorProfileData)
    const appStatus = useAppSelector(getAppStatus)

    const dispatch = useAppDispatch()

    const [townFrom, townTo] = direction.split("-")

    const handleOpen = (field:"from"|"to")=>{
        setField(field)
        setOpen(true)
    }
    const handleClose = ()=>{
        setOpen(false)
    }

    const {control, handleSubmit, formState: {isValid}, getValues,setValue} = useForm<AddPassengerFormType>({mode: "all"});

    const onSubmit: SubmitHandler<AddPassengerFormType> = (data,event) => {
        event?.preventDefault()
        event?.stopPropagation()
        event?.isPropagationStopped()
        console.log(data)
    };
    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{px: 3}}>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField
                            label={"Имя"}
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
                            label={"Фамилия"}
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
                            label={"Номер телефона"}
                            defaultValue={phone}
                            name={"phone"}
                            rules={{
                                required: validationMessages.isRequired,
                                pattern: {
                                    value: validation.phone,
                                    message: "Пример: 89103123167 или +7-910-221-22-22 или +7(910)-221-22-22"
                                },
                                maxLength: validationHelpers.getMaxLengthMessage(50)
                            }}
                            control={control as any}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField multiline onClick={() =>  handleOpen("from")} fullWidth value={getValues('from')}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField spellCheck={false} multiline onClick={() => handleOpen("to")} fullWidth value={getValues('to')}/>
                    </Grid>

                </Grid>

                <Button
                    disabled={!isValid || appStatus === "loading"}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Подвердить
                </Button>



            </Box>
            <Destination handleClose={handleClose} getValues={getValues} field={field} setOpen={setOpen} open={open} setValue={setValue}/>
        </>

    );
};

export default AddPassengerFrom;
