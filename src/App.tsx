import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles as SparklesIcon } from 'lucide-react'; // 只导入需要用到的图标

type GameState = 'START' | 'CREATE_EGGY' | 'PLAZA' | 'ISLAND' | 'UNPACK';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [eggyConfig, setEggyConfig] = useState({ color: '#FFD93D', elasticity: 0.1 });
  const [activeTrouble, setActiveTrouble] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleStart = () => setGameState('CREATE_EGGY');
  const handleEggyDone = () => setGameState('PLAZA');
  const handleCatch = (trouble: any) => {
    setActiveTrouble(trouble);
    setGameState('UNPACK');
  };
  const handleSendComfort = async (text: string) => {
    // 简化版，避免调用 API
    setAiResponse({ text: '测试回复', emoji: '✨' });
    setTimeout(() => {
      setGameState('PLAZA');
      setActiveTrouble(null);
      setAiResponse(null);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[#FFF9C4] flex items-center justify-center font-sans">
      <div className="relative w-full h-full max-w-[500px] max-h-[900px] bg-gradient-to-br from-[#B5EAD7] via-[#E0BBE4] to-[#FFB7B2] overflow-hidden shadow-2xl md:rounded-[3rem] md:border-[12px] md:border-white/20">
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white/30 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {gameState === 'START' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full z-10 p-6 text-center relative"
            >
              {/* 恢复 START 界面的文字和按钮，但不要 Canvas */}
              <h1 className="text-5xl font-black mb-4 tracking-tighter text-jelly-purple drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                没关系派对
              </h1>
              <p className="text-lg text-jelly-purple/70 mb-12 max-w-[260px] mx-auto font-bold">
                在这里，每一个烦恼都会变成<br/>宇宙中最绚烂的烟花
              </p >
              <button 
                onClick={handleStart}
                className="jelly-button bg-white text-jelly-purple px-10 py-4 rounded-full text-lg font-black flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.4)] border-b-4 border-black/5"
              >
                <SparklesIcon className="w-4 h-4 text-jelly-pink" />
                加入治愈星球
              </button>
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
      </div>
    </div>
  );
}
