import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Search from './components/Search';
import About from './components/About';
import PlayerPage from './components/PlayerPage'
import axios from 'axios'
import Error from './components/Error'

interface IState {
  topPlayers: {
    nickname: string,
    country: string,
    player_id: string,
    faceit_elo: number,
    game_skill_level: number,
    position: number
  }[]
}
export interface playerState {
  playerData: {
      nickname?: string,
      country?:string,
      faceit_elo?: number,
      skill_level?: number,
      games?: {
          csgo: {
              faceit_elo: number,
              skill_level: number
          }
      }
  }
  playerStatistics: any
  stats: {
      headshot_percantage: string,
      kdRatio: number,
      Matches: number,
      Wins: number,
      win_rate: string
  }
}
function App() {
  const [topPlayers, setTopPlayers] = useState<IState['topPlayers']>([])
  const [isSubmit, setSubmit] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const [enter, setEnter] = useState(false)
  const [error, setError] = useState(false)
  const [playerData, setPlayerData] = useState<playerState['playerData']>({})
  const [playerStatistics, setPlayerStatistics] = useState<playerState['playerStatistics']>({
    game_id: "",
    lifetime: {},
    player_id: "",
    segments: []
  })
  const [faceitLevel, setFaceitLevel] = useState("")

  const getTopUsers = async () : Promise<any> => {
    try{
        const response = await axios.get("https://open.faceit.com/data/v4/rankings/games/csgo/regions/US?offset=0&limit=10", {
            headers: {
                Accept: 'application/json',
                Authorization: 'API KEY HERE - CREATE FACEIT DEVELOPER ACCOUNT'
            }
        })
        return response.data.items
    } catch (err){
        console.log(err)
    }
}
  useEffect(()=>{
    getTopUsers().then((data)=>{
        console.log(data)
        setTopPlayers(data)
    })
},[])
  useEffect(()=>{
    console.log("fire")
    if(enter){
        getPlayer().then(data => {
            if(!data){
              setQuery("")
              setEnter(false)
              return
            }
            console.log(data)
            setPlayerData(data)
            setFaceitLevel('faceit' + data.games.csgo.skill_level)
            getStatistics(data.player_id).then(data => {
                if(!data) return 
                setPlayerStatistics(data)
            })
            setQuery("")
            setEnter(false)
        })
    } 
  },[enter])
  const getPlayer = async (): Promise<any> => {
    try {
        const response = await axios.get(`https://open.faceit.com/data/v4/players?nickname=${query}&game=csgo`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'API KEY HERE - CREATE FACEIT DEVELOPER ACCOUNT'
            }
        })
        setError(false)
        return response.data
    }
    catch(err){
      setError(true)
      console.log(err)
    }
  }
  const getStatistics = async (id: string) : Promise<any> => {
    try {
        console.log(id)
        const response = await axios.get(`https://open.faceit.com/data/v4/players/${id}/stats/csgo`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'API KEY HERE - CREATE FACEIT DEVELOPER ACCOUNT'
            }
        })
        setError(false)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        setError(true)
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <Search setSubmit={setSubmit} setQuery={setQuery} query={query} setEnter={setEnter} ></Search>
      {isSubmit
      ? 
        error 
        ? 
          <Error ></Error>
        :
          <PlayerPage playerStatistics={playerStatistics} playerData={playerData} faceitLevel={faceitLevel}></PlayerPage>
      :
        <About topPlayers={topPlayers}></About>
      }
      <Footer></Footer> 
    </>
  );
}

export default App;
