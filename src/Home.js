import React from 'react'
import {Container,Card,Grid,Box,Stack} from '@mui/material'
import cardList from './cards'
import { useState,useEffect,useRef } from 'react'
import './style.css'
import idk from './question.png'


function Home() {

    //cloning the array of cards
    const [fullList,setFullList] = useState([...cardList,...cardList].sort(()=>Math.random()-0.5))
    //two cards to be flipped
    const [activeCard,setActiveCard]=useState([])
    const [foundMatches,setFoundMatches]=useState([])
    const[clicks,setClicks ]=useState(0)
    const[won,setWon ]=useState(false)

    const flipCard=(index)=>{
        if(won){
            setFullList([...cardList,...cardList].sort(()=>Math.random()-0.5))
            setFoundMatches([])
            setWon(false)
            setClicks(0 )
        }
        if(activeCard.length==0){
            setActiveCard([index])
        }
        if(activeCard.length==1){
            const firstIndex = activeCard[0]
            const secondIndex = index
            if(fullList[firstIndex]=== fullList[secondIndex]){
                setFoundMatches([...foundMatches,firstIndex,secondIndex])
                if(foundMatches.length+2 === fullList.length){
                    setWon(true)
                }
            }
            setActiveCard([...activeCard,index])
        }
        if(activeCard.length==2){
            setActiveCard([index])
        }
        setClicks(clicks+1)
        
    }


  return (
    <Box className='divv'>
        <h1 className='heading'>CLICK ON THE CARDS TO FLIP THEM</h1>
        <Grid className='grid-container' container rowSpacing={2} columnSpacing={3}>
            {fullList.map((item,index)=>{
                const flippedToFront = (activeCard.indexOf(index) !==-1)||foundMatches.indexOf(index)!==-1
                return(
                    <Grid item  className='grid-box'  xs={3}  key={index}>
                        <Box className='container'>
                            <Box id='card' onClick={() => flipCard(index)} className={flippedToFront?'flipped':null}>
                                <Card className='back'><img src={item.src} alt={item.name}/><h5>{item.name}</h5></Card> 
                                <Card className='front'><img src={idk} /></Card>     
                            </Box> 
                        </Box>  
                    </Grid>)}
            )}
        </Grid>
        <Stack className='clicks'><h3>Turns:{clicks}</h3></Stack>
        {won &&<Stack> Congrats! You matched all cards</Stack>}
    </Box>
  )
}

export default Home