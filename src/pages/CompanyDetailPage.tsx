import { useEffect, useState } from 'react';
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
        <div className="detail-content">
          <div style={{ textAlign: 'center', color: 'white', marginTop: '5rem' }}>
            <div style={{ fontSize: '2rem' }}>로딩 중...</div>
          </div>
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
        scrollingSpeed={1000}
        navigation
        navigationPosition="right"
        controlArrows={true}
        slidesNavigation={true}
        slidesNavPosition="bottom"
        credits={{ enabled: false }}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              {/* 첫 번째 슬라이드: 회사 소개 */}
              <div
                className="section"
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
                    <p>→ 프로젝트를 확인하려면 오른쪽으로 스크롤하세요</p>
                  </div>
                </div>
              </div>

              {/* 프로젝트 슬라이드들 */}
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="section"
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
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </motion.div>
  );
};

export default CompanyDetailPage;
