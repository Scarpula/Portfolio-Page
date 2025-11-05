import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface BoxCardProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  description: string;
  color: string;
  link: string;
  onClick?: () => void;
}

const BoxCard = ({ position, title, subtitle, description, color, onClick }: BoxCardProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // 애니메이션: 부드러운 회전과 호버 효과
  useFrame((state) => {
    if (groupRef.current) {
      // 기본 회전 애니메이션 (계속 회전)
      groupRef.current.rotation.y += 0.005;

      // 호버 시 확대 효과
      const targetScale = hovered ? 1.15 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // 클릭 시 흔들림 효과
      if (clicked) {
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1;
      } else {
        groupRef.current.rotation.z *= 0.9;
      }
    }
  });

  return (
    <group position={position}>
      <group ref={groupRef}>
      <RoundedBox
        args={[2.5, 3.5, 0.5]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 500);
          if (onClick) onClick();
        }}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </RoundedBox>

      {/* 타이틀 텍스트 */}
      <Text
        position={[0, 1.2, 0.3]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* 서브타이틀 */}
      <Text
        position={[0, 0.6, 0.3]}
        fontSize={0.18}
        color="rgba(255, 255, 255, 0.9)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {subtitle}
      </Text>

      {/* 설명 텍스트 */}
      <Text
        position={[0, -0.2, 0.3]}
        fontSize={0.12}
        color="rgba(255, 255, 255, 0.7)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
        lineHeight={1.4}
      >
        {description}
      </Text>

      {/* 클릭 유도 텍스트 */}
      {hovered && (
        <Text
          position={[0, -1.2, 0.3]}
          fontSize={0.15}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          클릭하여 자세히 보기 →
        </Text>
      )}

      {/* 테두리 효과 */}
      {hovered && (
        <RoundedBox
          args={[2.6, 3.6, 0.51]}
          radius={0.1}
          smoothness={4}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </RoundedBox>
      )}
      </group>
    </group>
  );
};

export default BoxCard;
