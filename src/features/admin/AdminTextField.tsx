import React, {useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {UpdatePassengerDto} from "../../common/types/passengers-types";

type AdminTextFieldPropsType = {
    value: string
    name: string
    label:string
    action: (updateDto:UpdatePassengerDto)=>void
}

export const AdminTextField = (props: AdminTextFieldPropsType) => {
    const [value, setValue] = useState(props.value)
    const [disabled, setDisabled] = useState(true)
    const dispatch = useAppDispatch()

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onBlurHandler = () => {
        setDisabled(true)
        if (props.value!==value){
            props.action({[props.name]:value})
        }
    }
    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setDisabled(true)
            if (props.value!==value){
                props.action({[props.name]:value})
            }

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

