const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
  'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)',
  'linear-gradient(135deg, #3C3B3F 0%, #605C3C 100%)',
  'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
  'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
  'linear-gradient(135deg, #FDBB2D 0%, #22C1C3 100%)',
  'linear-gradient(135deg, #FDBB2D 0%, #3A1C71 100%)',
  'linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
]

export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length)
  return { background: gradients[randomIndex] }
}