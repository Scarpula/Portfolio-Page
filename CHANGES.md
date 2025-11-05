# Portfolio Page - Supabase 연동 변경사항

## 개요
기존 정적 데이터를 Supabase 데이터베이스 연동으로 변경하고, 라우팅 시스템을 추가했습니다.

## 추가된 파일

### 1. 데이터베이스 설정
- **src/lib/supabase.ts**: Supabase 클라이언트 설정 및 타입 정의
  - Company, Project 인터페이스 정의
  - 환경변수에서 Supabase URL과 Key 로드

- **supabase/schema.sql**: 데이터베이스 스키마 및 초기 데이터
  - companies 테이블: 회사/기관 정보
  - projects 테이블: 프로젝트 정보
  - RLS (Row Level Security) 정책 설정

- **.env**: 환경변수 파일
  ```
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_anon_key
  ```

- **SUPABASE_SETUP.md**: Supabase 설정 가이드

### 2. 페이지 컴포넌트
- **src/pages/HomePage.tsx**: 메인 페이지 (기존 App.tsx의 fullpage 로직 이동)
- **src/pages/CompanyDetailPage.tsx**: 회사별 상세 페이지
  - URL slug로 데이터 조회
  - 프로젝트 목록 표시
  - 동적 테마 색상 적용

- **src/pages/DetailPage.css**: 상세 페이지 공통 스타일

## 수정된 파일

### 1. 라우팅 설정
- **src/main.tsx**
  - BrowserRouter 추가

- **src/App.tsx**
  - Routes, Route 설정
  - HomePage, CompanyDetailPage 라우팅

### 2. MenuSection 컴포넌트
- **src/components/sections/MenuSection.tsx**
  - Supabase에서 companies 데이터 fetch
  - useNavigate로 페이지 이동
  - 동적으로 BoxCard 렌더링
  - 카드 개수에 따른 위치 자동 계산

### 3. BoxCard 컴포넌트
- **src/components/3d/BoxCard.tsx**
  - onClick prop 추가
  - 클릭 시 페이지 이동 기능

## 설치된 패키지
```bash
npm install react-router-dom @supabase/supabase-js
```

## 사용법

### 1. Supabase 설정
1. Supabase 프로젝트 생성
2. `supabase/schema.sql` 실행하여 테이블 생성
3. `.env` 파일에 Supabase URL과 Key 입력

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 라우팅 구조
- `/` - 메인 페이지 (HomePage)
- `/company/:slug` - 회사별 상세 페이지 (CompanyDetailPage)

## 주요 기능

### 1. 동적 데이터 로딩
- MenuSection에서 Supabase companies 테이블 조회
- 데이터 개수에 따라 자동으로 카드 배치

### 2. 상세 페이지 라우팅
- 3D 카드 클릭 시 해당 회사의 상세 페이지로 이동
- URL slug 기반 데이터 조회

### 3. 동적 테마
- 각 회사의 color 값으로 페이지 테마 동적 적용
- 그라데이션, 버튼, 태그 색상 자동 변경

## 데이터 구조

### Company
```typescript
{
  id: string;
  name: string;          // 한글 이름
  name_en: string;       // 영문 이름
  role: string;          // 역할
  period: string;        // 기간
  description: string;   // 설명
  color: string;         // 테마 색상 (HEX)
  slug: string;          // URL slug
  order: number;         // 정렬 순서
}
```

### Project
```typescript
{
  id: string;
  company_id: string;    // 회사 ID (FK)
  title: string;         // 프로젝트명
  description: string;   // 설명
  role: string;          // 역할
  tech_stack: string[];  // 기술 스택 배열
  highlights: string[];  // 주요 성과 배열
  order: number;         // 정렬 순서
}
```

## 주의사항
- `.env` 파일은 git에 커밋하지 않도록 .gitignore에 추가 필요
- Supabase RLS 정책이 활성화되어 있어 읽기만 가능
