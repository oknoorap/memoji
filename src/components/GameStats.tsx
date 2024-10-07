import React from 'react'
import { FaChessBoard, FaStopwatch, FaLayerGroup } from 'react-icons/fa'

interface GameStatsProps {
  moves: number
  matchedPairs: number
  totalPairs: number
  level: number
}

const GameStats: React.FC<GameStatsProps> = ({ moves, matchedPairs, totalPairs, level }) => {
  return (
    <div className="fixed bottom-2 left-2 right-2 flex justify-between items-center p-3 bg-gradient-to-r from-green-900 to-black bg-opacity-70 text-white rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="text-lg flex items-center">
        <FaStopwatch className="mr-2" />
        Moves: <span className="font-bold ml-1">{moves}</span>
      </div>
      <div className="text-lg flex items-center">
        <FaChessBoard className="mr-2" />
        Pairs: <span className="font-bold ml-1">{matchedPairs}</span> / {totalPairs}
      </div>
      <div className="text-lg flex items-center">
        <FaLayerGroup className="mr-2" />
        Level: <span className="font-bold ml-1">{level}</span>
      </div>
    </div>
  )
}

export default GameStats