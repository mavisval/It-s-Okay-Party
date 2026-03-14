import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles, Cloud, OrbitControls, Float, Text, ContactShadows } from '@react-three/drei';
import { Eggy } from './Eggy';
import { Trouble } from '../types';

interface PlazaProps {
  onCatch: (trouble: Trouble) => void;
  eggyColor: string;
  eggyElasticity: number;
}

export const Plaza: React.FC<PlazaProps> = ({ onCatch, eggyColor, eggyElasticity }) => {
  const troubles: Trouble[] = useMemo(() => [
    { id: '1', text: '今天考试没考好，有点难过...', color: '#FFB7B2' },
    { id: '2', text: '好朋友不跟我玩了，为什么呀？', color: '#FFDAC1' },
    { id: '3', text: '弄坏了妈妈最喜欢的花瓶，我好害怕。', color: '#E2F0CB' },
    { id: '4', text: '想快点长大，但是长大好累。', color: '#B5EAD7' },
    { id: '5', text: '总是觉得自己不够优秀，好焦虑。', color: '#C7CEEA' },
    { id: '6', text: '晚上的黑影看起来好吓人，不敢睡觉。', color: '#E0BBE4' },
    { id: '7', text: '被老师批评了，心里酸酸的。', color: '#957DAD' },
    { id: '8', text: '最心爱的玩具弄丢了，找不到了。', color: '#D291BC' },
    { id: '9', text: '为什么大人总是那么忙，没空陪我？', color: '#FEC8D8' },
    { id: '10', text: '明天要上台表演，手心一直在出汗。', color: '#FFDFD3' },
  ], []);

  return (
    <div className="w-full h-full relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 8, 14], fov: 60 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={0} />
        <Sparkles count={100} scale={20} size={2} speed={0} opacity={0.4} color="#B5EAD7" />
        <Cloud opacity={0.1} speed={0} segments={20} color="#B5EAD7" position={[0, -5, -10]} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#FFF9C4" castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#E0BBE4" />

        {/* Liquid Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#E0BBE4" transparent opacity={0.4} roughness={0} metalness={0.1} />
        </mesh>

        <Eggy color={eggyColor} elasticity={eggyElasticity} position={[0, 0, 0]} scale={1.2} />

        {troubles.map((t, i) => {
          const angle = (i / troubles.length) * Math.PI * 2;
          const radius = 5 + Math.sin(i) * 1; // Slight variation in radius
          return (
            <Float key={t.id} speed={1.5 + Math.random()} rotationIntensity={1} floatIntensity={2}>
              <group position={[Math.sin(angle) * radius, 1 + Math.sin(i), Math.cos(angle) * radius]}>
                <mesh 
                  onClick={() => onCatch(t)}
                  castShadow
                >
                  <sphereGeometry args={[0.6, 32, 32]} />
                  <meshStandardMaterial 
                    color={t.color} 
                    emissive={t.color}
                    emissiveIntensity={0.6}
                    roughness={0.1} 
                    metalness={0.5} 
                  />
                </mesh>
                {/* Planet Ring */}
                <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                  <torusGeometry args={[0.9, 0.02, 16, 100]} />
                  <meshStandardMaterial color="white" transparent opacity={0.4} />
                </mesh>
                {/* Glow Light */}
                <pointLight color={t.color} intensity={0.8} distance={4} />
              </group>
            </Float>
          );
        })}

        <ContactShadows position={[0, -1.9, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <h1 className="text-3xl font-black text-jelly-purple drop-shadow-sm">苏打喷泉广场</h1>
        <p className="text-sm text-jelly-purple/70 font-bold mt-2">点击漂浮的盲盒，听听大家的心事</p>
      </div>
    </div>
  );
};
