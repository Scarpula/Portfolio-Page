import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AIAcademyPage.css';

const AIAcademyPage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Linguagen',
      description: '다국어 언어 학습 플랫폼',
      role: 'AI & ML Developer',
      tech: ['Python', 'TensorFlow', 'React', 'FastAPI', 'NLP'],
      highlights: [
        '자연어 처리(NLP) 기반 언어 학습 시스템 개발',
        '음성 인식 및 발음 평가 모델 구현',
        '개인화된 학습 추천 알고리즘 설계',
        '실시간 번역 및 문법 교정 기능 구현',
        '사용자 학습 패턴 분석 및 시각화'
      ]
    }
  ];

  return (
    <div className="detail-page ai-academy-page">
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
          <h1 className="page-title">인공지능 사관학교</h1>
          <p className="page-subtitle">AI & ML Developer</p>
          <div className="period">2022.07 - 2023.01</div>
        </motion.div>

        <motion.div
          className="page-description"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>
            인공지능 사관학교에서 AI 및 머신러닝 기술을 활용한 혁신적인 언어 학습 플랫폼을 개발했습니다.
            자연어 처리, 음성 인식 등 다양한 AI 기술을 프로젝트에 적용한 경험을 쌓았습니다.
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
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(255, 107, 157, 0.3)' }}
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

export default AIAcademyPage;
