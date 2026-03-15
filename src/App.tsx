import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#87CEEB', // 天蓝色
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>基础测试</h1>
      <p style={{ fontSize: '1.5rem' }}>计数器: {count}</p >
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          background: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        点击增加
      </button>
    </div>
  );
}
