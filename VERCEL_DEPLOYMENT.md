# Vercel 배포 가이드

이 문서는 Portfolio Page를 Vercel에 배포하는 방법을 단계별로 설명합니다.

## 📋 사전 준비사항

1. **GitHub 계정** (코드를 저장할 저장소)
2. **Vercel 계정** (무료로 생성 가능)
3. **Supabase 프로젝트** (데이터베이스)

---

## 🚀 배포 단계

### 1단계: GitHub에 코드 푸시

먼저 프로젝트를 GitHub 저장소에 올립니다.

```bash
# Git 초기화 (아직 안했다면)
git init

# .gitignore 확인 (node_modules, .env 등이 포함되어 있는지 확인)
# 환경 변수 파일은 절대 커밋하지 마세요!

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit for deployment"

# GitHub 저장소 연결 (본인의 저장소 URL로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 푸시
git branch -M main
git push -u origin main
```

### 2단계: Vercel 계정 생성 및 로그인

1. [Vercel 웹사이트](https://vercel.com) 방문
2. "Sign Up" 클릭
3. **GitHub 계정으로 로그인** 권장 (자동 연동이 편리함)

### 3단계: 프로젝트 Import

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub 저장소 목록에서 본인의 포트폴리오 저장소 선택
4. **"Import"** 클릭

### 4단계: 프로젝트 설정

#### Build & Output Settings

Vercel이 자동으로 감지하지만, 확인해주세요:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build` 또는 `vite build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables (환경 변수 설정) ⚠️ 중요!

**Environment Variables** 섹션에서 다음 변수들을 추가하세요:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Anon/Public Key |

**Supabase 키 찾는 방법:**
1. Supabase 대시보드 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **Settings** → **API** 클릭
4. **Project URL**과 **anon public** 키를 복사

### 5단계: 배포!

모든 설정이 완료되면:

1. **"Deploy"** 버튼 클릭
2. 빌드 로그를 확인하며 대기 (보통 1-3분 소요)
3. 배포 완료! 🎉

배포가 완료되면 다음과 같은 URL이 생성됩니다:
```
https://your-project-name.vercel.app
```

---

## 🔄 자동 배포 설정

Vercel은 GitHub와 연동되어 있어서:

- **main/master 브랜치에 푸시** → 자동으로 프로덕션 배포
- **다른 브랜치에 푸시** → 자동으로 미리보기 배포 생성
- **Pull Request 생성** → 자동으로 미리보기 URL 생성

매우 편리합니다! 😊

---

## 🛠️ 배포 후 확인사항

### 1. 웹사이트 동작 확인
- [ ] 메인 페이지가 정상적으로 로드되는가?
- [ ] 3D 씬이 제대로 렌더링되는가?
- [ ] Supabase 데이터가 잘 불러와지는가?
- [ ] 모든 라우팅이 정상 작동하는가?

### 2. 성능 체크
Vercel은 자동으로 성능 점수를 제공합니다:
- **Lighthouse 점수 확인**
- **Core Web Vitals 확인**

### 3. 환경 변수 확인
문제가 있다면:
1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 모든 변수가 올바르게 설정되어 있는지 확인

---

## 🐛 문제 해결 (Troubleshooting)

### 빌드 실패 시

```bash
# 로컬에서 빌드 테스트
npm run build

# 에러가 있다면 수정 후 다시 푸시
```

### 환경 변수 오류 시

```
Error: Missing Supabase environment variables
```

→ Vercel 대시보드에서 환경 변수가 제대로 설정되었는지 확인
→ 변수 이름이 정확히 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`인지 확인

### 라우팅 404 오류 시

Vite/React Router를 사용하는 SPA의 경우, `vercel.json` 파일 필요:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3D 모델 로딩 실패 시

- `glb_asset` 폴더가 제대로 배포되었는지 확인
- 파일 경로가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인

---

## 📊 Vercel 대시보드 기능

### Analytics (분석)
- 방문자 수, 페이지뷰 확인
- 성능 메트릭 모니터링

### Deployments (배포 목록)
- 모든 배포 히스토리 확인
- 이전 버전으로 롤백 가능
- 각 배포의 로그 확인

### Domains (도메인)
- 커스텀 도메인 연결 가능
- 무료 SSL 인증서 자동 적용

---

## 💡 추가 팁

### 커스텀 도메인 연결

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Domains**
3. 본인 소유의 도메인 입력
4. DNS 설정 (도메인 제공업체에서)

### 성능 최적화

- **이미지 최적화**: Vercel은 자동으로 이미지 최적화
- **Code Splitting**: React.lazy()와 Suspense 사용
- **캐싱**: Vercel의 Edge Network가 자동으로 처리

### 로그 확인

배포 후 문제가 있다면:
1. Vercel 대시보드 → 해당 배포 클릭
2. **Function Logs** 또는 **Runtime Logs** 확인
3. 브라우저 개발자 도구 콘솔도 확인

---

## 🎉 완료!

축하합니다! 이제 포트폴리오가 전 세계 어디서나 접근 가능합니다!

배포된 사이트 URL:
```
https://your-project-name.vercel.app
```

문제가 발생하면:
- [Vercel 문서](https://vercel.com/docs)
- [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)

