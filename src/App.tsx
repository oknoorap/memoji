import React, { useEffect } from 'react'
import EmojiGrid from './components/EmojiGrid'
import GameStats from './components/GameStats'
import StartButton from './components/StartButton'
import QuitButton from './components/QuitButton'
import HintButton from './components/HintButton'
import GameOverScreen from './components/GameOverScreen'
import CreditButton from './components/CreditButton'
import { useGameStore } from './store/gameStore'
import { getRandomGradient } from './utils/gradients'
import Confetti from 'react-confetti'
import { useWindowSize } from 'usehooks-ts'

function App() {
  const { initializeGame, moves, matchedPairs, isGameStarted, level, grid, showConfetti, isGameOver } = useGameStore()
  const gradientStyle = getRandomGradient()
  const { width, height } = useWindowSize()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const totalPairs = (grid.length * grid[0]?.length) / 2

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white" style={gradientStyle}>
      <CreditButton />
      <div className="w-full max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">🎭 Emoji Memory Master</h1>
        <p className="text-xl mb-4">The hardest matching game ever!</p>
        {!isGameStarted && !isGameOver && (
          <div className="flex justify-center">
            <StartButton />
          </div>
        )}
        {isGameStarted && !isGameOver && (
          <>
            <QuitButton />
            <HintButton />
            <div className="w-full overflow-auto flex justify-center mb-8 mt-4">
              <EmojiGrid />
            </div>
            <GameStats moves={moves} matchedPairs={matchedPairs} totalPairs={totalPairs} level={level} />
          </>
        )}
        {isGameOver && <GameOverScreen />}
      </div>
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
    </div>
  )
}

export default App