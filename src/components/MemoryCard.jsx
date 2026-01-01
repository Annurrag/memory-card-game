import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Brain, BrainCircuit, Icon } from 'lucide-react'

const MemoryCard = ({ card, onClick, disabled }) => {
  const {icon : Icon, isFlipped, isMatched}= card;
  return (
    <button
      onClick={onClick}
      disabled={disabled || isFlipped || isMatched}
      className={cn(
        "card rounded-lg aspect-square w-full h-full shadow-lg",
        (isFlipped || isMatched) && "flipped"
      )}
      aria-label={`Card ${isFlipped ? card.iconName : 'hidden'}`}
    >
      <div className="card-inner relative w-full h-full">
        <div className="card-back absolute flex items-center justify-center w-full h-full bg-primary rounded-lg">
          <BrainCircuit className="w-1/2 h-1/2 text-primary-foreground opacity-50" />
        </div>
        <div className="card-front absolute flex items-center justify-center w-full h-full bg-accent/50 rounded-lg">
          <Icon className="w-3/4 h-3/4 text-accent-foreground" />
        </div>
      </div>
    </button>
  )
}

export default MemoryCard
