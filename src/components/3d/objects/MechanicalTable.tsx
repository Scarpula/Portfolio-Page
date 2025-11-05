import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface MechanicalTableProps {
  position: [number, number, number];
}

export const MechanicalTable = ({ position }: MechanicalTableProps) => {
  const { scene } = useGLTF('/glb_asset/mechanical_table.glb');

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
    <group position={position}>
      <primitive object={scene.clone()} scale={0.8} />
    </group>
  );
};

// GLB 파일 사전 로드
useGLTF.preload('/glb_asset/mechanical_table.glb');
