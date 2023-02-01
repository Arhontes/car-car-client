import React, {useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

type AdminTextFieldPropsType = {
    value: string
    label:string
}

export const AdminTextField = (props: AdminTextFieldPropsType) => {
    const [value, setValue] = useState(props.value)
    const [disabled, setDisabled] = useState(true)
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onBlurHandler = () => {
        setDisabled(true)

    }
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setDisabled(true)
        }
    }

    return (
        <TextField
            label={props.label}
            variant={"standard"}
            onBlur={onBlurHandler}
            value={value}
            disabled={disabled}
            onChange={onChangeHandler}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>setDisabled(!disabled)}
                        edge="end"
                    >
                        <EditIcon/>
                    </IconButton>
                </InputAdornment>,

                onKeyDown: onKeyDownHandler,
            }}
        />
    );
};

