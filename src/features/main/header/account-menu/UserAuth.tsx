import React from 'react';
import {Box, Stack} from "@mui/material";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {checkIsAuth} from "../../../../common/selectors/auth-selectors";
import {logoutTC} from "../../../auth/auth-slice";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const UserAuth = () => {

    const isAuth = useAppSelector(checkIsAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(logoutTC())
    }
    const login = () => {
        navigate("login")
    }

    return (
        <Box sx={{flexGrow: 0}}>
            {
                isAuth ?
                    <Stack direction="row" spacing={2}>
                        <Button
                            color={"inherit"}
                            endIcon={<ExitToAppRoundedIcon />}
                            onClick={logout}
                            variant="text">Выйти</Button>
                    </Stack>


                    :  <Button
                        variant="text"
                        endIcon={<LoginRoundedIcon />}
                        color={"inherit"}
                        onClick={login}
                    >Войти</Button>
            }

        </Box>

    );
};

export default UserAuth;