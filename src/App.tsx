import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type GameState = 'START' | 'CREATE_EGGY' | 'PLAZA' | 'ISLAND' | 'UNPACK';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');

  return (
    <div className="h-screen w-screen bg-[#FFF9C4] flex items-center justify-center font-sans">
      <div className="relative w-full h-full max-w-[500px] max-h-[900px] bg-gradient-to-br from-[#B5EAD7] via-[#E0BBE4] to-[#FFB7B2] overflow-hidden shadow-2xl md:rounded-[3rem] md:border-[12px] md:border-white/20">
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white/30 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {gameState === 'START' && (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '20px', color: 'white' }}>当前状态: START</div>
            </motion.div>
          )}
          {gameState === 'CREATE_EGGY' && (
            <motion.div key="create" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '-100%' }}>
              <div style={{ padding: '20px', color: 'white' }}>当前状态: CREATE_EGGY</div>
            </motion.div>
          )}
          {gameState === 'PLAZA' && (
            <motion.div key="plaza" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '20px', color: 'white' }}>当前状态: PLAZA</div>
            </motion.div>
          )}
          {gameState === 'ISLAND' && (
            <motion.div key="island" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '20px', color: 'white' }}>当前状态: ISLAND</div>
            </motion.div>
          )}
          {gameState === 'UNPACK' && (
            <motion.div key="unpack" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}>
              <div style={{ padding: '20px', color: 'white' }}>当前状态: UNPACK</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 临时按钮切换状态 */}
        <button
          onClick={() => {
            if (gameState === 'START') setGameState('CREATE_EGGY');
            else if (gameState === 'CREATE_EGGY') setGameState('PLAZA');
            else if (gameState === 'PLAZA') setGameState('ISLAND');
            else if (gameState === 'ISLAND') setGameState('UNPACK');
            else setGameState('START');
          }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            background: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          切换状态
        </button>
      </div>
    </div>
  );
}
