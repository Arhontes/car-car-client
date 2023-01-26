import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountMenu from "./account-menu/AccountMenu";
import HeaderLogo from "./Header-Logo";
import HeaderBurgerMenu from "./Header-BurgerMenu";
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "../../../common/hooks/useAppSelector";
import {selectorGetAppStatus} from "../../../common/selectors/app-selectors";
import UserAuth from "./account-menu/UserAuth";
import {useNavigate} from "react-router-dom";
import {selectorGetProfileData} from "../../../common/selectors/profile-selectors";

export type HeaderMenuPropsType = { title: string, path: string }

const pages: Array<HeaderMenuPropsType> = [{path: "contacts", title: "Контакты"},
    {path: "info", title: "Инфо"},
    {path: "/", title: "Поездка"}];

function Header() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const appStatus = useAppSelector(selectorGetAppStatus)
    const profile = useAppSelector(selectorGetProfileData)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const navigate = useNavigate()
    const menuIconAction = (path: string) => {
        setAnchorElNav(null)
        navigate(path)
    }

    return (
        <AppBar position="sticky">

            <Container maxWidth="xl">

                <Toolbar disableGutters>

                    <HeaderLogo/>

                    <HeaderBurgerMenu
                        handleCloseNavMenu={menuIconAction}
                        anchorElNav={anchorElNav}
                        handleOpenNavMenu={handleOpenNavMenu}
                        pages={pages}/>


                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => menuIconAction(page.path)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    {
                        profile&&profile.phone
                    }
                    <Box>
                    </Box>
                    <UserAuth/>
                    <AccountMenu/>
                </Toolbar>

            </Container>
            {appStatus === "loading" && <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>}
        </AppBar>
    );
}

export default Header;