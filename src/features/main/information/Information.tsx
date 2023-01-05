import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Information = () => {
    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h3" gutterBottom>
                Информация
            </Typography>
            <Box sx={{width: '100%'}}>

                <Stack spacing={2}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Stack>
            </Box>
        </Container>

    );
};

export default Information;