import React from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { RotateCcw } from 'lucide-react'

const GameControls = () => {
  return (
    <div className='flex items-center justify-center gap-4 my-4'>
      <Tabs 
        //  value={String(gridSize)}
        //  onValueChange={(val) => setGridSize(Number(val))}
         className="bg-blue-300/20 rounded-md">
        <TabsList>
            <TabsTrigger value="4">4X4</TabsTrigger>
            <TabsTrigger value="6">6X6</TabsTrigger>
        </TabsList>
      </Tabs>
      {/* <Button variant='outline' size='icon' aria-label='Reset Game' onClick={OnReset} disabled={!isGameActive}> */}
      <Button variant='outline' size='icon' aria-label='Reset Game'>
        <RotateCcw className='w-4 h-4'></RotateCcw>
      </Button>
    </div>
  )
}

export default GameControls
