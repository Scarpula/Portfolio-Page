# Supabase 설정 가이드

이 문서는 포트폴리오 웹사이트에 Supabase를 설정하는 상세한 가이드입니다.

## 1. Supabase 프로젝트 생성

### 1.1. Supabase 계정 생성
1. [Supabase](https://supabase.com)에 접속합니다.
2. "Start your project" 버튼을 클릭합니다.
3. GitHub 계정으로 로그인하거나 이메일로 가입합니다.

### 1.2. 새 프로젝트 생성
1. 대시보드에서 "New Project" 버튼을 클릭합니다.
2. Organization을 선택하거나 새로 생성합니다.
3. 프로젝트 정보를 입력합니다:
   - **Project Name**: `portfolio-website` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (저장해두세요!)
   - **Region**: `Northeast Asia (Seoul)` 또는 가장 가까운 지역
   - **Pricing Plan**: `Free` (무료 플랜)
4. "Create new project" 버튼을 클릭합니다.
5. 프로젝트가 생성될 때까지 1-2분 기다립니다.

## 2. API 키 확인

### 2.1. Project URL과 API Key 가져오기
1. 프로젝트 대시보드에서 좌측 메뉴의 ⚙️ **Settings**를 클릭합니다.
2. **API** 섹션을 클릭합니다.
3. 다음 정보를 복사합니다:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **API Key** > **anon public**: `eyJhbGc...` (긴 문자열)

### 2.2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성합니다:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

`.env` 파일을 열고 복사한 정보를 입력합니다:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **주의**: `.env` 파일은 절대 Git에 커밋하지 마세요! (`.gitignore`에 이미 추가되어 있습니다)

## 3. 데이터베이스 스키마 생성

### 3.1. SQL Editor 열기
1. 좌측 메뉴에서 🗂️ **SQL Editor**를 클릭합니다.
2. "New query" 버튼을 클릭합니다.

### 3.2. 스키마 SQL 실행
1. 프로젝트의 `supabase/schema.sql` 파일을 엽니다.
2. 파일의 전체 내용을 복사합니다.
3. Supabase SQL Editor에 붙여넣습니다.
4. 우측 하단의 **Run** 버튼 (또는 `Ctrl+Enter`)을 클릭합니다.

### 3.3. 실행 결과 확인
성공적으로 실행되면:
- "Success. No rows returned" 메시지가 표시됩니다.
- 좌측 메뉴의 📊 **Table Editor**에서 `companies`와 `projects` 테이블을 확인할 수 있습니다.

## 4. 데이터 확인

### 4.1. Companies 테이블
1. 좌측 메뉴에서 📊 **Table Editor**를 클릭합니다.
2. `companies` 테이블을 선택합니다.
3. 다음 3개의 행이 경력 순서대로 있는지 확인합니다:
   - **아이오티플러스** (order: 1) - 2021.03 - 2022.06
   - **인공지능 사관학교** (order: 2) - 2022.07 - 2023.01
   - **스마트 인재 개발원** (order: 3) - 2023.03 - 2023.09

### 4.2. Projects 테이블
1. `projects` 테이블을 선택합니다.
2. 총 8개의 프로젝트가 있는지 확인합니다:
   - **아이오티플러스**: 5개 (SOLYNX, PMS, FEMS, CODEEP, HDMS)
   - **인공지능 사관학교**: 1개 (Linguagen)
   - **스마트 인재 개발원**: 2개 (InvestGenius, Artistry)

## 5. RLS(Row Level Security) 정책 확인

### 5.1. RLS 정책이란?
RLS는 테이블 레벨의 보안 정책으로, 누가 어떤 데이터에 접근할 수 있는지 제어합니다.

### 5.2. 정책 확인
1. 좌측 메뉴에서 🔐 **Authentication** > **Policies**를 클릭합니다.
2. 다음 정책들이 활성화되어 있는지 확인합니다:
   - **companies 테이블**: "Allow public read access on companies"
   - **projects 테이블**: "Allow public read access on projects"

이 정책들은 익명 사용자(로그인하지 않은 사용자)도 데이터를 읽을 수 있도록 허용합니다.

## 6. 데이터 수정 및 추가

### 6.1. Table Editor에서 직접 수정
1. 📊 **Table Editor**에서 테이블을 선택합니다.
2. 행을 클릭하여 데이터를 수정합니다.
3. "+ Insert row" 버튼으로 새 행을 추가할 수 있습니다.

### 6.2. SQL로 데이터 추가
새로운 회사를 추가하려면 SQL Editor에서 다음과 같이 실행합니다:

```sql
-- 회사 추가
INSERT INTO companies (name, name_en, role, period, description, color, slug, "order")
VALUES (
  '새로운 회사',
  'New Company',
  'Software Engineer',
  '2024.01 - Present',
  '회사 설명',
  '#FF5733',
  'new-company',
  4
);

-- 방금 추가한 회사의 ID 확인
SELECT id, name FROM companies WHERE slug = 'new-company';

-- 프로젝트 추가 (위에서 확인한 ID를 사용)
INSERT INTO projects (company_id, title, description, role, tech_stack, highlights, "order")
VALUES (
  '여기에-회사-ID-입력',
  '프로젝트 이름',
  '프로젝트 설명',
  'Developer',
  ARRAY['React', 'Node.js'],
  ARRAY['주요 성과 1', '주요 성과 2'],
  1
);
```

## 7. 트러블슈팅

### 문제: "Invalid API key" 오류
- `.env` 파일의 API 키가 올바른지 확인하세요.
- API 키에 공백이나 개행이 없는지 확인하세요.
- 개발 서버를 재시작하세요 (`npm run dev`).

### 문제: "relation does not exist" 오류
- `supabase/schema.sql`이 올바르게 실행되었는지 확인하세요.
- Table Editor에서 테이블이 생성되었는지 확인하세요.

### 문제: 데이터가 로드되지 않음
1. 브라우저 개발자 도구 (F12)의 Console 탭을 확인하세요.
2. Network 탭에서 Supabase API 요청이 성공했는지 확인하세요.
3. RLS 정책이 올바르게 설정되었는지 확인하세요.

### 문제: CORS 오류
- Supabase는 기본적으로 모든 origin을 허용하므로 CORS 오류가 발생하지 않아야 합니다.
- 만약 발생한다면 Supabase Settings > API > API Settings에서 확인하세요.

## 8. 프로덕션 배포 시 주의사항

### 8.1. 환경 변수 설정
배포 플랫폼(Vercel, Netlify, Cloudflare Pages 등)에서 환경 변수를 설정하세요:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 8.2. 보안 확인
- `anon` 키는 공개되어도 안전합니다 (클라이언트 측에서 사용).
- `service_role` 키는 절대 프론트엔드에 노출하지 마세요!
- RLS 정책이 올바르게 설정되어 있는지 확인하세요.

## 9. 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL 배열 다루기](https://www.postgresql.org/docs/current/arrays.html)

## 문의

설정 중 문제가 발생하면 다음을 확인하세요:
1. Supabase 프로젝트가 정상적으로 생성되었는지
2. `.env` 파일이 올바르게 설정되었는지
3. 데이터베이스 스키마가 정상적으로 실행되었는지
4. RLS 정책이 활성화되어 있는지
