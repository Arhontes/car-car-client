import React from 'react';
import {Box, Dialog, MenuItem, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm, UseFormGetValues, UseFormSetValue} from "react-hook-form";
import {AddPassengerFormType} from "../../features/trip/AddPassengerFrom";
import Grid from "@mui/material/Grid";
import FormTextField from "./FormTextField";
import {validationHelpers, validationMessages} from "../constans/validation";
import Button from "@mui/material/Button";

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
        value: 'Архангельск',
        label: 'Архангельск',
    },
    {
        value: 'Другое',
        label: 'Другое',
    },
];

type DestinationPropsType = {
    open: boolean
    field: "from" | "to"
    setOpen: (value: boolean) => void
    setValue: UseFormSetValue<AddPassengerFormType>
    getValues: UseFormGetValues<AddPassengerFormType>
    handleClose: () => void
}

const Destination = ({open, setOpen, getValues, ...restProps}: DestinationPropsType) => {


    return (
        <Dialog onClose={() => setOpen(false)} open={open}>
            <AddressForm
                field={restProps.field}
                handleClose={restProps.handleClose}
                setValue={restProps.setValue}/>
        </Dialog>
    );
};

export default Destination;


type AddressType = {
    town: string,
    street: string,
    entrance: string,
    house: string,
    other: string
}

export const AddressForm = (props: {
    setValue: UseFormSetValue<AddPassengerFormType>
    handleClose: () => void
    field: "from" | "to"
}) => {

    const {
        control,
        handleSubmit,
        watch,
        formState: {isValid},
    } = useForm<AddressType>({mode: "all"});

    const onSubmit: SubmitHandler<AddressType> = (data, event) => {

        if (data['house']) {
            data['house'] = `дом ${data['house']}`
        }
        if (data['entrance']) {
            data['entrance'] = `подъезд ${data['entrance']}`
        }

        let address = ""

        Object.keys(data).forEach(key => {
            if (data[key as keyof typeof data]) {
                address += `${data[key as keyof typeof data]},`
            }
        })

        props.setValue(props.field, address.slice(0, -1))
        props.handleClose()
    }

    const isOnega = watch("town")?.toString() === "Онега"

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{px: 3}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name={"town"}
                        render={({
                                     field: {onChange, onBlur, value, name, ref},
                                     fieldState: {error},
                                 }) => (

                            <TextField
                                select
                                error={!!error}
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                name={name}
                                label={"Выбери населенный пункт"}
                                ref={ref}
                                helperText={error?.message}
                                margin="normal"
                                fullWidth>
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    {isOnega && <>
                        <Grid item xs={12}>
                            <FormTextField
                                label={"Улица"}
                                defaultValue={""}
                                name={"street"}
                                rules={{
                                    required: validationMessages.isRequired,
                                    maxLength: validationHelpers.getMaxLengthMessage(20)
                                }}
                                control={control as any}/>

                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                label={"Номер дома"}
                                defaultValue={""}
                                name={"house"}
                                control={control as any}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextField
                                label={"Подъезд"}
                                defaultValue={""}
                                name={"entrance"}
                                control={control as any}/>
                        </Grid>
                    </>
                    }
                    <Grid item xs={12}>
                        <FormTextField
                            label={"Дополнительно"}
                            defaultValue={""}
                            name={"other"}

                            control={control as any}/>
                    </Grid>
                </Grid>


            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Подвердить
            </Button>
        </Box>
    )
}
