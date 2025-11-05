import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LampProps {
  position: [number, number, number];
  isOn: boolean;
  onClick: () => void;
}

export const Lamp = ({ position, isOn, onClick }: LampProps) => {
  const lampRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // 호버 애니메이션
  useFrame(() => {
    if (lampRef.current && hovered) {
      lampRef.current.position.y += Math.sin(Date.now() * 0.005) * 0.001;
    }
  });

  return (
    <group
      ref={lampRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{ cursor: hovered ? 'pointer' : 'auto' } as any}
    >
      {/* 전등 베이스 - 원형 */}
      <mesh position={[0, 0.045, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.27, 0.09, 32]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* 베이스 상단 링 */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.03, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 메인 기둥 - 약간 테이퍼 */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.06, 0.9, 16]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* 상단 관절 구 */}
      <mesh position={[0, 0.97, 0]} castShadow>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 조절 가능한 암 (연결부) */}
      <mesh position={[0.12, 1.02, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.038, 0.045, 0.3, 16]} />
        <meshStandardMaterial
          color="#34495e"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* 중간 관절 */}
      <mesh position={[0.27, 1.11, 0]} castShadow>
        <sphereGeometry args={[0.068, 20, 20]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 램프 헤드 암 */}
      <mesh position={[0.45, 1.17, 0]} rotation={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.03, 0.038, 0.38, 16]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* 램프 헤드 연결부 */}
      <mesh position={[0.63, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 램프 갓 (셰이드) - 더 부드러운 원뿔 */}
      <group position={[0.63, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* 외부 갓 */}
        <mesh castShadow>
          <coneGeometry args={[0.27, 0.33, 32, 1, false]} />
          <meshStandardMaterial
            color={hovered ? '#3498db' : '#2c3e50'}
            roughness={0.3}
            metalness={0.7}
            emissive={hovered ? '#2980b9' : '#000000'}
            emissiveIntensity={hovered ? 0.3 : 0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 내부 반사판 */}
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.255, 0.315, 32, 1, false]} />
          <meshStandardMaterial
            color={isOn ? '#FFF9E3' : '#E0E0E0'}
            roughness={0.1}
            metalness={0.9}
            emissive={isOn ? '#FFD700' : '#000000'}
            emissiveIntensity={isOn ? 0.8 : 0}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 갓 테두리 */}
        <mesh position={[0.165, 0, 0]}>
          <torusGeometry args={[0.27, 0.012, 8, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* 전구 (더 사실적) */}
      <mesh position={[0.78, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshStandardMaterial
          color={isOn ? '#FFF9E3' : '#D0D0D0'}
          emissive={isOn ? '#FFD700' : '#000000'}
          emissiveIntensity={isOn ? 1.5 : 0}
          roughness={0.1}
          metalness={0.05}
          transparent
          opacity={isOn ? 1 : 0.8}
        />
      </mesh>

      {/* 전구 하이라이트 */}
      {isOn && (
        <mesh position={[0.81, 1.28, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.9}
          />
        </mesh>
      )}

      {/* 호버 시 바닥 링 */}
      {hovered && (
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.345, 32]} />
          <meshBasicMaterial
            color="#3498db"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 클릭 안내 텍스트 */}
      {hovered && (
        <mesh position={[0, -0.15, 0]}>
          <planeGeometry args={[0.45, 0.12]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  );
};
