import React from 'react'
import { Box, Typography } from '@mui/material'

const Navbar = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: 1,
            height: 80,
            background: 'linear-gradient(to right, #232526, #414345);'
        }}>
            <Typography variant='h5' sx={{fontWeight: 'regular', color: "#EBEFF3", ml: 10}}>Faceit API</Typography>
        </Box>
    )
}

export default Navbar