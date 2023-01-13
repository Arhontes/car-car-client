import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

type AccountMenuIconPropsType = {
    open:boolean,
    handleClick:(event: React.MouseEvent<HTMLElement>)=>void
}

const AccountMenuIcon = ({open,handleClick}:AccountMenuIconPropsType) => {


    return (
        <Box sx={{alignSelf: "self-end"}}>
            <Tooltip title="Настройки аккаунта">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{width: 32, height: 32}}></Avatar>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default AccountMenuIcon;