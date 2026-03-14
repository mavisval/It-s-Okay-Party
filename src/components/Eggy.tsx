import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface EggyProps {
  color: string;
  elasticity: number;
  position?: [number, number, number];
  scale?: number;
}

export const Eggy: React.FC<EggyProps> = ({ color, elasticity, position = [0, 0, 0], scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Planet Body */}
      <Sphere ref={mesh} args={[1, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          speed={elasticity * 4}
          distort={0.25}
          radius={1}
        />
      </Sphere>
      
      {/* Planet Ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 100]} />
        <meshStandardMaterial color="white" transparent opacity={0.5} />
      </mesh>

      {/* Smiley Face */}
      <group position={[0, 0, 0.8]}>
        {/* Happy Eyes */}
        <mesh position={[0.4, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.4, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Smile Mouth */}
        <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.2, 0.02, 16, 100, Math.PI]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Blush */}
        <mesh position={[0.6, -0.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ff9999" transparent opacity={0.5} />
        </mesh>
        <mesh position={[-0.6, -0.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ff9999" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
};
