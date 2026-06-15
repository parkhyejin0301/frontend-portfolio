# 박혜진 · 포트폴리오

React + Vite로 만든 프론트엔드 포트폴리오 사이트입니다.

## 폴더 구조

```
portfolio/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
│  └─ images/
│     ├─ design-components.jpg   ← 디자인 시스템 프로젝트 이미지
│     └─ bo-ip-management.jpg    ← 운영 백오피스(BO) 이미지
└─ src/
   ├─ main.jsx                   ← 진입점
   └─ Portfolio.jsx              ← 사이트 본체 (내용은 맨 위 data 객체에서 수정)
```

내용을 바꾸려면 `src/Portfolio.jsx` 맨 위의 `data` 객체만 수정하면 됩니다.
이미지를 교체하려면 `public/images/`의 파일을 같은 이름으로 덮어쓰면 됩니다.

## 로컬에서 실행

Node.js 18 이상이 필요합니다.

```bash
npm install      # 최초 1회
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 배포용 정적 파일 생성 → dist/ 폴더
npm run preview  # 빌드 결과 미리보기
```

## 배포 방법 (셋 중 하나)

### A. Netlify — 가장 빠름, CLI 불필요
1. `npm run build` 실행 → `dist/` 폴더 생성
2. https://app.netlify.com/drop 접속
3. `dist` 폴더를 브라우저에 드래그&드롭하면 끝

### B. Vercel — Git 연동 추천
1. 이 프로젝트를 GitHub 저장소에 push
   - **중요:** 이 폴더(package.json이 있는 곳)가 저장소의 **루트**가 되도록 올리세요.
     폴더가 한 겹 더 감싸져 있으면 Vercel이 빌드를 못 잡아 404가 납니다.
     (이미 감싼 채로 올렸다면 Vercel → Settings → General → **Root Directory**를
      해당 폴더명으로 지정하세요.)
2. https://vercel.com 에서 New Project → 해당 저장소 선택
3. Framework가 Vite로 자동 인식됨 → Deploy (push할 때마다 자동 재배포)
   - Build Command: `npm run build` / Output Directory: `dist` (자동 설정됨)
4. 사이트는 프로젝트 루트 URL(`내이름.vercel.app/`)에 뜹니다.
   이때 `vite.config.js`의 `base`는 반드시 `"/"` 여야 합니다.

### C. GitHub Pages
1. `vite.config.js`의 `base`를 `"/저장소명/"`으로 변경
2. `npm run build`
3. `dist/` 내용을 `gh-pages` 브랜치에 올리거나 GitHub Actions로 배포

## 참고
- 외부 UI 라이브러리 없이 React만 사용합니다. 폰트(Space Grotesk·Inter·JetBrains Mono)는 Google Fonts에서 불러옵니다.
- 모바일 반응형, 키보드 포커스, 모션 최소화(prefers-reduced-motion)를 지원합니다.
