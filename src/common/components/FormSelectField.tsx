import React, {HTMLInputTypeAttribute} from 'react';
import {Controller} from "react-hook-form";
import {UseControllerProps} from "react-hook-form/dist/types/controller";
import {Dialog, MenuItem} from "@mui/material";

export type FormSubjectFieldType = { town: string, label?: string, type?: HTMLInputTypeAttribute } & UseControllerProps

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


const FormSubjectField = ({control, name, rules, defaultValue}: UseControllerProps) => {


    return (
        <Controller name={name} control={control}
                    render={
                        ({field, fieldState, formState}) => {
                            return (
                                <div>
                                    {}
                                </div>
                            )
                        }}
        />
    );
};


/*fullWidth={true}
select={props.town === "Arkhangelsk"}
label={props.label}
defaultValue={""}
helperText={""}*/
{
    currencies.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    ))
}


export default FormSubjectField;

const AddressForm = (props: {
    onChange: (...event: any[]) => void
    open: boolean,
    handleClose: () => void
}) => {

    return (
        <Dialog onClose={props.handleClose} open={props.open}>

        </Dialog>
    )

}

// <AddressForm open={open} id={id} handleClose={handleClose}/>
// <TextField
//     type={props.type}
//     error={!!error}
//     onBlur={onBlur}
//     onChange={onChange}
//     value={value}
//     name={name}
//     label={props.label}
//     ref={ref}
//     helperText={error?.message}
//     margin="normal"
//     fullWidth
// />