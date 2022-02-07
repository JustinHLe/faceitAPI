import React, {useEffect, useState} from 'react'
import { Box, Typography, Card, List, ListItem } from '@mui/material'

interface IProps {
    topPlayers: {
      nickname: string,
      country: string,
      player_id: string,
      faceit_elo: number,
      game_skill_level: number,
      position: number
    }[]
  }
  

const About: React.FC<IProps> = ({ topPlayers }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 1,
            alignItems: "center",
            justifyContent: "center",
            background: 'linear-gradient(to right, #232526, #414345);',
        }}>
            <Box my={2} sx={{width: "60%", flexDirection: 'column', borderRadius: '10px'}}>
                <Typography variant="h5" sx={{display: 'flex', justifyContent: 'flex-start', color: '#EBEFF3', padding: '4px'}}>Top Pwners</Typography>
                <List sx={{display: 'flex', flexDirection: 'column'}}>
                    {topPlayers.map((item,i)=> (
                            <ListItem sx={{padding: "4px 0", width: 'auto'}}>
                                <Card variant='outlined' sx={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', padding: "4px"}}>
                                    <Typography variant="h6" sx={{color: '#EBEFF3'}}>
                                        {item.nickname}
                                    </Typography>
                                    <Typography ml={1} variant="h6" sx={{color: '#FF5500'}}>
                                        {item.faceit_elo}
                                    </Typography>

                                </Card>
                            </ListItem>
                    ))}   
                </List>
            </Box>
            <Box p={2} sx={{
                width: "60%",
                border: '1px solid #232828',
                borderRadius: '10px'
            }}>
            <Typography variant='h6' sx={{
                    color: '#EBEFF3',
                    wordBreak: "break-word"
                }}>This App was designed to display the stats of the Faceit CS:GO community and built with materialUI and typescript. This website is currently 100% free!
                </Typography>
            </Box>
        </Box>
    )
}

export default About