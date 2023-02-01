import React, {useState} from 'react';
import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";

type AdminCheckboxPropsType = {
    checked:boolean
    label:string
}
const AdminCheckbox = (props:AdminCheckboxPropsType) => {
    const [checked,setChecked] = useState(props.checked)
    const [disabled,setDisabled] = useState(false)

    const onChangeHandler = ()=>{
        setChecked(!checked)
    }
    return (
       <Box display={"flex"} sx={{alignItems:"center",justifyContent:"flex-start"}}>
           <Box>{props.label} </Box>
           <Checkbox
               disabled={disabled}
               onChange={onChangeHandler}
               checked={checked}/>
       </Box>

    );
};

export default AdminCheckbox;