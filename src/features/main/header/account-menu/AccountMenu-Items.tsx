import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {Login} from "@mui/icons-material";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {checkIsAuth} from "../../../../common/selectors/auth-selectors";

const AccountMenuItems = () => {

    const isAuth = useAppSelector(checkIsAuth)

    return (
        <>
            <MenuItem>
                <Avatar/> Profile
            </MenuItem>
            <MenuItem>
                <Avatar/> My account
            </MenuItem>

            <Divider/>

            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small"/>
                </ListItemIcon>
                Settings
            </MenuItem>
            {
                isAuth ? <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                    : <MenuItem>
                        <ListItemIcon>
                            <Login fontSize="small"/>
                        </ListItemIcon>
                        Login
                    </MenuItem>
            }
            </>
    );
};

export default AccountMenuItems;