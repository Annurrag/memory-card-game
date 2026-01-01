import React from 'react'
import { Card, CardContent } from './ui/card'
import {  MousePointerClick, Timer } from 'lucide-react'

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

const GameStats = ({ moves, time }) => {

  return (
    <div className='flex justify-center gap-2 my-4'>
      <Card className="shadow-md">
        <CardContent className="flex items-center gap-2 sm:gap-3">
          <MousePointerClick className='w-5 h-5 sm:w-6 sm:h-6 '/>
          <div className='flex flex-col items-start'>
            {/* <span className='text-xl sm:text-2xl font-bold'>0</span> */}
            <span className='text-xl sm:text-2xl font-bold'>{moves}</span>
            <span className='text-xs sm:text-sm '>Moves</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardContent className="flex items-center gap-2 sm:gap-3">
          <Timer className='w-5 h-5 sm:w-6 sm:h-6 '/>
          <div className='flex flex-col items-start'>
            <span className='text-xl sm:text-2xl font-bold'>{formatTime(time)}</span>
            <span className='text-xs sm:text-sm '>Time</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GameStats
