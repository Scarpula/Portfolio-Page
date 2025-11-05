import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MacbookLaptopProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
}

export const MacbookLaptop = ({ position, rotation = [0, 0, 0], onClick }: MacbookLaptopProps) => {
  const { scene } = useGLTF('/glb_asset/macbook_laptop.glb');

  useEffect(() => {
    // 그림자 설정만 적용
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      <primitive object={scene.clone()} scale={2.2} />
    </group>
  );
};

// GLB 파일 사전 로드
useGLTF.preload('/glb_asset/macbook_laptop.glb');
