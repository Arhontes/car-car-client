import React from 'react';
import {UseControllerProps} from "react-hook-form/dist/types/controller";
import {Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";


const FormTextField = (props:UseControllerProps&{label:string}) => {

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
                    error={!!error}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    name={name}
                    label={props.label}
                    ref={ref}
                    helperText={error?.message}
                    margin="normal"
                    fullWidth
                />
            )}
        />
    );
};

export default FormTextField;