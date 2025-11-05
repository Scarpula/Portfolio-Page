import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import BoxCard from '../3d/BoxCard';
import './MenuSection.css';

interface MenuSectionProps {
  canvasReady?: boolean;
}

const MenuSection = ({ canvasReady = false }: MenuSectionProps) => {
  return (
    <div className="menu-section">
      <div className="menu-content">
        <h2 className="menu-title">My Journey</h2>
        <p className="menu-subtitle">경력과 프로젝트를 탐색해보세요</p>

        <div className="canvas-container">
          {canvasReady ? (
            <Canvas
              camera={{ position: [0, 0, 8], fov: 60 }}
              gl={{ preserveDrawingBuffer: true }}
              dpr={[1, 2]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            >
            <Suspense fallback={null}>
              <color attach="background" args={['#16213e']} />
              
              {/* 조명 */}
              <ambientLight intensity={2} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <directionalLight position={[-5, 5, 5]} intensity={1.5} />
              <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" />
              
              {/* 왼쪽: 스마트 인재 개발원 */}
              <BoxCard
                position={[-4.5, 0, 0]}
                title="스마트 인재 개발원"
                subtitle="Team Leader & Full-Stack"
                description="Artistry, InvestGenius"
                color="#8B7FFF"
                link="/smart-talent"
              />

              {/* 중앙: 인공지능 사관학교 */}
              <BoxCard
                position={[0, 0, 0]}
                title="인공지능 사관학교"
                subtitle="AI & ML Projects"
                description="Linguagen"
                color="#FF6B9D"
                link="/ai-academy"
              />

              {/* 오른쪽: 아이오티플러스 */}
              <BoxCard
                position={[4.5, 0, 0]}
                title="아이오티플러스"
                subtitle="Backend Developer"
                description="CODEEP, SOLYNX, PMS, FEMS, HDMS"
                color="#00D9A3"
                link="/iotplus"
              />
            </Suspense>
          </Canvas>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: '1rem'
            }}>
              Scroll to load 3D Scene...
            </div>
          )}
        </div>

        <div className="instruction">
          <p>💡 자동으로 회전하는 카드를 확인해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
