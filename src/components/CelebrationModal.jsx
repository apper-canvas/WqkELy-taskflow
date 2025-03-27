import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Trophy, X } from 'lucide-react'

const CONFETTI_COLORS = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-electric',
  'bg-neon',
  'bg-tropical'
]

const CelebrationModal = ({ onClose, message = "Congratulations!" }) => {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    // Generate confetti pieces
    const generateConfetti = () => {
      const pieces = []
      for (let i = 0; i < 100; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 10,
          rotation: Math.random() * 360,
          size: 5 + Math.random() * 10,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          delay: Math.random() * 1.5
        })
      }
      setConfetti(pieces)
    }

    generateConfetti()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      {/* Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className={`confetti ${piece.color} rounded-sm absolute`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: '100vh', 
            opacity: [0, 1, 1, 0.5, 0],
            rotate: `${Math.random() > 0.5 ? 360 : -360}deg`
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            delay: piece.delay,
            ease: "easeOut" 
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative px-6 pt-10 pb-6 text-center">
          <button 
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            className="h-20 w-20 rounded-full bg-primary-light/20 dark:bg-primary-dark/30 flex items-center justify-center mx-auto mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-primary dark:text-primary-light"
            >
              <Trophy size={40} />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-2xl font-bold celebration-text-shimmer mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.h2>

          <motion.p
            className="text-surface-600 dark:text-surface-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You've completed all tasks in this project! Time to celebrate your accomplishment.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button 
              className="btn btn-outline"
              onClick={onClose}
            >
              Close
            </button>
            <motion.button 
              className="btn btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
            >
              <CheckCircle size={18} />
              <span>Start New Project</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CelebrationModal