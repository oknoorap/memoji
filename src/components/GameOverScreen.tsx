import React, { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'

const GameOverScreen: React.FC = () => {
  const quitGame = useGameStore(state => state.quitGame)
  const [showQuitButton, setShowQuitButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuitButton(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-6xl font-bold mb-8 animate-pulse">Congratulations, Warrior!</h2>
      <p className="text-2xl mb-8">You've conquered all 100 levels!</p>
      {showQuitButton && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          onClick={quitGame}
        >
          Quit Game
        </button>
      )}
    </div>
  )
}

export default GameOverScreen