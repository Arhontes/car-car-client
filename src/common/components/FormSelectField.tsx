import React from 'react';
import {UseControllerProps} from "react-hook-form/dist/types/controller";
import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";

export type FormTextFieldType = {children:React.ReactNode,label:string} & UseControllerProps

export const FormSelectField = (props:FormTextFieldType) => {

    return (
        <Controller
            defaultValue={props.defaultValue}
            rules={props.rules}
            control={props.control}
            name={props.name}
            render={({
                         field: { onChange, onBlur, value, name, ref },
                         fieldState: { error},
                     }) => (

                <TextField
                    label={props.label}
                    select
                    error={!!error}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    name={name}
                    ref={ref}
                    helperText={error?.message}
                    margin="normal"
                    fullWidth
                    children={props.children}
                />
            )}
        />
    );
};

