import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ComputerMouseProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}

export const ComputerMouse = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.4,
  onClick
}: ComputerMouseProps) => {
  const { scene } = useGLTF('/glb_asset/computer_mouse.glb');

  // 모델 복사본 생성
  const clonedScene = scene.clone();

  // 그림자 설정 및 클릭 가능하게 설정
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default';
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );
};

// GLB 파일 프리로드
useGLTF.preload('/glb_asset/computer_mouse.glb');
