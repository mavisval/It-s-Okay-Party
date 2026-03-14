import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, Sky, Stars, Sparkles, Cloud } from '@react-three/drei';
import { Eggy } from './Eggy';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

interface IslandProps {
  eggyColor: string;
  eggyElasticity: number;
}

const Ocean = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 - 2.2;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshStandardMaterial 
        color="#B5EAD7" 
        transparent 
        opacity={0.6} 
        roughness={0.1} 
        metalness={0.2}
        emissive="#B5EAD7"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const House = ({ position, color }: { position: [number, number, number], color: string }) => {
  return (
    <group position={position}>
      {/* House Base */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.7, 0.5, 4]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.2, 0.41]}>
        <planeGeometry args={[0.2, 0.4]} />
        <meshStandardMaterial color="#4A3F35" />
      </mesh>
    </group>
  );
};

export const Island: React.FC<IslandProps> = ({ eggyColor, eggyElasticity }) => {
  const [blocks, setBlocks] = useState<{ pos: [number, number, number], color: string }[]>([]);

  const triggerFirework = () => {
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const addBlock = () => {
    const x = Math.floor(Math.random() * 6) - 3;
    const z = Math.floor(Math.random() * 6) - 3;
    // Keep it on the island (radius check)
    if (Math.sqrt(x*x + z*z) > 4) return addBlock();

    const y = blocks.filter(b => b.pos[0] === x && b.pos[2] === z).length * 1.2;
    setBlocks([...blocks, { pos: [x, y, z], color: `hsl(${Math.random() * 360}, 70%, 85%)` }]);
    triggerFirework();
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[#B5EAD7] to-[#E0BBE4]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={0} />
        <Sparkles count={100} scale={30} size={2} speed={0} opacity={0.4} color="#ffffff" />
        <Cloud opacity={0.1} speed={0} segments={20} color="#ffffff" position={[0, 10, -20]} />
        <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={45} />
        <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#FFF9C4" castShadow />
        <directionalLight 
          position={[-10, 20, 10]} 
          intensity={1.2} 
          color="#FFB7B2"
          castShadow 
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <Ocean />

        {/* Central Island */}
        <mesh position={[0, -1, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[5, 5.5, 2, 32]} />
          <meshStandardMaterial color="#FFF9C4" roughness={0.8} />
        </mesh>

        <Eggy color={eggyColor} elasticity={eggyElasticity} position={[0, 0.5, 0]} scale={0.8} />

        {blocks.map((b, i) => (
          <House key={i} position={b.pos} color={b.color} />
        ))}

        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2.1} 
          maxDistance={30}
          minDistance={5}
        />
      </Canvas>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <h2 className="text-3xl font-black text-jelly-purple drop-shadow-sm">
          我的心事小岛
        </h2>
        <p className="text-jelly-purple/80 font-bold drop-shadow-sm">用治愈能量建设你的海岛家园</p>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
        <button 
          onClick={addBlock}
          className="jelly-button bg-white text-jelly-purple px-10 py-4 rounded-2xl font-black text-lg shadow-xl border-b-4 border-jelly-purple/20"
        >
          建造小房子 🏠
        </button>
      </div>
    </div>
  );
};
