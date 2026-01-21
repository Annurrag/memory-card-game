
"use client";

import { useState, useEffect, useCallback } from 'react';

import { generateCards } from '@/lib/game-utils';

import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import GameStats from '@/components/GameStats';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function Home() {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // backend integration states
  const [aiReview, setAiReview]=useState("");
  const [isLoadingReview, setIsLoadingReview]=useState(false);

  const getPerformanceData = ()=>{
    const efficiency = Number(((gridSize * gridSize) / moves).toFixed(2));
    return {
      gridSize,
      moves,
      time,
      efficiency,
    };
  }

  const generateAIReview = async()=>{
    setIsLoadingReview(true);

    try {
      // const res = await fetch("http://localhost:3000/ai/game-review", {
      const res = await fetch("https://memory-card-game-backend-6qpz.onrender.com/ai/game-review", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(getPerformanceData()),
      });

      const data = await res.json();
      setAiReview(data.review)
      console.log("AI Review:", data.review);
    } catch (error) {
      console.error("Error fetching AI review:", error);
      // setAiReview("Well done! Keep practicing to improve your memory and speed.");
    
    }
    finally{
      setIsLoadingReview(false);
    }
  }


  useEffect(()=>{
    if(isGameWon){
      generateAIReview();
    }
  }, [isGameWon]);



  const startNewGame = useCallback((size) => {
    setGridSize(size);
    setCards(generateCards(size));
    setFlippedIndices([]);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
    setIsGameWon(false);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    startNewGame(gridSize);
  }, [gridSize, startNewGame]);

  useEffect(() => {
    let timer;
    if (isGameActive && !isGameWon) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, isGameWon]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameWon(true);
      setIsGameActive(false);
    }
  }, [cards]);
  
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.iconName === secondCard.iconName) {
        setCards(prevCards =>
          prevCards.map((card, index) =>
            (index === firstIndex || index === secondIndex) 
            ? { ...card, isMatched: true } 
            : card
          )
        );
        setFlippedIndices([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, index) =>
              (index === firstIndex || index === secondIndex) 
              ? { ...card, isFlipped: false } 
              : card
            )
          );
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    if (isChecking || cards[index].isMatched || flippedIndices.includes(index) || flippedIndices.length >= 2) {
      return;
    }

    if (!isGameActive) {
      setIsGameActive(true);
    }

    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIndices(prev => [...prev, index]);
  };
  
  const handleReset = () => {
    startNewGame(gridSize);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 font-body">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-2">Memory Matrix</h1>
        <p className="text-muted-foreground mb-6 max-w-md">Select a grid size to start. Click on the cards to find matching pairs.</p>
        <GameControls 
          onSizeChange={(size) => startNewGame(size)}
         onReset={handleReset} 
         gridSize={gridSize} 
         isGameActive={isGameActive} />
        <GameStats 
        moves={moves} 
        time={time} />
      </div>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          gridSize={gridSize}
          disabled={isChecking}
        />
      </div>
      <AlertDialog open={isGameWon} onOpenChange={setIsGameWon}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Congratulations! You won!</AlertDialogTitle>
            <AlertDialogDescription>
              You completed the {gridSize}x{gridSize} grid. Here are your final stats:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-around my-4 text-center">
             <div>
                <p className="text-3xl font-bold font-headline">{moves}</p>
                <p className="text-sm text-muted-foreground">Moves</p>
             </div>
             <div>
                <p className="text-3xl font-bold font-headline">{formatTime(time)}</p>
                <p className="text-sm text-muted-foreground">Time</p>
             </div>
          </div>

          {/* AI Review Section */}
          <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
      <p className="font-semibold mb-1">Your Feedback Generated</p>

      {isLoadingReview ? (
        <p className="text-muted-foreground">
          Analyzing your performance...
        </p>
      ) : (
        <p className="text-foreground">{aiReview}</p>
      )}
    </div>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => startNewGame(gridSize)}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
