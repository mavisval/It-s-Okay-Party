import React from 'react';

export default function App() {
  return (
    <div className="h-screen w-screen bg-[#FFF9C4] flex items-center justify-center font-sans">
      <div className="relative w-full h-full max-w-[500px] max-h-[900px] bg-gradient-to-br from-[#B5EAD7] via-[#E0BBE4] to-[#FFB7B2] overflow-hidden shadow-2xl md:rounded-[3rem] md:border-[12px] md:border-white/20">
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white/30 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        
        {/* 简单的测试内容 */}
        <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem' }}>样式测试</h1>
          <p>如果看到这个，说明 Tailwind CSS 和样式都正常。</p >
        </div>
      </div>
    </div>
  );
}
