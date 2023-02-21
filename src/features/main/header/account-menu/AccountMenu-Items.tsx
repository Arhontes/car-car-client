import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {checkIsAuth} from "../../../../common/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";

const AccountMenuItems = () => {

    const isAuth = useAppSelector(checkIsAuth)

    const navigate = useNavigate()

    const handleClick = (path:string) => {
        navigate(`/${path}`)
    }


    return (
        <>
            <MenuItem onClick={()=>handleClick("profile")}>
                <Avatar/> Профиль
            </MenuItem>
            <MenuItem onClick={()=>handleClick("admin/admin-trips")}>
                <Avatar/> Поездки
            </MenuItem>
            <MenuItem onClick={()=>handleClick("admin/admin-cars")}>
                <Avatar/> Машины
            </MenuItem>
            <Divider/>

            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small"/>
                </ListItemIcon>
                Настройки
            </MenuItem>


            </>
    );
};

export default AccountMenuItems;