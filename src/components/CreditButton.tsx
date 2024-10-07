import React from 'react'
import { FaGithub } from 'react-icons/fa'

const CreditButton: React.FC = () => {
  return (
    <a
      href="https://github.com/oknoorap"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
      aria-label="View creator's GitHub profile"
    >
      <FaGithub size={24} />
    </a>
  )
}

export default CreditButton