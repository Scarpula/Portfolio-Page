-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  role TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  highlights TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_order ON companies("order");
CREATE INDEX IF NOT EXISTS idx_projects_company_id ON projects(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects("order");

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on companies" ON companies
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Insert company data (경력 순서: IOTPLUS → AI Academy → Smart Talent)
INSERT INTO companies (name, name_en, role, period, description, color, slug, "order") VALUES
  ('아이오티플러스', 'IOT Plus', 'AI & Backend Developer', '2024.11 - 2025.11', 'AI 모델 개발부터 MLOps 배포, 산업 현장 데이터 수집 및 처리까지 담당한 풀스택 개발 경험을 쌓았습니다. 태양광 발전량 예측 시계열 모델(RNN/LSTM), 실시간 MQTT 데이터 파이프라인, RS-485(Modbus) 프로토콜 구현을 통한 대용량 데이터 수집 시스템을 개발했습니다.', '#00D9A3', 'iotplus', 1),
  ('인공지능 사관학교', 'AI Academy', 'AI & ML Developer', '2024.08 - 2024.11', 'ML/LLM을 활용한 개인화 학습 플랫폼 개발 경험을 쌓았습니다. 사용자 게임 플레이 로그 기반 성향 분류 모델(Scikit-learn)과 LLM 프롬프트 엔지니어링을 통해 맞춤형 영어 학습 콘텐츠를 동적으로 생성하는 시스템을 구현했습니다.', '#FF6B9D', 'ai-academy', 2),
  ('스마트 인재 개발원', 'Smart Talent Academy', 'Team Leader & Full-Stack Developer', '2024.01 - 2024.08', 'LLM 기반 투자 분석 플랫폼과 미술 작품 중개 플랫폼 프로젝트의 팀 리더로서 전체 기획, 개발, 협업 관리를 담당했습니다. LLaMA3 파인튜닝, RAG 파이프라인 구축(LangChain), 풀스택 개발, Jira/Git 기반 형상 관리 경험을 쌓았습니다.', '#8B7FFF', 'smart-talent', 3)
ON CONFLICT (slug) DO NOTHING;

-- Get company IDs for foreign key references
DO $$
DECLARE
  iotplus_id UUID;
  ai_academy_id UUID;
  smart_talent_id UUID;
BEGIN
  SELECT id INTO iotplus_id FROM companies WHERE slug = 'iotplus';
  SELECT id INTO ai_academy_id FROM companies WHERE slug = 'ai-academy';
  SELECT id INTO smart_talent_id FROM companies WHERE slug = 'smart-talent';

  -- IOT Plus projects
  INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, github_url, demo_url, "order") VALUES
    (iotplus_id, '서원(주) MES', 'AI 기반 스마트공장 제조실행시스템 구축', 'Full-Stack Developer (AI & Backend)',
     ARRAY['Scikit-learn', 'Pandas', 'Spring Boot', 'JPA', 'React', 'MQTT', 'RS-485', 'Modbus', 'PostgreSQL', 'TimeScaleDB'],
     ARRAY[
       'Pandas, Scikit-learn을 활용한 AI 상관분석 모듈 개발 (온도/습도와 제품 불량률 간 통계적 관계 분석)',
       'Spring Boot와 React를 활용한 생산관리(작업지시, 배합일지) 및 기준정보 관리 기능 개발',
       'PLC 및 센서 데이터를 RS-485(Modbus), MQTT 프로토콜로 수집하여 실시간 대시보드 및 AI 분석 모듈에 연동',
       'PostgreSQL 17 및 TimeScaleDB 하이퍼테이블 설계를 통한 시계열 데이터 처리 최적화'
     ], NULL, NULL, 1),

    (iotplus_id, 'SOLYNX', 'AI 기반 태양광 발전량 예측 및 제어 시스템', 'AI & Backend Developer',
     ARRAY['TensorFlow', 'Keras', 'Python', 'FastAPI', 'MQTT', 'Docker', 'RNN/LSTM', 'PostgreSQL', 'TimeScaleDB'],
     ARRAY[
       'TensorFlow(Keras)로 RNN/LSTM 기반 시계열 예측 모델 구현 및 발전량 예측 정확도 확보',
       'MQTT 브로커와 연동한 실시간 센서 데이터 처리 백엔드 시스템 설계 및 구축',
       '하이퍼 파라미터 튜닝을 통한 모델 성능 최적화 (RMSE, MAE 지표 관리)',
       'Docker 기반 MLOps 환경 구축 및 FastAPI/Flask를 통한 모델 서빙 API 개발',
       'PostgreSQL 17 및 TimeScaleDB 하이퍼테이블을 통한 대용량 시계열 데이터 처리'
     ], NULL, NULL, 2),

    (iotplus_id, 'PMS (Project Management System)', '산업용 데이터 수집 시스템', 'Data Engineer & Backend Developer',
     ARRAY['Python', 'RS-485', 'Modbus', 'TCP/IP', 'MQTT'],
     ARRAY[
       'RS-485(Modbus) 및 TCP/IP 프로토콜 분석 및 Python 구현',
       '1초 단위 데이터 손실 없이 폴링하는 데이터 수집기 개발',
       '수집 데이터를 AI 학습용 DB 및 실시간 모니터링 플랫폼(MQTT)으로 전송하는 시스템 구축'
     ], NULL, NULL, 3),

    (iotplus_id, 'FEMS (Facility Energy Management System)', '시설 에너지 관리 시스템', 'Data Engineer & Backend Developer',
     ARRAY['Python', 'Django', 'PostgreSQL', 'InfluxDB', 'RS-485', 'Modbus'],
     ARRAY[
       '30개 기업 공장의 대규모 전력 데이터 수집 시스템 구축',
       'AI 분석(이상치 탐지, 부하 예측)을 위한 전처리 파이프라인 설계',
       '시계열 데이터 처리 최적화 및 InfluxDB 연동',
       'RESTful API 및 관리자 대시보드 개발'
     ], NULL, NULL, 4),

    (iotplus_id, 'CODEEP', '리눅스 기반 파이썬 코딩 학습 플랫폼', 'Backend Developer',
     ARRAY['Python', 'Linux', 'Jetson Nano', 'GPIO', 'Sensor Integration'],
     ARRAY[
       'Jetson Nano 보드를 활용한 임베디드 시스템 개발',
       'GPIO 제어를 통한 센서 연동 코딩 학습 환경 구축',
       '파이썬 기반 센서 데이터 수집 및 처리 시스템 구현',
       '리눅스 환경에서의 하드웨어 제어 교육 플랫폼 개발'
     ], NULL, NULL, 5),

    (iotplus_id, 'HDMS (Healthcare Data Management System)', '헬스케어 데이터 관리 시스템', 'Backend Developer',
     ARRAY['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
     ARRAY[
       '환자 데이터 관리 시스템 설계 및 구현',
       '보안 및 암호화 처리 (HIPAA 준수)',
       'HIPAA 준수 데이터 처리 파이프라인 구축',
       'API 문서화 및 테스트 자동화'
     ], NULL, NULL, 6);

  -- AI Academy projects
  INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, github_url, demo_url, "order") VALUES
    (ai_academy_id, 'Linguagen', 'ML/LLM 기반 개인화 영어 학습 게임 플랫폼', 'AI & Backend Developer',
     ARRAY['Python', 'Scikit-learn', 'GPT-3.5', 'Flask', 'Pandas', 'PostgreSQL'],
     ARRAY[
       'Scikit-learn을 활용한 콘텐츠 기반 필터링(Content-based Filtering) 모델 구현',
       '사용자 게임 플레이 로그 기반 성향 분류 (공격형, 방어형, 탐험형)',
       'LLM(GPT) 프롬프트에 사용자 성향을 동적으로 주입하여 개인화된 학습 문제 생성',
       '사용자 피드백 루프 설계 및 모델 학습 데이터 축적 구조 구현',
       '성능 평가 지표 관리 및 모델 지속적 개선'
     ], NULL, NULL, 1);

  -- Smart Talent Academy projects
  INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, github_url, demo_url, "order") VALUES
    (smart_talent_id, 'InvestGenius', 'LLM 기반 투자 성향 분석 및 RAG 큐레이션 플랫폼', 'Team Leader & Full-Stack Developer',
     ARRAY['LLaMA3', 'GPT-3.5', 'LangChain', 'HuggingFace Transformers', 'Python', 'Flask', 'Spring Boot', 'JPA', 'React', 'MySQL'],
     ARRAY[
       '팀장으로서 프로젝트 전체 기획, 개발, 협업 관리 주도',
       'LLaMA3 모델 Domain-Specific 파인튜닝 및 성능 평가 수행',
       'LangChain을 활용한 RAG(Retrieval-Augmented Generation) 파이프라인 설계 및 구축하여 환각(Hallucination) 최소화',
       '실시간 주식 데이터 및 기업 재무제표를 참조하는 시스템 구현',
       'Python(Flask) 기반 LLM 추론 API 서버 구축 및 Spring Boot와 비동기 통신 설계',
       'React 기반 사용자 인터페이스(UI) 및 데이터 시각화 차트 구현'
     ], NULL, NULL, 1),

    (smart_talent_id, 'Artistry', '미술 작품 중개 플랫폼', 'Team Leader & Full-Stack Developer',
     ARRAY['JSP', 'Servlet', 'WebSocket', 'jQuery', 'Jira', 'Git', 'GitHub', 'OracleDB'],
     ARRAY[
       '팀 리더로서 Jira, Git, GitHub을 활용한 형상 관리 및 협업 주도',
       '프로젝트 일정 및 리스크 관리 총괄',
       'JSP/Servlet 기반 백엔드 개발',
       'WebSocket을 활용한 실시간 채팅 기능 구현',
       '카카오/네이버 SNS 로그인 API 연동',
       '아임포트 결제 API 연동'
     ], NULL, NULL, 2);
END $$;
