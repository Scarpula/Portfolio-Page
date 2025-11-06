import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../3d/BoxCard';
import { supabase, Company } from '../../lib/supabase';
import './MenuSection.css';

interface MenuSectionProps {
  canvasReady?: boolean;
}

const MenuSection = ({ canvasReady = false }: MenuSectionProps) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('order', { ascending: true });

        if (error) throw error;
        setCompanies(data || []);
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    if (canvasReady) {
      fetchCompanies();
    }
  }, [canvasReady]);

  const getCardPosition = (index: number, total: number): [number, number, number] => {
    // 모바일 환경 감지
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const spacing = isMobile ? 4 : 5.5; // 카드 크기에 맞춰 간격 증가

    if (total === 1) return [0, 0, 0];
    if (total === 2) return index === 0 ? [-spacing * 0.6, 0, 0] : [spacing * 0.6, 0, 0];
    if (total === 3) return index === 0 ? [-spacing, 0, 0] : index === 1 ? [0, 0, 0] : [spacing, 0, 0];

    const startX = -(total - 1) * spacing / 2;
    return [startX + index * spacing, 0, 0];
  };

  return (
    <div className="menu-section">
      <div className="menu-content">
        <h2 className="menu-title">My Journey</h2>
        <p className="menu-subtitle">경력과 프로젝트를 탐색해보세요</p>

        <div className="canvas-container">
          {canvasReady ? (
            <Canvas
              camera={{
                position: [0, 0, typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 8],
                fov: typeof window !== 'undefined' && window.innerWidth < 768 ? 70 : 60
              }}
              gl={{ preserveDrawingBuffer: true }}
              dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1.5] : [1, 2]}
              performance={{ min: 0.5 }}
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

              {!loading && companies.length > 0 && companies.map((company, index) => (
                <BoxCard
                  key={company.id}
                  position={getCardPosition(index, companies.length)}
                  title={company.name}
                  subtitle={company.role}               
                  description={company.name_en}
                  color={company.color}
                  link={`/company/${company.slug}`}
                  onClick={() => navigate(`/company/${company.slug}`)}
                />
              ))}
            </Suspense>
          </Canvas>
          ) : (
            <div className="canvas-loading">
              <div className="canvas-spinner">
                <div className="cube-spinner">
                  <div className="cube-face cube-front"></div>
                  <div className="cube-face cube-back"></div>
                  <div className="cube-face cube-left"></div>
                  <div className="cube-face cube-right"></div>
                  <div className="cube-face cube-top"></div>
                  <div className="cube-face cube-bottom"></div>
                </div>
              </div>
              <p className="canvas-loading-text">Scroll to load 3D Scene...</p>
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
