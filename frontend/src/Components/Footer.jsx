import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
    return (
        <Container component="footer" sx={{ padding: 3, marginTop: 'auto', backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800] }}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2" color="white" align="center" sx={{ marginRight: 1 }}>
                    Created by
                </Typography>
                <Link href="https://jacob-kourieh.com/" target="_blank" underline="hover" sx={{ color: '#96f58d' }}>
                    Jacob Kourieh
                </Link>
            </Box>
        </Container>
    );
}

export default Footer;
