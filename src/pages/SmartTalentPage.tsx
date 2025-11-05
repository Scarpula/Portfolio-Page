import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SmartTalentPage.css';

const SmartTalentPage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Artistry',
      description: 'AI 기반 그림 그리기 웹 애플리케이션',
      role: 'Team Leader & Full-Stack Developer',
      tech: ['React', 'Node.js', 'Python', 'AI/ML'],
      highlights: [
        '팀 리더로서 프로젝트 전체 기획 및 관리',
        'AI 이미지 생성 모델 통합',
        '실시간 협업 기능 구현',
        '프론트엔드 및 백엔드 아키텍처 설계'
      ]
    },
    {
      title: 'InvestGenius',
      description: '주식 투자 분석 및 추천 플랫폼',
      role: 'Team Leader & Full-Stack Developer',
      tech: ['React', 'TypeScript', 'Python', 'FastAPI'],
      highlights: [
        '주식 데이터 수집 및 분석 시스템 구축',
        '머신러닝 기반 투자 추천 알고리즘 개발',
        '실시간 차트 및 대시보드 구현',
        '사용자 포트폴리오 관리 기능'
      ]
    }
  ];

  return (
    <div className="detail-page smart-talent-page">
      <motion.div
        className="detail-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          ← 돌아가기
        </button>

        <motion.div
          className="page-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="page-title">스마트 인재 개발원</h1>
          <p className="page-subtitle">Team Leader & Full-Stack Developer</p>
          <div className="period">2023.03 - 2023.09</div>
        </motion.div>

        <motion.div
          className="page-description"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>
            스마트 인재 개발원에서 팀 리더 및 풀스택 개발자로서 두 개의 주요 프로젝트를 이끌었습니다.
            AI 기술을 활용한 혁신적인 웹 애플리케이션 개발과 팀 관리 경험을 쌓았습니다.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(139, 127, 255, 0.3)' }}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-role">{project.role}</div>

              <div className="tech-stack">
                {project.tech.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="highlights">
                <h4>주요 성과</h4>
                <ul>
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SmartTalentPage;
