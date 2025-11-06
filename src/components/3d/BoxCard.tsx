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

  // 모바일 환경 감지
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardScale = isMobile ? 0.85 : 1; // 모바일에서 카드 크기 축소

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
    <group position={position} scale={cardScale}>
      <group ref={groupRef}>
      <RoundedBox
        args={[3.2, 4.2, 0.6]}
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

      {/* 앞면 텍스트 */}
      <Text
        position={[0, 1.5, 0.35]}
        fontSize={0.32}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      <Text
        position={[0, 0.7, 0.35]}
        fontSize={0.22}
        color="rgba(255, 255, 255, 0.9)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
      >
        {subtitle}
      </Text>

      <Text
        position={[0, -0.3, 0.35]}
        fontSize={0.15}
        color="rgba(255, 255, 255, 0.7)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
        lineHeight={1.4}
      >
        {description}
      </Text>

      {hovered && (
        <Text
          position={[0, -1.5, 0.35]}
          fontSize={0.18}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          클릭하여 자세히 보기 →
        </Text>
      )}

      {/* 뒷면 텍스트 (rotation.y = Math.PI로 뒤집혀 보임) */}
      <Text
        position={[0, 1.5, -0.35]}
        fontSize={0.32}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
      >
        {title}
      </Text>

      <Text
        position={[0, 0.7, -0.35]}
        fontSize={0.22}
        color="rgba(255, 255, 255, 0.9)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
        rotation={[0, Math.PI, 0]}
      >
        {subtitle}
      </Text>

      <Text
        position={[0, -0.3, -0.35]}
        fontSize={0.15}
        color="rgba(255, 255, 255, 0.7)"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
        lineHeight={1.4}
        rotation={[0, Math.PI, 0]}
      >
        {description}
      </Text>

      {hovered && (
        <Text
          position={[0, -1.5, -0.35]}
          fontSize={0.18}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          클릭하여 자세히 보기 →
        </Text>
      )}

      {/* 테두리 효과 */}
      {hovered && (
        <RoundedBox
          args={[3.3, 4.3, 0.65]}
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
