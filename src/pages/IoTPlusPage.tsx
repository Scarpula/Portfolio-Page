import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './IoTPlusPage.css';

const IoTPlusPage = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'CODEEP',
      description: '코드 분석 및 협업 플랫폼',
      role: 'Backend Developer',
      tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
      highlights: [
        'RESTful API 설계 및 구현',
        '코드 분석 엔진 백엔드 개발',
        '데이터베이스 최적화 및 성능 개선',
        '실시간 협업 기능 구현'
      ]
    },
    {
      title: 'SOLYNX',
      description: 'IoT 솔루션 관리 시스템',
      role: 'Backend Developer',
      tech: ['Python', 'FastAPI', 'MongoDB', 'MQTT'],
      highlights: [
        'IoT 디바이스 통신 프로토콜 구현',
        'MQTT 기반 실시간 데이터 수집',
        '디바이스 관리 API 개발',
        '데이터 처리 파이프라인 구축'
      ]
    },
    {
      title: 'PMS (Project Management System)',
      description: '프로젝트 관리 시스템',
      role: 'Backend Developer',
      tech: ['Node.js', 'Express', 'MySQL', 'Docker'],
      highlights: [
        '프로젝트 및 태스크 관리 API',
        '사용자 권한 관리 시스템',
        '알림 및 이메일 전송 기능',
        'Docker 기반 배포 환경 구축'
      ]
    },
    {
      title: 'FEMS (Facility Energy Management System)',
      description: '시설 에너지 관리 시스템',
      role: 'Backend Developer',
      tech: ['Python', 'Django', 'PostgreSQL', 'InfluxDB'],
      highlights: [
        '에너지 데이터 수집 및 분석',
        '시계열 데이터 처리 최적화',
        '에너지 사용량 예측 모델 통합',
        'RESTful API 및 관리자 대시보드'
      ]
    },
    {
      title: 'HDMS (Healthcare Data Management System)',
      description: '헬스케어 데이터 관리 시스템',
      role: 'Backend Developer',
      tech: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
      highlights: [
        '환자 데이터 관리 시스템',
        '보안 및 암호화 처리',
        'HIPAA 준수 데이터 처리',
        'API 문서화 및 테스트 자동화'
      ]
    }
  ];

  return (
    <div className="detail-page iotplus-page">
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
          <h1 className="page-title">아이오티플러스</h1>
          <p className="page-subtitle">Backend Developer</p>
          <div className="period">2021.03 - 2022.06</div>
        </motion.div>

        <motion.div
          className="page-description"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>
            아이오티플러스에서 백엔드 개발자로 다양한 IoT 및 엔터프라이즈 솔루션의 서버 개발을 담당했습니다.
            대규모 시스템 아키텍처 설계와 성능 최적화 경험을 쌓았습니다.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(0, 217, 163, 0.3)' }}
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

export default IoTPlusPage;
