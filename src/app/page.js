"use client";

import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";
import GameStats from "@/components/GameStats";
import { Button } from "@/components/ui/button";    
import { useCallback, useEffect, useState } from "react";


export default function Home() {
  const [gridSize, setGridSize]= useState(4);
  const [isGameActive, setIsGameActive]= useState (false);

  const [moves, setMoves] = useState (0); 
  const[flippedIndices, setFlippedIndices]= useState ([]);

  const [time, setTime]= useState (0);
  const [cards, setCards]=useState ([]);
  const[isChecking, setIsChecking]=useState (false);

  const startNewGame =useCallback ((size) =>{
    setGridSize(size);
    setCards(generateCards(size));
    setFlippedIndices ([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
  },[]); 

useEffect(()=>{
  startNewGame(gridSize);
},[startNewGame, gridSize]);
  
  useEffect(()=>{
    let timer;
    if(isGameActive && !isGameWon){
      timer = setInterval(()=>{
        setTime((prevTime)=> prevTime +1);
      },1000)
    }
  })

  const handleReset = ()=>{
    startNewGame (gridSize);
    console.log("reset game");
    
  }

  const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

const handleCardClick = (index)=>{
  if(isChecking || cards[index].isMatched || flippedIndices.includes(index) || flippedIndices.length >= 2){
    return;
  }

}

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {/* top */}
      <div className="flex flex-col items-center text-center"> 
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-700">
        Welcome to the Memory Card Game!
      </h1>
      
      <p className="text-mutated-foreground mb-6 max-w-md text-3xl">Select your Grid Size to Start the Game.
         <span className="text-blue-600">Click on the cards to find the matching pairs.</span>
         </p>
         <GameControls 
          gridSize={gridSize} 
          onReset={handleReset} 
          onSizeChange={(size)=>startNewGame(size)} 
          isGameActive={isGameActive} />
         <GameStats 
           moves={moves}
           time={time}
         />
    </div>

      {/* game grid */}
    <div className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
      <GameBoard 
      cards = {cards}
      onCardClick = {handleCardClick}
      gridSize={gridSize}
      disabled = {isChecking}
       />

    </div>

    

    </main>
    
  );
}
