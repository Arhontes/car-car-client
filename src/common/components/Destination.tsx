import React, {useState} from 'react';
import {
    Box,
    Dialog,
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {Controller, SubmitHandler, useForm, UseFormGetValues, UseFormSetValue} from "react-hook-form";
import {AddPassengerFormType} from "../../features/trip/AddPassengerFrom";
import Grid from "@mui/material/Grid";
import FormTextField from "./FormTextField";
import {validationHelpers, validationMessages} from "../constans/validation";
import {watch} from "fs/promises";
import Button from "@mui/material/Button";
import {Simulate} from "react-dom/test-utils";
import loadedData = Simulate.loadedData;
import {isAllOf} from "@reduxjs/toolkit";

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

type DestinationPropsType = {
    open: boolean
    field: "from" | "to"
    setOpen: (value: boolean) => void
    setValue: UseFormSetValue<AddPassengerFormType>
    getValues: UseFormGetValues<AddPassengerFormType>
    handleClose:()=>void
}

const Destination = ({open, setOpen, getValues, ...restProps}: DestinationPropsType) => {


    return (
        <Dialog onClose={() => setOpen(false)} open={open}>

            {restProps.field === "from"
                ? <FromForm getValues={getValues} setValue={restProps.setValue}/>
                : <ToForm handleClose={restProps.handleClose} setValue={restProps.setValue}/>
            }

        </Dialog>
    );
};

export default Destination;


export const FromForm = (props: {
    setValue: UseFormSetValue<AddPassengerFormType>
    getValues: UseFormGetValues<AddPassengerFormType>
}) => {

    const [value, setValue] = useState(props.getValues("from"))

    const onChangeHandler = (event: SelectChangeEvent<unknown>) => {
        const selectedValue = event.target.value as string
        props.setValue("from", selectedValue)
        setValue(selectedValue)
    }

    return (
        <FormControl margin="normal"
                     color="primary"
                     variant="filled"
                     sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', p: 5}}>
            <FormGroup row sx={{justifyContent: 'space-around'}}>
                <Box>
                    <InputLabel id="from-select">Выберите пункт отправки</InputLabel>
                    <Select
                        value={value}
                        label={"Выберите пункт отправки"}
                        onChange={onChangeHandler}
                        id={"from-select"}
                        MenuProps={{
                            PaperProps: {sx: {maxHeight: 200}}
                        }}>

                        {currencies.map((el) => (
                            <MenuItem key={el.value} value={el.value}>
                                {el.label}
                            </MenuItem>
                        ))}

                    </Select>
                </Box>

            </FormGroup>
        </FormControl>
    )
}

type AddressType = {
    town: string,
    street: string,
    entrance: number,
    house: string,
    other:string
}

export const ToForm = (props: {
    setValue: UseFormSetValue<AddPassengerFormType>
    handleClose:()=>void
}) => {

    const {control, handleSubmit,watch, formState: {isValid}, getValues, setValue} = useForm<AddressType>({mode: "all"});

    const onSubmit: SubmitHandler<AddressType> = (data,event) => {

        data['house'] = `дом ${data['house']}`

        let address = ""

        Object.keys(data).forEach(key=>{
            if (data[key as keyof typeof data]){
                address += `${data[key as keyof typeof data].toString()},`
            }
        })

        props.setValue("to",address.slice(0,-1))

        props.handleClose()
    }

    const isOnega = watch("town")?.toString()==="Онега"

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
                                type={"number"}
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

const DestinationDialog = () => {
    return (
        <div>

        </div>
    )
}