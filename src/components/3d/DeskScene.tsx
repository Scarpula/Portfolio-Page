import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MechanicalTable } from './objects/MechanicalTable';
import { MacbookLaptop } from './objects/MacbookLaptop';
import { TableLamp } from './objects/TableLamp';
import { ComputerMouse } from './objects/ComputerMouse';
import { MacbookScreen } from './objects/MacbookScreen';
import { useSnakeGameTexture } from './games/SnakeGameTexture';

interface DeskSceneProps {
  onLightToggle?: (isOn: boolean) => void;
}

const DeskScene = ({ onLightToggle }: DeskSceneProps) => {
  const [lightOn, setLightOn] = useState(true);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const macbookRef = useRef<THREE.Group>(null);

  // 게임 텍스처 생성
  const { texture: gameTexture } = useSnakeGameTexture({
    isActive: gameActive,
    onScoreChange: (score) => console.log('Score:', score)
  });

  // 부드러운 회전 애니메이션
  useFrame((state) => {
    if (groupRef.current && !zoomedIn) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    // 줌인/줌아웃 애니메이션
    if (zoomedIn) {
      // 맥북 화면으로 줌인
      const targetCameraPosition = new THREE.Vector3(0.23, 0.14, 0.97);
      const targetLookAt = new THREE.Vector3(0, 0, 0);

      state.camera.position.lerp(targetCameraPosition, 0.10);
      
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt, 0.08);
        controlsRef.current.update();
      }
    } else if (isAnimating) {
      // 원래 초기 위치로 부드럽게 돌아가기 (애니메이션 중)
      const defaultCameraPosition = new THREE.Vector3(4, 3, 4);
      const defaultLookAt = new THREE.Vector3(0, 0, 0);
      
      // 현재 위치와 목표 위치의 거리 계산
      const distance = state.camera.position.distanceTo(defaultCameraPosition);
      
      // 거리가 충분히 가까우면 애니메이션 완료
      if (distance > 0.1) {
        state.camera.position.lerp(defaultCameraPosition, 0.05);
        
        if (controlsRef.current) {
          controlsRef.current.target.lerp(defaultLookAt, 0.05);
          controlsRef.current.update();
        }
      } else {
        // 애니메이션 완료 - OrbitControls가 자유롭게 작동
        setIsAnimating(false);
      }
    }
    // isAnimating이 false이고 zoomedIn도 false면 OrbitControls가 완전히 자유롭게 작동
  });

  const handleLampClick = () => {
    const newState = !lightOn;
    setLightOn(newState);
    onLightToggle?.(newState);
  };

  const handleMacbookClick = () => {
    if (zoomedIn) {
      // 줌아웃: 초기 위치로 돌아가는 애니메이션 시작 및 게임 종료
      setZoomedIn(false);
      setIsAnimating(true);
      setGameActive(false);
    } else {
      // 줌인
      setZoomedIn(true);
      setIsAnimating(false);
    }
  };

  const handleMouseClick = (e?: any) => {
    if (e) e.stopPropagation();
    // 게임이 꺼져있을 때만 켤 수 있음 (마우스는 게임 시작만 가능)
    if (!gameActive) {
      console.log('Mouse clicked! Starting game');
      setGameActive(true);
    }
  };

  return (
    <>
      {/* 카메라 컨트롤 - 자유로운 시점 조작 가능 */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        enableZoom={false} // 스크롤 줌 비활성화
        minDistance={2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
        enabled={!zoomedIn && !isAnimating} // 줌인 중이거나 애니메이션 중에는 비활성화
      />

      <group ref={groupRef} position={[0, -2, 0]}>
        {/* 조명 설정 */}
        <ambientLight intensity={lightOn ? 1.2 : 0.8} color="#ffffff" />

      {/* 전등이 켜졌을 때 추가 조명 - 밝은 흰색 */}
      {lightOn && (
        <>
          <pointLight
            position={[2, 3, 0]}
            intensity={3}
            distance={12}
            decay={2}
            color="#ffffff"
          />
          <spotLight
            position={[2, 4, 0]}
            angle={0.7}
            penumbra={0.8}
            intensity={2}
            castShadow
            color="#f8f8ff"
          />
          <hemisphereLight
            args={['#ffffff', '#f0f0f0', 0.6]}
          />
        </>
      )}

      {/* 방향성 조명 */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={lightOn ? 1.5 : 1.0}
        color="#ffffff"
        castShadow
      />

      {/* 3D 오브젝트들 - GLB 모델 사용 */}
      <MechanicalTable position={[0, 0, 0]} />
      <group ref={macbookRef} position={[-15.9, 0.74, 1.5]} rotation={[0, Math.PI / 8, 0]}>
        <MacbookLaptop
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          onClick={handleMacbookClick}
        />

        {/* 맥북 화면 - 게임 표시 */}
        <MacbookScreen
          position={[14.7, 1.11, 4.22]}
          rotation={[-0.23, 0, 0]}
          scale={[0.68, 0.82, 1]}
          texture={gameTexture}
          visible={gameActive}
        />
      </group>

      <TableLamp
        position={[1.0, 1.6, 0.3]}
        rotation={[0, Math.PI / 2, 0]}
        isOn={lightOn}
        onClick={handleLampClick}
      />

      <ComputerMouse
        position={[0.2, 1.68, 0.5]}
        rotation={[0, Math.PI / 1.5 + Math.PI, 0]}
        scale={0.1}
        onClick={handleMouseClick}
      />

        {/* 바닥 (그림자 받기) - GLB 모델의 그림자만 표시 */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} transparent />
        </mesh>
      </group>

    </>
  );
};

export default DeskScene;
