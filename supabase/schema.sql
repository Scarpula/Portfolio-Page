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

-- Insert sample data
INSERT INTO companies (name, name_en, role, period, description, color, slug, "order") VALUES
  ('스마트 인재 개발원', 'Smart Talent Academy', 'Team Leader & Full-Stack Developer', '2023.03 - 2023.09', '스마트 인재 개발원에서 팀 리더 및 풀스택 개발자로서 두 개의 주요 프로젝트를 이끌었습니다. AI 기술을 활용한 혁신적인 웹 애플리케이션 개발과 팀 관리 경험을 쌓았습니다.', '#8B7FFF', 'smart-talent', 1),
  ('인공지능 사관학교', 'AI Academy', 'AI & ML Developer', '2022.07 - 2023.01', '인공지능 사관학교에서 AI 및 머신러닝 기술을 활용한 혁신적인 언어 학습 플랫폼을 개발했습니다. 자연어 처리, 음성 인식 등 다양한 AI 기술을 프로젝트에 적용한 경험을 쌓았습니다.', '#FF6B9D', 'ai-academy', 2),
  ('아이오티플러스', 'IOT Plus', 'Backend Developer', '2021.03 - 2022.06', '아이오티플러스에서 백엔드 개발자로 다양한 IoT 및 엔터프라이즈 솔루션의 서버 개발을 담당했습니다. 대규모 시스템 아키텍처 설계와 성능 최적화 경험을 쌓았습니다.', '#00D9A3', 'iotplus', 3)
ON CONFLICT (slug) DO NOTHING;

-- Get company IDs for foreign key references
DO $$
DECLARE
  smart_talent_id UUID;
  ai_academy_id UUID;
  iotplus_id UUID;
BEGIN
  SELECT id INTO smart_talent_id FROM companies WHERE slug = 'smart-talent';
  SELECT id INTO ai_academy_id FROM companies WHERE slug = 'ai-academy';
  SELECT id INTO iotplus_id FROM companies WHERE slug = 'iotplus';

  -- Smart Talent Academy projects
  INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, "order") VALUES
    (smart_talent_id, 'Artistry', 'AI 기반 그림 그리기 웹 애플리케이션', 'Team Leader & Full-Stack Developer',
     ARRAY['React', 'Node.js', 'Python', 'AI/ML'],
     ARRAY['팀 리더로서 프로젝트 전체 기획 및 관리', 'AI 이미지 생성 모델 통합', '실시간 협업 기능 구현', '프론트엔드 및 백엔드 아키텍처 설계'], 1),
    (smart_talent_id, 'InvestGenius', '주식 투자 분석 및 추천 플랫폼', 'Team Leader & Full-Stack Developer',
     ARRAY['React', 'TypeScript', 'Python', 'FastAPI'],
     ARRAY['주식 데이터 수집 및 분석 시스템 구축', '머신러닝 기반 투자 추천 알고리즘 개발', '실시간 차트 및 대시보드 구현', '사용자 포트폴리오 관리 기능'], 2);

  -- AI Academy projects
  INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, "order") VALUES
    (ai_academy_id, 'Linguagen', '다국어 언어 학습 플랫폼', 'AI & ML Developer',
     ARRAY['Python', 'TensorFlow', 'React', 'FastAPI', 'NLP'],
     ARRAY['자연어 처리(NLP) 기반 언어 학습 시스템 개발', '음성 인식 및 발음 평가 모델 구현', '개인화된 학습 추천 알고리즘 설계', '실시간 번역 및 문법 교정 기능 구현', '사용자 학습 패턴 분석 및 시각화'], 1);

  -- IOT Plus projects
  INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, "order") VALUES
    (iotplus_id, 'CODEEP', '코드 분석 및 협업 플랫폼', 'Backend Developer',
     ARRAY['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
     ARRAY['RESTful API 설계 및 구현', '코드 분석 엔진 백엔드 개발', '데이터베이스 최적화 및 성능 개선', '실시간 협업 기능 구현'], 1),
    (iotplus_id, 'SOLYNX', 'IoT 솔루션 관리 시스템', 'Backend Developer',
     ARRAY['Python', 'FastAPI', 'MongoDB', 'MQTT'],
     ARRAY['IoT 디바이스 통신 프로토콜 구현', 'MQTT 기반 실시간 데이터 수집', '디바이스 관리 API 개발', '데이터 처리 파이프라인 구축'], 2),
    (iotplus_id, 'PMS (Project Management System)', '프로젝트 관리 시스템', 'Backend Developer',
     ARRAY['Node.js', 'Express', 'MySQL', 'Docker'],
     ARRAY['프로젝트 및 태스크 관리 API', '사용자 권한 관리 시스템', '알림 및 이메일 전송 기능', 'Docker 기반 배포 환경 구축'], 3),
    (iotplus_id, 'FEMS (Facility Energy Management System)', '시설 에너지 관리 시스템', 'Backend Developer',
     ARRAY['Python', 'Django', 'PostgreSQL', 'InfluxDB'],
     ARRAY['에너지 데이터 수집 및 분석', '시계열 데이터 처리 최적화', '에너지 사용량 예측 모델 통합', 'RESTful API 및 관리자 대시보드'], 4),
    (iotplus_id, 'HDMS (Healthcare Data Management System)', '헬스케어 데이터 관리 시스템', 'Backend Developer',
     ARRAY['Node.js', 'NestJS', 'PostgreSQL', 'Redis'],
     ARRAY['환자 데이터 관리 시스템', '보안 및 암호화 처리', 'HIPAA 준수 데이터 처리', 'API 문서화 및 테스트 자동화'], 5);
END $$;
