import React from 'react'
import { Box, Typography, Card, List, ListItem } from '@mui/material'

const Footer = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: 1,
            height: 80,
            background: 'linear-gradient(to right, #232526, #414345);'
        }}>
            <Typography variant='h6' sx={{fontWeight: 'regular', color: "#EBEFF3", ml: 10}}>@JustinHLe</Typography>
        </Box>
    )
}

export default Footer