import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  count?: number;
}

const ParticleBackground = ({ count = 2000 }: ParticleBackgroundProps) => {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const { viewport, mouse } = useThree();

  // 마우스 위치를 추적하기 위한 벡터
  const mouseVector = useRef(new THREE.Vector3());

  // 파티클 위치 생성
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // 랜덤한 위치에 파티클 배치
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // 랜덤한 속도
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, velocities };
  }, [count, viewport]);

  // 프레임마다 애니메이션 업데이트
  useFrame((state) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const { velocities } = particlesPosition;

    // 마우스 위치를 3D 공간으로 변환
    mouseVector.current.set(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );

    // 각 파티클 업데이트
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 기본 움직임
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // 마우스 인터랙션 - 마우스 근처 파티클이 밀려남
      const particlePos = new THREE.Vector3(
        positions[i3],
        positions[i3 + 1],
        positions[i3 + 2]
      );

      const distance = particlePos.distanceTo(mouseVector.current);

      if (distance < 3) {
        const force = (3 - distance) / 3;
        const direction = particlePos.sub(mouseVector.current).normalize();

        positions[i3] += direction.x * force * 0.1;
        positions[i3 + 1] += direction.y * force * 0.1;
      }

      // 경계 체크 - 화면 밖으로 나가면 반대편에서 다시 등장
      const halfWidth = viewport.width;
      const halfHeight = viewport.height;

      if (positions[i3] > halfWidth) positions[i3] = -halfWidth;
      if (positions[i3] < -halfWidth) positions[i3] = halfWidth;
      if (positions[i3 + 1] > halfHeight) positions[i3 + 1] = -halfHeight;
      if (positions[i3 + 1] < -halfHeight) positions[i3 + 1] = halfHeight;
      if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
      if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    // 연결선 그리기
    if (lines.current) {
      const linePositions: number[] = [];
      const maxDistance = 1.5; // 연결선을 그릴 최대 거리

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // 성능 최적화: 모든 파티클과 비교하지 않고 일부만
        for (let j = i + 1; j < Math.min(i + 20, count); j++) {
          const j3 = j * 3;

          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            linePositions.push(
              positions[i3], positions[i3 + 1], positions[i3 + 2],
              positions[j3], positions[j3 + 1], positions[j3 + 2]
            );
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      lines.current.geometry.dispose();
      lines.current.geometry = lineGeometry;
    }

    // 전체적인 회전 효과
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      {/* 파티클 포인트 */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlesPosition.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#667eea"
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 연결선 */}
      <lineSegments ref={lines}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#667eea"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
};

export default ParticleBackground;
