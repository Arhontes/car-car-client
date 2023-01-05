import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountMenu from "./account-menu/AccountMenu";
import HeaderLogo from "./Header-Logo";
import HeaderBurgerMenu from "./Header-BurgerMenu";

const pages = ['Контакты', 'Инфо', 'Поездка'];

function Header() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">

            <Container maxWidth="xl">

                <Toolbar disableGutters>

                    <HeaderLogo/>

                    <HeaderBurgerMenu
                        handleCloseNavMenu={handleCloseNavMenu}
                        anchorElNav={anchorElNav}
                        handleOpenNavMenu={handleOpenNavMenu}
                        pages={pages}/>


                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <AccountMenu/>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;