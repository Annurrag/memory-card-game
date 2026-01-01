import React from 'react'
import MemoryCard from './MemoryCard'
import { cn } from '@/lib/utils'
import { Card } from './ui/card'

const GameBoard = ({ gridSize, onCardClick, cards, disabled }) => {
  return (
    <div className={cn("grid gap-2 sm:gap-3",
      gridSize === 4 ? "grid-cols-4" : "grid-cols-6"
    )}>
      {cards.map((card, index) => (
        <MemoryCard key={card.id} card={card} onClick={() => onCardClick(index)} disabled={disabled} />
      ))}
    </div>
  )
}

export default GameBoard
