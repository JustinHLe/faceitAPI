import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react'
import { Box } from '@mui/system'
import { TextField, InputAdornment, Input, Typography } from '@mui/material'
import { makeStyles } from "@mui/styles"
import SearchIcon from '@mui/icons-material/Search';


interface IProps {
    setSubmit: Dispatch<SetStateAction<boolean>>
    setQuery: Dispatch<SetStateAction<string>>
    query: string
    setEnter: Dispatch<SetStateAction<boolean>>
}

const Search = ({ setSubmit, setQuery, query, setEnter }: IProps) => {
    useEffect(()=>{
        const handleListen = (e: any) => {
            if(e.code === "Enter"){
                handleSubmit()
            }
        }
        document.addEventListener("keypress", handleListen)

        return () => { console.log("cleanup"); document.removeEventListener("keypress", handleListen) }
    },[query])

    const focusedColor = "#FF5500";
    
    const useStyles = makeStyles((theme: any) => ({
        root: {
            "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: focusedColor
                },
            },
            "& .Mui-focused": {
                color: "#EBEFF3",
            },
        },
        hover: {
            "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
              borderColor: focusedColor
            }
          },
        notchedOutline: {
            borderWidth: "1px",
            borderColor: "#EBEFF3"
        },
        cssFocused:{
            '&:hover':{
                borderColor:'#FFFFFF'
            }
        },
        cssLabel: {
            color: '#EBEFF3'
        },
        multilineColor:{
            color:'#EBEFF3'
        }
    
    }))
    
    const classes = useStyles()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
        setQuery(e.target.value)
    }
    const handleSubmit = (): void => {
        if(!query){
            console.log("empty")
            return
        }
        setSubmit(true)
        setEnter(true)
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 1,
            alignItems: "center",
            justifyContent: "center",
            background: 'linear-gradient(to right, #232526, #414345);'
        }}>
            <TextField id="outlined-basic" label="Search for Player" variant="outlined" 
            sx={{width: '60%', position: 'relative'}}
            className={classes.root}
            InputLabelProps={{
                classes: {
                  root: classes.cssLabel
                },
              }}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon style={{fill: "#EBEFF3"}}/>
                </InputAdornment>
                ),
                classes: {
                  notchedOutline: classes.notchedOutline,
                  root: classes.hover,
                  input: classes.multilineColor
                },
                id: "username",
                name: "username"
              }}
              onChange={handleChange}
              value={query}/>
              <Typography mt={2} variant='h6' style={{color: "#EBEFF3", width: '60%', wordBreak: "break-word"}}>
                  Please enter your faceit username above. Note: This will only query U.S. CS:GO players and requires input to be case sensitive(include capitals and lowercases).
              </Typography>
        </Box>
    )
}

export default Search