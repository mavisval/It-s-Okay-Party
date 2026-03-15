import React, { useState } from 'react';

type GameState = 'START' | 'CREATE_EGGY' | 'PLAZA' | 'ISLAND' | 'UNPACK';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');

  const handleStart = () => setGameState('CREATE_EGGY');
  const handleEggyDone = () => setGameState('PLAZA');
  const handleGoToIsland = () => setGameState('ISLAND');
  const handleGoToUnpack = () => setGameState('UNPACK');
  const handleBack = () => setGameState('START');

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
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>没关系派对 (简化测试)</h1>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          当前状态: <strong style={{ color: '#FF6B6B' }}>{gameState}</strong>
        </p >

        {gameState === 'START' && (
          <button onClick={handleStart} style={buttonStyle}>开始创建</button>
        )}
        {gameState === 'CREATE_EGGY' && (
          <button onClick={handleEggyDone} style={buttonStyle}>完成创建，去广场</button>
        )}
        {gameState === 'PLAZA' && (
          <button onClick={handleGoToIsland} style={buttonStyle}>去岛屿</button>
        )}
        {gameState === 'ISLAND' && (
          <button onClick={handleGoToUnpack} style={buttonStyle}>去解包</button>
        )}
        {gameState === 'UNPACK' && (
          <button onClick={handleBack} style={buttonStyle}>返回开始</button>
        )}

        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
          点击按钮切换状态，观察是否一直正常显示。
        </p >
      </div>
    </div>
  );
}

const buttonStyle = {
  background: '#FFB7B2',
  border: 'none',
  padding: '0.8rem 1.5rem',
  borderRadius: '2rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 5px 0 #E08E8A',
  marginTop: '1rem'
};
