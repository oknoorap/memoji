import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { useGameStore } from '../store/gameStore'

const StartButton: React.FC = () => {
  const startGame = useGameStore(state => state.startGame)

  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
      onClick={startGame}
    >
      <FaPlay />
      <span>Start Game</span>
    </button>
  )
}

export default StartButton