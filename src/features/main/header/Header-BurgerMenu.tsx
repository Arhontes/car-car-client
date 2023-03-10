import React from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {HeaderMenuPropsType} from "./Header";

type HeaderBurgerMenuPropsType = {
    handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void
    anchorElNav: null | HTMLElement
    handleCloseNavMenu: (path:string) => void
    pages: HeaderMenuPropsType[]
}

const HeaderBurgerMenu = (props: HeaderBurgerMenuPropsType) => {


    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={props.anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(props.anchorElNav)}
                onClose={props.handleCloseNavMenu}
                sx={{
                    display: {xs: 'block', md: 'none'},
                }}
            >
                {props.pages.map((page) => (
                    <MenuItem key={page.title} onClick={()=>props.handleCloseNavMenu(page.path)}>
                        <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default HeaderBurgerMenu;