import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";
import GameStats from "@/components/GameStats";
import { Button } from "@/components/ui/button";


export default function Home() {
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
         <GameControls />
         <GameStats />
    </div>

      {/* game grid */}
    <div className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
      <GameBoard />

    </div>

    

    </main>
    
  );
}
