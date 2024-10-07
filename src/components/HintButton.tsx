import React from 'react'
import { FaLightbulb } from 'react-icons/fa'
import { useGameStore } from '../store/gameStore'

const HintButton: React.FC = () => {
  const showHint = useGameStore(state => state.showHint)
  const hintCredits = useGameStore(state => state.hintCredits)

  return (
    <button
      className="fixed top-16 left-4 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 shadow-lg hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300"
      onClick={showHint}
      disabled={hintCredits <= 0}
    >
      <FaLightbulb />
      <span>Hint ({hintCredits})</span>
    </button>
  )
}

export default HintButton