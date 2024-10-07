import React, { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'

const EmojiGrid: React.FC = () => {
  const { grid, flippedCards, flipCard, hintCards, correctMoves } = useGameStore()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hintCards.length > 0) {
      const [row, col] = hintCards[hintCards.length - 1]
      const hintCard = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
      if (hintCard && gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect()
        const cardRect = hintCard.getBoundingClientRect()
        const scrollTop = cardRect.top - gridRect.top - gridRect.height / 2 + cardRect.height / 2
        gridRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' })
      }
    }
  }, [hintCards])

  return (
    <div ref={gridRef} className="grid grid-cols-20 gap-1 mx-auto overflow-auto max-h-[70vh]" style={{ width: 'max-content' }}>
      {grid.map((row, rowIndex) =>
        row.map((emoji, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            data-row={rowIndex}
            data-col={colIndex}
            className={`w-10 h-10 flex items-center justify-center text-xl bg-gray-800 rounded shadow transition-all duration-300 hover:animate-pop active:animate-tada ${
              flippedCards.some(([r, c]) => r === rowIndex && c === colIndex) || correctMoves.some(([r, c]) => r === rowIndex && c === colIndex)
                ? 'bg-blue-600'
                : hintCards.some(([r, c]) => r === rowIndex && c === colIndex)
                ? 'bg-yellow-500'
                : 'hover:bg-gray-700'
            }`}
            onClick={() => {
              const isValid = flipCard(rowIndex, colIndex)
              if (!isValid) {
                const button = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`)
                button?.classList.add('animate-shake')
                setTimeout(() => button?.classList.remove('animate-shake'), 500)
              }
            }}
            disabled={correctMoves.some(([r, c]) => r === rowIndex && c === colIndex)}
          >
            {flippedCards.some(([r, c]) => r === rowIndex && c === colIndex) || correctMoves.some(([r, c]) => r === rowIndex && c === colIndex) ? emoji : ''}
          </button>
        ))
      )}
    </div>
  )
}

export default EmojiGrid