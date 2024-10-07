import React, { useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useGameStore } from '../store/gameStore'
import ConfirmationModal from './ConfirmationModal'

const QuitButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const quitGame = useGameStore(state => state.quitGame)

  const handleQuit = () => {
    setShowModal(true)
  }

  const confirmQuit = () => {
    quitGame()
    setShowModal(false)
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-2 px-4 rounded flex items-center space-x-2 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300"
        onClick={handleQuit}
      >
        <FaSignOutAlt />
        <span>Quit Game</span>
      </button>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmQuit}
        message="Are you sure you want to quit? Your progress will be lost."
      />
    </>
  )
}

export default QuitButton