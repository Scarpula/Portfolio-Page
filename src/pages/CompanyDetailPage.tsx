import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactFullpage from '@fullpage/react-fullpage';
import { supabase, Company, Project } from '../lib/supabase';
import './DetailPage.css';

const CompanyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const fullpageApiRef = useRef<any>(null);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch company data
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('slug', slug)
          .single();

        if (companyError) throw companyError;
        if (!companyData) {
          setError('회사 정보를 찾을 수 없습니다.');
          return;
        }

        setCompany(companyData);

        // Fetch projects for this company
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('company_id', companyData.id)
          .order('order', { ascending: true });

        if (projectsError) throw projectsError;
        setProjects(projectsData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // 마우스 휠로 횡스크롤 구현
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollDelay = 800; // 0.8초 딜레이
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      console.log('Wheel event detected:', e.deltaY);

      // 프로젝트 카드 내부 스크롤 중인지 확인
      const target = e.target as HTMLElement;
      const isInsideProjectCard = target.closest('.project-card-full');

      if (isInsideProjectCard) {
        console.log('Inside project card - allowing normal scroll');
        // 프로젝트 카드 내부에서는 일반 스크롤 허용
        return;
      }

      // 이미 스크롤 중이거나 쿨다운 중이면 무시
      const now = Date.now();
      if (isScrolling) {
        console.log('Already scrolling - preventing');
        e.preventDefault();
        return;
      }

      if (now - lastScrollTime < scrollDelay) {
        console.log('Cooldown period - preventing');
        e.preventDefault();
        return;
      }

      console.log('Checking fullpage API:', {
        apiExists: !!fullpageApiRef.current,
        moveSlideRight: typeof fullpageApiRef.current?.moveSlideRight,
        moveSlideLeft: typeof fullpageApiRef.current?.moveSlideLeft
      });

      // fullpage API가 로드되었는지 확인
      if (fullpageApiRef.current && typeof fullpageApiRef.current.moveSlideRight === 'function') {
        e.preventDefault();
        isScrolling = true;

        // 스크롤 방향에 따라 슬라이드 이동
        if (e.deltaY > 0) {
          // 아래로 스크롤 = 오른쪽 슬라이드로 이동
          console.log('Moving right');
          fullpageApiRef.current.moveSlideRight();
        } else if (e.deltaY < 0) {
          // 위로 스크롤 = 왼쪽 슬라이드로 이동
          console.log('Moving left');
          fullpageApiRef.current.moveSlideLeft();
        }

        lastScrollTime = now;

        // 스크롤 완료 후 플래그 리셋
        setTimeout(() => {
          isScrolling = false;
          console.log('Scroll cooldown reset');
        }, scrollDelay);
      } else {
        console.log('Fullpage API not available yet');
      }
    };

    // 약간의 딜레이 후 이벤트 리스너 추가 (fullpage API 초기화 대기)
    const timer = setTimeout(() => {
      window.addEventListener('wheel', handleWheel, { passive: false });
      console.log('Wheel event listener added');
      console.log('Current fullpage API state:', fullpageApiRef.current);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (loading) {
    return (
      <motion.div
        className="detail-page"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="loading-container">
          <div className="spinner-wrapper">
            <div className="spinner"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring-delayed"></div>
          </div>
          <p className="loading-text">Loading...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !company) {
    return (
      <motion.div
        className="detail-page"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="detail-content">
          <button className="back-button" onClick={() => navigate('/')}>
            ← 돌아가기
          </button>
          <div style={{ textAlign: 'center', color: 'white', marginTop: '5rem' }}>
            <div style={{ fontSize: '2rem' }}>{error || '데이터를 찾을 수 없습니다.'}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Dynamic page styling based on company color
  const pageStyle = {
    background: `linear-gradient(135deg, #1a1a2e 0%, ${company.color}22 100%)`
  };

  const titleStyle = {
    background: `linear-gradient(135deg, ${company.color} 0%, ${company.color}CC 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="back-button-fixed" onClick={() => navigate('/')}>
        ← 돌아가기
      </button>

      <ReactFullpage
        licenseKey={'OPEN-SOURCE-GPLV3-LICENSE'}
        scrollingSpeed={700}
        navigation={false}
        controlArrows={false}
        slidesNavigation={true}
        slidesNavPosition="bottom"
        normalScrollElements=".project-card-full"
        credits={{ enabled: false }}
        afterLoad={(origin, destination, direction) => {
          console.log('Slide loaded:', destination.index);
        }}
        render={({ fullpageApi }) => {
          // fullpage API를 ref에 저장
          fullpageApiRef.current = fullpageApi;
          console.log('Fullpage API initialized:', fullpageApi);
          console.log('API methods:', Object.keys(fullpageApi || {}));
          console.log('Has moveSlideRight?', typeof fullpageApi?.moveSlideRight);
          console.log('Has moveSlideLeft?', typeof fullpageApi?.moveSlideLeft);

          return (
            <ReactFullpage.Wrapper>
              {/* 단일 섹션에 모든 슬라이드를 횡스크롤로 배치 */}
              <div className="section">
                {/* 첫 번째 슬라이드: 회사 소개 */}
                <div
                  className="slide"
                  style={{ background: `linear-gradient(135deg, #1a1a2e 0%, ${company.color}22 100%)` }}
                >
                  <div className="slide-content intro-slide">
                    <motion.div
                      className="page-header"
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <h1 className="page-title" style={titleStyle}>{company.name}</h1>
                      <p className="page-subtitle">{company.role}</p>
                      <div className="period">{company.period}</div>
                    </motion.div>

                    <motion.div
                      className="page-description"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <p>{company.description}</p>
                    </motion.div>

                    <div className="navigation-hint">
                      {isMobile ? (
                        <p className="mobile-hint">→ Slide</p>
                      ) : (
                        <p className="desktop-hint">→ Scroll</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 프로젝트 슬라이드들 */}
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="slide"
                    style={{ background: `linear-gradient(135deg, #1a1a2e 0%, ${company.color}22 100%)` }}
                  >
                    <div className="slide-content project-slide">
                      <motion.div
                        className="project-card-full"
                        style={{
                          background: `linear-gradient(135deg, ${company.color}1A 0%, ${company.color}0D 100%)`,
                          border: `2px solid ${company.color}4D`
                        }}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <div className="project-number" style={{ color: company.color }}>
                          PROJECT {index + 1}
                        </div>

                        <h2 className="project-title-large" style={{ color: company.color }}>
                          {project.title}
                        </h2>

                        <p className="project-description-large">{project.description}</p>

                        <div className="project-role-large">{project.role}</div>

                        <div className="tech-stack-large">
                          <h3>기술 스택</h3>
                          <div className="tech-tags">
                            {project.tech_stack.map(tech => (
                              <span
                                key={tech}
                                className="tech-tag-large"
                                style={{
                                  background: `${company.color}33`,
                                  color: company.color,
                                  border: `2px solid ${company.color}66`
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="highlights-large">
                          <h3>주요 성과</h3>
                          <ul>
                            {project.highlights.map((highlight, i) => (
                              <li key={i} style={{ color: `${company.color}` }}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </motion.div>
  );
};

export default CompanyDetailPage;
