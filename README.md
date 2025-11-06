# 🚀 이성도 포트폴리오 웹사이트

React와 Three.js를 활용한 3D 인터랙티브 포트폴리오 웹사이트입니다.

## ✨ 주요 기능

- **3D 책상 씬**: Three.js로 구현된 인터랙티브 3D 환경
  - 책상, 모니터, 키보드, 마우스 3D 모델링
  - 클릭 가능한 인터랙티브 전등 (조명 토글)
  - 마우스 드래그로 씬 회전 가능
  - 실시간 그림자 및 조명 효과
- **풀페이지 스크롤**: react-fullpage를 활용한 부드러운 페이지 전환
- **3D 카드 메뉴**: 경력 및 프로젝트 탐색용 인터랙티브 3D 카드
- **Backdrop Filter**: 유리 모폴리즘(Glassmorphism) 효과
- **애니메이션**: Framer Motion을 활용한 자연스러운 애니메이션
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 🛠️ 기술 스택

### Frontend
- **React 18.3** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 환경
- **Three.js & React Three Fiber** - 3D 그래픽
- **@react-three/drei** - Three.js 헬퍼 라이브러리
- **Framer Motion** - 애니메이션
- **react-fullpage** - 풀페이지 스크롤

### Backend
- **Supabase** - 백엔드 서비스 (PostgreSQL DB, Row Level Security)

## 📁 프로젝트 구조

```
Portfolio Page/
├── docs/                  # 프로젝트 문서
│   ├── project.md        # 프로젝트 기획서
│   └── introduce.md      # 경력 및 프로젝트 정보
├── src/
│   ├── components/
│   │   ├── sections/     # 페이지 섹션 컴포넌트
│   │   │   ├── MainSection.tsx       # 메인/자기소개 (3D 책상 씬)
│   │   │   └── MenuSection.tsx       # 3D 카드 메뉴
│   │   └── 3d/          # 3D 컴포넌트
│   │       ├── DeskScene.tsx         # 3D 책상 씬
│   │       ├── BoxCard.tsx           # 3D 카드
│   │       └── objects/              # 3D 오브젝트들
│   │           ├── Desk.tsx          # 책상
│   │           ├── Monitor.tsx       # 모니터
│   │           ├── Keyboard.tsx      # 키보드
│   │           ├── Mouse.tsx         # 마우스
│   │           └── Lamp.tsx          # 전등 (인터랙티브)
│   ├── App.tsx          # 메인 앱
│   ├── main.tsx         # 진입점
│   └── index.css        # 글로벌 스타일
├── index.html
├── package.json
└── vite.config.ts
```

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/YOUR_USERNAME/portfolio-page.git
cd portfolio-page
```

### 2. 패키지 설치

```bash
npm install --legacy-peer-deps
```

### 3. 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Supabase 키 찾는 방법:**
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. Settings → API → Project URL과 anon public 키 복사

자세한 설정 방법은 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)를 참조하세요.

### 4. 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 [http://localhost:5173](http://localhost:5173)에서 확인할 수 있습니다.

### 5. 빌드

```bash
npm run build
```

### 6. 프리뷰

```bash
npm run preview
```

## 📄 페이지 구조

### Section 1: 메인 / 자기소개 (3D 책상 씬)
- **3D 환경**: 책상, 모니터, 키보드, 마우스로 구성된 인터랙티브 씬
- **인터랙티브 전등**: 클릭하면 조명이 켜지고 배경이 밝아짐
- **카메라 컨트롤**: 마우스 드래그로 씬 회전, 스크롤로 줌 인/아웃
- **실시간 효과**: 그림자, 조명, 재질 효과
- **Backdrop filter**: 콘텐츠 영역의 유리 모폴리즘 효과
- **부드러운 애니메이션**: Framer Motion 페이드인
- **사용 가이드**: 인터랙션 방법 안내

### Section 2: 경력 및 프로젝트 허브
- 3D 인터랙티브 카드 메뉴
  - **왼쪽 카드**: Work Experience (IOTPLUS)
  - **오른쪽 카드**: Education & Projects (AI 사관학교 / 스마트인재개발원)
- 드래그하여 회전 가능
- 호버 시 확대 및 발광 효과

## 🎨 디자인 특징

- **3D 책상 씬**: 실제감 있는 3D 환경으로 포트폴리오 시작
- **인터랙티브 요소**: 전등 클릭, 카메라 회전 등 사용자 참여 유도
- **다크 테마**: 현대적인 다크 그라데이션 배경 (전등 상태에 따라 변화)
- **글래스모피즘**: Backdrop filter를 활용한 유리 효과
- **3D 렌더링**: Three.js 기반 실시간 렌더링
- **그라데이션 텍스트**: 생동감 있는 타이틀 효과
- **부드러운 애니메이션**: 사용자 경험을 향상시키는 자연스러운 전환

## 💡 인터랙션 가이드

1. **전등 클릭**: 화면 오른쪽 전등을 클릭하면 조명이 켜집니다
2. **씬 회전**: 마우스 드래그로 3D 씬을 자유롭게 회전할 수 있습니다
3. **줌 조절**: 마우스 스크롤로 카메라를 줌 인/아웃할 수 있습니다
4. **페이지 이동**: 스크롤을 내려 다음 섹션으로 이동합니다

## 🌐 배포하기

### Vercel 배포 (권장)

이 프로젝트는 Vercel에 배포하는 것이 가장 간단합니다.

**빠른 배포:**

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에 로그인 (GitHub 계정 연동)
3. "New Project" → GitHub 저장소 선택
4. 환경 변수 추가:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. "Deploy" 클릭!

**상세한 배포 가이드:**
[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)를 참조하세요.

**배포 후 자동 업데이트:**
- `main` 브랜치에 푸시하면 자동으로 프로덕션 배포
- 다른 브랜치는 자동으로 미리보기 생성

### 다른 플랫폼

- **Netlify**: `vercel.json`의 내용을 `netlify.toml`로 변환
- **GitHub Pages**: SPA 라우팅을 위한 추가 설정 필요
- **자체 호스팅**: Nginx/Apache 설정 필요

## 📝 TODO

- [x] Supabase 연동
- [x] 경력 및 프로젝트 상세 페이지 구현
- [x] 3D 카드 메뉴 구현
- [x] 풀페이지 스크롤 구현
- [x] 반응형 디자인
- [ ] SEO 최적화
- [ ] 성능 최적화 (이미지 lazy loading)
- [ ] 블로그 섹션 추가 (선택)

## 📧 문의

이성도 (Seongdo Lee)
- GitHub: [프로필 링크]
- Email: [이메일 주소]

## 📜 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.
