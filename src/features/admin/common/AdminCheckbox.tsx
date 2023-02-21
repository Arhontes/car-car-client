import React, {useState} from 'react';
import {Box, Checkbox} from "@mui/material";

type PropsType = {
    checked: boolean
    label: string,
    onChange: (checked: boolean) => void
}
export const AdminCheckbox: React.FC<PropsType> = React.memo(({label, onChange, ...restProps}) => {

    const [checked,setChecked] = useState(restProps.checked)
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked)
        setChecked(event.target.checked)
    }
    return (
        <Box display={"flex"} sx={{alignItems: "center", justifyContent: "flex-start"}}>
            <Box>{label}</Box>
            <Checkbox
                onChange={onChangeHandler}
                checked={checked}/>
        </Box>

    );
})

