# 🚀 취업 포트폴리오 웹사이트 기획서

## 1. 프로젝트 개요

React와 Supabase를 기반으로 한 풀스택(Full-stack) 포트폴리오 웹사이트를 구축합니다. **3D 입체형 디자인**과 풀페이지 스크롤 인터페이스를 통해 사용자 경험을 극대화하고, 경력과 프로젝트 내용을 효과적으로 전달하는 것을 목표로 합니다.

---

## 2. 기술 스택 (Tech Stack)

* **Frontend:** React.js
* **Backend & DB:** Supabase (PostgreSQL, Auth, Storage)
* **Core UI Library:** `react-fullpage.js` (풀페이지 스크롤 구현)
* **3D Graphics:** **Three.js** (또는 React Three Fiber) - 3D 입체형 구현을 위한 핵심 라이브러리
* **Styling:** CSS / SCSS (또는 Styled-components / Tailwind CSS) - 3D 효과 및 `backdrop-filter` 구현
* **Deployment (Frontend):** Cloudflare Pages, Vercel, 또는 Netlify
* **Deployment (Backend):** Supabase Cloud

---

## 3. 아키텍처 및 배포 전략

### 3.1. 아키텍처

* **Frontend (React):**
    * 사용자 인터페이스(UI)와 상호작용을 담당합니다.
    * `react-fullpage.js`를 메인 레이아웃으로 사용합니다.
    * **3D 입체형 구현을 위해 Three.js (또는 React Three Fiber) 컴포넌트를 적극 활용합니다.**
    * 데이터가 필요한 경우(예: 프로젝트 상세 내용) Supabase API를 호출하여 동적으로 렌더링합니다.
* **Backend (Supabase):**
    * **Database:** 프로젝트 설명, 경력 사항, 자기소개 텍스트 등 정적이지만 수정이 필요한 데이터를 Supabase DB (PostgreSQL)에 저장합니다.
    * **Storage:** 포트폴리오에 사용될 이미지, PDF 파일 (이력서 등)을 Supabase Storage에 호스팅합니다.
    * **API:** Supabase가 제공하는 RESTful API (PostgREST) 또는 JavaScript SDK (`supabase-js`)를 통해 프론트엔드와 데이터를 주고받습니다.

### 3.2. 배포 (Deployment)

* **Supabase 배포 관련:**
    * Supabase는 **백엔드(BaaS)** 서비스입니다. 데이터베이스, 인증, 스토리지 API를 제공하지만, React 같은 프론트엔드 애플리케이션 빌드 파일을 직접 호스팅하는 기능은 **제공하지 않습니다.**
* **추천 배포 전략 (Frontend):**
    * React 앱을 빌드(`npm run build`)하면 생성되는 정적 파일(HTML, CSS, JS)을 호스팅해야 합니다.
    * **추천 1: Cloudflare Pages (언급하신)**
        * GitHub/GitLab 저장소와 연동하여 자동 CI/CD가 가능합니다.
        * 글로벌 CDN을 통해 빠른 속도를 제공합니다.
    * **추천 2: Vercel**
        * React (및 Next.js) 배포에 최적화되어 있으며, 설정이 매우 간편합니다.
        * 마찬가지로 Git 연동 CI/CD를 지원합니다.
    * **추천 3: Netlify**
        * Jamstack 배포의 강자로, Vercel과 유사한 편의성을 제공합니다.

---

## 4. 페이지 구조 (react-fullpage 기준)

`react-fullpage`는 각 페이지 섹션을 '슬라이드' 단위로 관리합니다.

### 4.1. Section 1: 메인 / 자기소개

* **목표:** 사이트의 첫인상, 방문자에게 강렬한 인상과 기본 정보 제공.
* **UI/UX:**
    * **컨텐츠:** "이성도(Seongdo Lee)의 포트폴리오" 타이틀 및 간단한 자기소개 (e.g., "도전하는 풀스택 개발자")
    * **배경 (Background):**
        * 배경 이미지를 깔되, `opacity: 0.3` (예시) 등으로 희미하게 처리합니다.
        * `backdrop-filter: blur(10px);` (예시)를 컨텐츠 영역 뒷배경에 적용하여 텍스트 가독성을 높이고 깊이감을 줍니다.
    * **네비게이션:** 하단 스크롤 유도 화살표.

### 4.2. Section 2: 경력 및 프로젝트 (메인 카테고리)

* **목표:** 사용자가 원하는 정보(경력/프로젝트)로 빠르게 이동할 수 있는 허브 페이지.
* **UI/UX:**
    * **레이아웃:** 화면을 2분할하거나, 중앙에 2개의 명확한 박스 메뉴를 배치합니다.
    * **디자인: "3D 입체 형식"을 구현하기 위해 Three.js 또는 React Three Fiber의 컴포넌트나 레퍼런스를 참조하여 구현합니다. 필요하다면 관련 예제 소스 코드를 적극적으로 찾아 확보해야 합니다.** (예: 3D 카드 플립, 회전하는 박스 등)
* **컨텐츠 (박스 메뉴):**
    * **Box 1: 경력 (IOTPLUS)**
        * 타이틀: "Work Experience: IOTPLUS"
        * 설명: (선택) "MES 및 에너지 관리 시스템 개발"
        * (클릭 시 상세 페이지 또는 모달/슬라이드 이동)
    * **Box 2: 학습 및 프로젝트 (AI 사관학교 / 스마트인재개발원)**
        * 타이틀: "Education & Projects"
        * 설명: "AI 사관학교 / 스마트인재개발원"
        * (클릭 시 상세 페이지 또는 모달/슬라이드 이동)

### 4.3. Section 3, 4 (TBD): 상세 내용

* *추후 확장 영역: Section 2에서 각 박스를 클릭했을 때 이동할 상세 페이지들*
* **예시 (Section 3: IOTPLUS 상세):**
    * 회사 소개, 담당 역할, 사용 기술 스택, 주요 성과 (정량적/정성적)
* **예시 (Section 4: 프로젝트 상세):**
    * 인공지능 사관학교, 스마트인재개발원에서 진행한 1~N개의 프로젝트 카드
    * 각 프로젝트별 상세 설명 (목표, 구현 기능, 사용 기술, GitHub 링크)