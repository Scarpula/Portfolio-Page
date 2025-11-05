import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface MouseProps {
  position: [number, number, number];
}

export const Mouse = ({ position }: MouseProps) => {
  return (
    <group position={position}>
      {/* 마우스 본체 */}
      <mesh castShadow>
        <capsuleGeometry args={[0.045, 0.09, 8, 16]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* 마우스 왼쪽 버튼 */}
      <RoundedBox
        args={[0.038, 0.015, 0.06]}
        radius={0.003}
        position={[-0.02, 0.047, -0.015]}
        castShadow
      >
        <meshStandardMaterial
          color="#34495e"
          roughness={0.4}
          metalness={0.6}
        />
      </RoundedBox>

      {/* 마우스 오른쪽 버튼 */}
      <RoundedBox
        args={[0.038, 0.015, 0.06]}
        radius={0.003}
        position={[0.02, 0.047, -0.015]}
        castShadow
      >
        <meshStandardMaterial
          color="#34495e"
          roughness={0.4}
          metalness={0.6}
        />
      </RoundedBox>

      {/* 스크롤 휠 */}
      <mesh
        position={[0, 0.054, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.006, 0.006, 0.022, 16]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
    </group>
  );
};
