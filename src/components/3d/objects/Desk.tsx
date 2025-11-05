import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface DeskProps {
  position: [number, number, number];
}

export const Desk = ({ position }: DeskProps) => {
  return (
    <group position={position}>
      {/* 책상 상판 */}
      <RoundedBox
        args={[6, 0.15, 3]}
        radius={0.03}
        smoothness={4}
        position={[0, 1.2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#8B7355"
          roughness={0.6}
          metalness={0.1}
        />
      </RoundedBox>

      {/* 책상 다리 - 왼쪽 앞 */}
      <RoundedBox
        args={[0.12, 1.2, 0.12]}
        radius={0.015}
        position={[-2.7, 0.6, 1.35]}
        castShadow
      >
        <meshStandardMaterial
          color="#6B5844"
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>

      {/* 책상 다리 - 오른쪽 앞 */}
      <RoundedBox
        args={[0.12, 1.2, 0.12]}
        radius={0.015}
        position={[2.7, 0.6, 1.35]}
        castShadow
      >
        <meshStandardMaterial
          color="#6B5844"
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>

      {/* 책상 다리 - 왼쪽 뒤 */}
      <RoundedBox
        args={[0.12, 1.2, 0.12]}
        radius={0.015}
        position={[-2.7, 0.6, -1.35]}
        castShadow
      >
        <meshStandardMaterial
          color="#6B5844"
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>

      {/* 책상 다리 - 오른쪽 뒤 */}
      <RoundedBox
        args={[0.12, 1.2, 0.12]}
        radius={0.015}
        position={[2.7, 0.6, -1.35]}
        castShadow
      >
        <meshStandardMaterial
          color="#6B5844"
          roughness={0.7}
          metalness={0.1}
        />
      </RoundedBox>
    </group>
  );
};
