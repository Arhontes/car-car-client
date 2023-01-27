import {UserType} from "../../common/types/common-types";
import React from "react";
import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export const ProfileInfo = ({phone, email, lastName, firstName}: UserType) => {
    const [disabled, setDisabled] = React.useState(true);
    const changeDisabled = () => {
        setDisabled(!disabled)
    }

    return (

        <Box flexDirection={"column"} display={"flex"}>
            <TextField margin="dense" value={firstName || ""} label="Имя" variant="outlined" disabled={disabled}/>
            <TextField margin="dense" value={lastName || ""} label="Фамилия" variant="outlined" disabled={disabled}/>
            <TextField margin="dense" value={phone || ""} label="Телефон" variant="outlined" disabled={disabled}/>
            <TextField margin="dense" value={email || ""} label="Email" variant="outlined" disabled={disabled}/>
            <IconButton onClick={changeDisabled} color="primary" aria-label="edit profile ">
                <EditRoundedIcon/>
            </IconButton>
        </Box>
    )

}