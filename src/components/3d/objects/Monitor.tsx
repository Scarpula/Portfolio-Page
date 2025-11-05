import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface MonitorProps {
  position: [number, number, number];
}

export const Monitor = ({ position }: MonitorProps) => {
  return (
    <group position={position}>
      {/* 모니터 스탠드 베이스 */}
      <mesh position={[0, -0.22, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* 모니터 스탠드 */}
      <RoundedBox
        args={[0.08, 0.45, 0.08]}
        radius={0.015}
        position={[0, 0.05, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#34495e"
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* 모니터 본체 */}
      <RoundedBox
        args={[1.8, 1.2, 0.12]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.75, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.8}
        />
      </RoundedBox>

      {/* 모니터 화면 */}
      <RoundedBox
        args={[1.65, 1.05, 0.015]}
        radius={0.015}
        position={[0, 0.75, 0.07]}
      >
        <meshStandardMaterial
          color="#0f4c75"
          emissive="#0f4c75"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.1}
        />
      </RoundedBox>

      {/* 화면에 텍스트 표시 */}
      <Text
        position={[0, 0.75, 0.082]}
        fontSize={0.12}
        color="#3282b8"
        anchorX="center"
        anchorY="middle"
      >
        Welcome
      </Text>
    </group>
  );
};
