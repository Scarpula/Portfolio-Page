import * as THREE from 'three';

interface MacbookScreenProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  texture: THREE.Texture | null;
  visible: boolean;
}

export const MacbookScreen = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  texture,
  visible
}: MacbookScreenProps) => {
  if (!visible || !texture) return null;

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 0.625]} />
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        transparent={false}
      />
    </mesh>
  );
};
