import React, { useState } from 'react';

// 定义游戏状态类型（和原代码保持一致）
type GameState = 'START' | 'CREATE_EGGY' | 'PLAZA' | 'ISLAND' | 'UNPACK';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');

  // 简单的按钮切换状态
  const nextState = () => {
    if (gameState === 'START') setGameState('CREATE_EGGY');
    else if (gameState === 'CREATE_EGGY') setGameState('PLAZA');
    else if (gameState === 'PLAZA') setGameState('ISLAND');
    else if (gameState === 'ISLAND') setGameState('UNPACK');
    else setGameState('START');
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #B5EAD7, #E0BBE4, #FFB7B2)',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>没关系派对 (调试模式)</h1>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          当前游戏状态: <strong style={{ color: '#FF6B6B' }}>{gameState}</strong>
        </p >
        <button
          onClick={nextState}
          style={{
            background: '#FFB7B2',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '3rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 5px 0 #E08E8A'
          }}
        >
          切换状态
        </button>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
          点击按钮切换状态，观察页面变化。
        </p >
      </div>
    </div>
  );
}
