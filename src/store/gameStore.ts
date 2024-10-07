import { create } from 'zustand'
import { generateEmojiGrid } from '../utils/gameLogic'
import { persist } from 'zustand/middleware'

const BASE_ROWS = 100
const GRID_COLS = 20
const TOTAL_LEVELS = 100
const HINTS_PER_LEVEL = 10

interface GameState {
  grid: string[][]
  flippedCards: [number, number][]
  matchedPairs: number
  moves: number
  level: number
  isGameStarted: boolean
  showConfetti: boolean
  hintCards: [number, number][]
  correctMoves: [number, number][]
  hintCredits: number
  isGameOver: boolean
  initializeGame: () => void
  flipCard: (row: number, col: number) => boolean
  startGame: () => void
  quitGame: () => void
  setShowConfetti: (show: boolean) => void
  showHint: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      grid: [],
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      level: 1,
      isGameStarted: false,
      showConfetti: false,
      hintCards: [],
      correctMoves: [],
      hintCredits: HINTS_PER_LEVEL,
      isGameOver: false,

      initializeGame: () => {
        const { level } = get()
        const rows = BASE_ROWS + (level - 1)
        const pairs = (rows * GRID_COLS) / 2
        set({
          grid: generateEmojiGrid(rows, GRID_COLS, pairs),
          flippedCards: [],
          matchedPairs: 0,
          moves: 0,
          hintCards: [],
          correctMoves: [],
          hintCredits: HINTS_PER_LEVEL,
          isGameOver: false,
        })
      },

      flipCard: (row: number, col: number) => {
        const { flippedCards, grid, matchedPairs, moves, isGameStarted, level, correctMoves } = get()
        if (!isGameStarted) return false

        if (flippedCards.length === 2) return false
        if (flippedCards.some(([r, c]) => r === row && c === col)) return false
        if (correctMoves.some(([r, c]) => r === row && c === col)) return false

        const newFlippedCards = [...flippedCards, [row, col]]
        set({ flippedCards: newFlippedCards, moves: moves + 1, hintCards: [] })

        if (newFlippedCards.length === 2) {
          const [[r1, c1], [r2, c2]] = newFlippedCards
          if (grid[r1][c1] === grid[r2][c2]) {
            const newMatchedPairs = matchedPairs + 1
            const newCorrectMoves = [...correctMoves, [r1, c1], [r2, c2]]
            set({ matchedPairs: newMatchedPairs, flippedCards: [], correctMoves: newCorrectMoves, showConfetti: true })
            
            setTimeout(() => set({ showConfetti: false }), 5000) // Increased confetti duration to 5 seconds

            const totalPairs = (grid.length * GRID_COLS) / 2
            if (newMatchedPairs === totalPairs) {
              if (level < TOTAL_LEVELS) {
                setTimeout(() => {
                  set({ level: level + 1 })
                  get().initializeGame()
                }, 2000)
              } else {
                set({ isGameOver: true, showConfetti: true })
                setTimeout(() => set({ isGameStarted: false }), 10000) // Show game over screen after 10 seconds
              }
            }
          } else {
            setTimeout(() => set({ flippedCards: [] }), 1000)
          }
        }
        return true
      },

      startGame: () => {
        const { initializeGame } = get()
        initializeGame()
        set({ isGameStarted: true, level: 1, isGameOver: false })
      },

      quitGame: () => {
        set({
          isGameStarted: false,
          grid: [],
          flippedCards: [],
          matchedPairs: 0,
          moves: 0,
          level: 1,
          showConfetti: false,
          hintCards: [],
          correctMoves: [],
          hintCredits: HINTS_PER_LEVEL,
          isGameOver: false,
        })
      },

      setShowConfetti: (show: boolean) => set({ showConfetti: show }),

      showHint: () => {
        const { grid, matchedPairs, correctMoves, hintCredits } = get()
        if (hintCredits <= 0) return

        const flatGrid = grid.flat()
        const unmatchedEmojis = flatGrid.filter((emoji, index) => {
          const [row, col] = [Math.floor(index / GRID_COLS), index % GRID_COLS]
          return !correctMoves.some(([r, c]) => r === row && c === col)
        })
        
        if (unmatchedEmojis.length > 0) {
          const randomEmoji = unmatchedEmojis[Math.floor(Math.random() * unmatchedEmojis.length)]
          const indices = flatGrid.reduce((acc, emoji, index) => {
            if (emoji === randomEmoji) acc.push(index)
            return acc
          }, [] as number[])
          
          const [index1, index2] = indices
          const hint: [number, number][] = [
            [Math.floor(index1 / GRID_COLS), index1 % GRID_COLS],
            [Math.floor(index2 / GRID_COLS), index2 % GRID_COLS]
          ]
          
          set({ hintCards: [hint[0]], hintCredits: hintCredits - 1 })
          setTimeout(() => {
            set({ hintCards: hint })
            setTimeout(() => set({ hintCards: [] }), 1000)
          }, 1000)
        }
      },
    }),
    {
      name: 'emoji-memory-game',
    }
  )
)