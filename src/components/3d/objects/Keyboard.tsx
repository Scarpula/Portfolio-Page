import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface KeyboardProps {
  position: [number, number, number];
}

export const Keyboard = ({ position }: KeyboardProps) => {
  // 키 배열 생성
  const keys = [];
  const rows = 5;
  const keysPerRow = 15;
  const keySize = 0.06;
  const keySpacing = 0.072;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < keysPerRow; col++) {
      keys.push({
        position: [
          (col - keysPerRow / 2) * keySpacing,
          0.022,
          (row - rows / 2) * keySpacing,
        ] as [number, number, number],
      });
    }
  }

  return (
    <group position={position} rotation={[0.1, 0, 0]}>
      {/* 키보드 베이스 */}
      <RoundedBox
        args={[1.2, 0.045, 0.42]}
        radius={0.015}
        smoothness={4}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.4}
          metalness={0.6}
        />
      </RoundedBox>

      {/* 키들 */}
      {keys.map((key, index) => (
        <RoundedBox
          key={index}
          args={[keySize, 0.015, keySize]}
          radius={0.003}
          position={key.position}
          castShadow
        >
          <meshStandardMaterial
            color="#34495e"
            roughness={0.5}
            metalness={0.5}
          />
        </RoundedBox>
      ))}
    </group>
  );
};
