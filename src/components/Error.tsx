import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { Box, Typography, Card, List, ListItem, CardContent, CardMedia } from '@mui/material'
import confused from '../images/confused.gif'

const Error = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 1, height: '68.4vh', background: 'linear-gradient(to right, #232526, #414345);'}}>
            <Box component="img" sx={{height: 350, width: 500, maxHeight: {md: 350, xs: 200}, maxWidth: {md: 500, xs: 300}}} src={confused} alt='no match found'>

            </Box>

            <Typography sx={{mt: 4, fontSize: {md: 32, xs: 18}}}gutterBottom variant="h4" color={'#FFF'}>
                Error!!! Please try again.
            </Typography>
        </Box>
    )
}

export default Error