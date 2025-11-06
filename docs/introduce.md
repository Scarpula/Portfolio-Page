# AI 개발자 포트폴리오

**"AI 모델 개발부터 MLOps를 통한 배포, 풀스택 연동까지"**

저는 AI 모델 개발(LLM, 시계열) 경험과 더불어, 실제 산업 현장(IoT, MES)의 데이터를 수집, 처리, 배포하는 풀스택 개발 및 MLOps 초기 구축 경험을 보유한 개발자입니다.

---

## 1. 주요 보유 기술 (Key Tech Stack)

* **LLM / NLP:** LLaMA3, GPT-3.5, **HuggingFace Transformers, LangChain**, 프롬프트 엔지니어링
* **ML / Time-Series:** **TensorFlow, Keras**, Scikit-learn, Pandas, Numpy, **RNN/LSTM**
* **Backend / API:** Python (**Flask, FastAPI**), Java (**Spring Boot**), JPA, **MQTT**, WebSocket
* **Frontend:** **React.js**, JSP, TypeScript, Zustand
* **MLOps / Infra:** **Docker**, Git, GitHub, Jira
* **Database:** MySQL, PostgreSQL 17, TimeScaleDB ,OracleDB
* **Domain:** **MES (Manufacturing Execution System)**, Industrial IoT, **RS-485(Modbus)**

---

## 2. 핵심 프로젝트 및 경력 (Projects & Experience)

### 🎯 [Project] LLM 기반 투자 성향 분석 및 RAG 큐레이션 "InvestGenius"

LLM(LLaMA3, ChatGPT3.5)을 활용해 사용자의 투자 성향을 다각도로 분석하고, **RAG(Retrieval-Augmented Generation) 파이프라인**을 통해 최신 시장 데이터를 근거로 맞춤형 포트폴리오를 추천하는 AI 챗봇 서비스입니다.

* **담당 역할:** 팀장 (Team Leader) 및 Full-Stack 개발 (AI, Backend, Frontend)
* **주요 성과 및 핵심 업무:**
    * **[LLM 파인튜닝]** 투자 성향 분석 정확도 향상을 위해 **LLaMA3 모델을 대상으로 Domain-Specific 파인튜닝** 수행 및 성능 평가
    * **[RAG 및 프롬프트 엔지니어링]** **LangChain**을 활용하여 실시간 주식 데이터 및 기업 재무제표를 참조하는 **RAG 파이프라인을 설계 및 구축**하여 환각(Hallucination)을 최소화
    * **[API 설계 및 연동]** Python(Flask) 기반의 **LLM 추론 API 서버를 구축**하고, 메인 백엔드(Spring Boot)와의 비동기 통신을 설계하여 시스템 연동
    * **[Full-Stack]** React 기반 사용자 인터페이스(UI) 및 데이터 시각화 차트 구현
* **적용 기술 (Tech Stack):**
    * **LLM / Frameworks:** LLaMA3, GPT-3.5, **HuggingFace Transformers, LangChain**
    * **Backend:** Spring Boot (JPA), **Python (Flask)**
    * **Frontend:** **React.js**
    * **Database:** MySQL

---

### 🎯 [Experience] AI 기반 스마트공장 MES 구축 "서원(주)" (아이오티플러스)

[cite_start]서원(주)의 스마트공장 고도화 사업의 일환으로, **제조실행시스템(MES)**을 구축했습니다. [cite: 1] [cite_start]이 시스템은 실시간 설비 모니터링(PLC, 온습도) [cite: 3, 4][cite_start], 생산/품질 관리 [cite: 5, 7] [cite_start]및 **AI 기반 상관분석**  기능을 포함합니다.

* **담당 역할:** Full-Stack 개발 (AI 데이터 분석 모듈 및 백엔드 담당)
* **주요 성과 및 핵심 업무:**
    * [cite_start]**[AI 상관분석 모듈 개발]** 요구사항정의서의 핵심 기능인 **'상관분석'**  기능을 주도적으로 개발. [cite_start]**Pandas, Scikit-learn**을 활용하여 **온도/습도 등 환경 데이터와 제품 불량률 간의 통계적 관계를 분석**하고, 이를 시각화 차트로 구현 
    * [cite_start]**[Full-Stack 개발]** **Spring Boot**와 **React**를 활용하여 MES의 핵심 기능인 생산관리(작업지시, 배합일지) [cite: 5] [cite_start]및 기준정보 관리 [cite: 3] 기능 개발
    * [cite_start]**[데이터 파이프라인]** 현장 PLC 및 센서(온습도) 데이터를 **RS-485(Modbus), MQTT** 프로토콜로 수신하여 DB에 적재하고, 실시간 대시보드 [cite: 3] 및 AI 분석 모듈에 연동
* **적용 기술 (Tech Stack):**
    * **ML/Analysis:** **Scikit-learn, Pandas**
    * **Backend:** **Java, Spring Boot, JPA**
    * **Frontend:** **React.js**
    * **Data Pipeline:** **MQTT, RS-485(Modbus)**
    * **Database:** PostgreSQL 17, TimeScaleDB 하이퍼테이블 설계 및 구현

---

### 🎯 [Experience] AI 기반 태양광 발전량 예측 및 제어 시스템 "SOLYNX" (아이오티플러스)

태양광 인버터에서 실시간으로 수집되는 **시계열 데이터(Time-Series)**를 **MQTT**로 수신하여, **AI 모델(RNN/LSTM 계열)**로 발전량을 예측하고 이상 징후를 탐지하는 시스템입니다.

* **담당 역할:** AI 모델 개발 및 백엔드 데이터 파이프라인 구축
* **주요 성과 및 핵심 업무:**
    * **[시계열 모델 연구]** **TensorFlow(Keras)**를 사용하여 **RNN/LSTM 기반의 시계열 예측 모델을 구현**하고, 과거 데이터를 학습시켜 발전량 예측 정확도 확보
    * **[하이퍼 파라미터 튜닝]** 모델 성능 최적화를 위한 **하이퍼 파라미터 튜닝** 및 성능 평가 지표(RMSE, MAE) 관리
    * **[데이터 파이프라인]** MQTT 브로커와 연동하여 초당/분당 단위의 실시간 센서 데이터를 안정적으로 처리하는 백엔드 시스템 설계 및 구축
    * **[MLOps 초기 환경]** 개발된 AI 모델의 배포 및 운영을 위해 **Docker** 기반의 컨테이너 환경을 설계하고, 모델 서빙을 위한 **FastAPI/Flask API** 개발
* **적용 기술 (Tech Stack):**
    * **ML/DL:** **TensorFlow, Keras (RNN/LSTM), Scikit-learn, Pandas, Numpy**
    * **Backend / API:** Python (**FastAPI/Flask**), Java
    * **Data Pipeline:** **MQTT**
    * **MLOps:** **Docker**
    * **DB:** PostgreSQL 17, TimeScaleDB 하이퍼테이블 설계 및 구현

---

### 🎯 [Project] ML/LLM 기반 개인화 영어 학습 게임 플랫폼 "Linguagen" (인공지능 사관학교)

사용자의 게임 플레이 로그를 기반으로 **머신러닝(ML)** 성향을 파악하고, **LLM**이 사용자의 수준과 관심사에 맞는 영어 문제를 동적으로 생성해주는 학습 플랫폼입니다.

* **담당 역할:** AI 모델링 및 백엔드 개발
* **주요 성과 및 핵심 업무:**
    * **[ML 모델링]** **Scikit-learn**을 활용하여 사용자 성향(예: 공격형, 방어형, 탐험형)을 분류하는 **콘텐츠 기반 필터링(Content-based Filtering)** 모델 구현
    * **[LLM 연동]** 분류된 사용자 성향을 **LLM(GPT 등) 프롬프트에 동적으로 주입**하여, 개인화된 학습 주제와 난이도의 문제를 생성하는 모듈 개발
    * **[성능 평가]** 사용자 피드백 루프를 설계하여 **모델 학습** 데이터를 지속적으로 축적하고 **성능을 평가**하는 구조 설계
* **적용 기술 (Tech Stack):**
    * **ML:** **Scikit-learn**, Pandas
    * **LLM:** GPT-3.5/4, (사용한 프레임워크 명시)
    * **DB:** PostgreSQL

---

### 🎯 [Project] 미술 작품 중개 플랫폼 "Artistry" (스마트 인재 개발원)

작가와 소비자를 연결하는 그림 재능 중개 플랫폼입니다.

* **담당 역할:** 팀장 (Team Leader) 및 Full-Stack 개발
* **주요 성과 및 핵심 업무:**
    * **[프로젝트 총괄]** 팀 리더로서 **Jira, Git** 등을 활용한 **형상 관리 및 협업** 주도, 프로젝트 일정 및 리스크 관리
    * **[백엔드 개발]** JSP/Servlet 기반 백엔드 및 **WebSocket**을 활용한 실시간 채팅 기능 구현
    * **[API 연동]** 카카오/네이버 SNS 로그인 API, 아임포트 결제 API 연동
* **적용 기술 (Tech Stack):**
    * **Collaboration:** **Jira, Git, GitHub**
    * **Backend:** JSP/Servlet, WebSocket
    * **Frontend:** JSP, jQuery
    * **Database:** OracleDB