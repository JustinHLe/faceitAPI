import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Box, Typography, Card, List, ListItem, CardContent, CardMedia } from '@mui/material'
import axios from 'axios'
import profile from '../images/profile.jpeg'
import Grid from '@mui/material/Grid';
import { playerState } from '../App'

interface IProps {
    playerStatistics: any
    playerData: any
    faceitLevel: any
}
const PlayerPage = ({ playerStatistics, playerData, faceitLevel }: IProps) => {
    const [dir, setDir] = useState('')
    const [fontSize, setFontSize] = useState('')
    const [lifetimeStats, setLifetimeStats] = useState<playerState['stats']>({
        headshot_percantage: '',
        kdRatio: 0,
        Matches: 0,
        Wins: 0,
        win_rate: ''
    })
    useEffect(()=>{
        window.addEventListener('resize', () => {
            if(window.innerWidth < 1000) {
                setDir('column')
                setFontSize('12px')
            } else {
                setDir('row')
                setFontSize('20px')
            }
        })
    },[])
    useEffect(() => {
        if(Object.keys(playerStatistics).length !== 0){
            console.log(playerStatistics.segments)
            setLifetimeStats({
            headshot_percantage: playerStatistics.lifetime['Average Headshots %'],
            kdRatio: playerStatistics.lifetime['Average K/D Ratio'],
            Matches: playerStatistics.lifetime.Matches,
            Wins: playerStatistics.lifetime.Wins,
            win_rate: playerStatistics.lifetime['Win Rate %']
        })
    }
    },[playerStatistics])
    return (
        <Box sx={{
            display: 'flex',
            width: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            background: 'linear-gradient(to right, #232526, #414345);',
            py: 5,

        }}>
            <Grid container rowSpacing={4} sx={{
                display: 'flex',
                width: '60%',
                alignItems: "center",
                justifyContent: "space-around",
            }}>
            <Grid item>
                <Card>
                    <CardContent>
                        <CardMedia image={profile} height="200" component="img" alt="profile"></CardMedia>
                        <Typography gutterBottom variant="h5">
                            Username: {playerData.nickname}
                        </Typography>
                        <Typography variant="h6">
                            Country: {playerData.country?.toUpperCase()}
                        </Typography>
                        <Typography variant="h6">
                            ELO: {playerData.games?.csgo.faceit_elo}
                        </Typography>
                        <Box sx={{width: '45px', height: '45px'}}>
                            <img src={process.env.PUBLIC_URL + `/${faceitLevel}.svg`} alt="faceit level"></img>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            General Stats
                        </Typography>
                        <Typography variant="h6">
                            Average Headshot Percantage: <span style={{color: "#FF5500"}}>{lifetimeStats.headshot_percantage}%</span>
                        </Typography>
                        <Typography variant="h6">
                            K/D Ratio: <span style={{color: "#FF5500"}}>{lifetimeStats.kdRatio}</span>
                        </Typography>
                        <Typography variant="h6">
                            Matches: <span style={{color: "#FF5500"}}>{lifetimeStats.Matches}</span>
                        </Typography>
                        <Typography variant="h6">
                            Win Rate %: <span style={{color: "#FF5500"}}>{lifetimeStats.win_rate}</span>
                        </Typography>
                        <Typography variant="h6">
                            Wins: <span style={{color: "#FF5500"}}>{lifetimeStats.Wins}</span>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {playerStatistics.segments.map((item,i)=>(
                <Grid item xs={12}>
                    <Card>
                        <CardContent sx={{display: 'flex', flexDirection: dir}}>
                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <CardMedia
                                component="img"
                                sx={{ width: 200, height: 100 }}
                                image={item.img_regular}
                                alt="map"
                                />
                                <Typography sx={{mt: 2}}variant="h6">
                                    {item.label}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', flexWrap: 'wrap', flex: '1 1 auto'}}>
                                <Typography sx={{mt:2, mx: 2, fontSize: fontSize}}variant="h6">
                                    Average Kills: <span style={{color: "#FF5500"}}>{item.stats['Average Kills']}</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    Average Deaths: <span style={{color: "#FF5500"}}>{item.stats['Average Deaths']}</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    Average Headshots: <span style={{color: "#FF5500"}}>{item.stats['Average Headshots %']}%</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    K/D Ratio: <span style={{color: "#FF5500"}}>{item.stats['Average K/D Ratio']}%</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    Rounds: <span style={{color: "#FF5500"}}>{item.stats.Rounds}</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    MVPs: <span style={{color: "#FF5500"}}>{item.stats.MVPs}</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    Win: <span style={{color: "#FF5500"}}>{item.stats.Wins}</span>
                                </Typography>
                                <Typography sx={{mt: 2, mx: 2, fontSize: fontSize}}variant="h6">
                                    Win Rate: <span style={{color: "#FF5500"}}>{item.stats['Win Rate %']}%</span>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </Box>
    )
}

export default PlayerPage