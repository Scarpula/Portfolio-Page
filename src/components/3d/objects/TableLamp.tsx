import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TableLampProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  isOn: boolean;
  onClick: () => void;
}

export const TableLamp = ({ position, rotation = [0, 0, 0], isOn, onClick }: TableLampProps) => {
  const lampRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF('/glb_asset/table_lamp_olivegreen.glb');

  // 호버 애니메이션
  useFrame(() => {
    if (lampRef.current && hovered) {
      lampRef.current.position.y += Math.sin(Date.now() * 0.005) * 0.001;
    }
  });

  // GLB 모델은 원래 색상 유지

  return (
    <group
      ref={lampRef}
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene.clone()} scale={0.02} />

      {/* 호버 시 바닥 링 */}
      {hovered && (
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.15, 0.18, 32]} />
          <meshBasicMaterial
            color="#3498db"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 전등이 켜졌을 때 광원 추가 */}
      {isOn && (
        <pointLight
          position={[0, 0.3, 0]}
          intensity={2}
          distance={5}
          color="#ffffff"
          castShadow
        />
      )}
    </group>
  );
};

// GLB 파일 사전 로드
useGLTF.preload('/glb_asset/table_lamp_olivegreen.glb');
