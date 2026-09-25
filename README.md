# 포트폴리오 개편 — 적용 방법

## 1. 저장소에 덮어쓰기
이 폴더의 파일을 저장소 루트(`louie0523.github.io`)에 그대로 복사합니다.
기존 이미지 폴더(`Image/`, `devlog/Thumb/`, `dev/Dimage*/`)는 경로를 그대로 쓰니 건드리지 않아도 됩니다.

```
index.html          메인 (소개 · 대표작 · 수상/게임잼 · 프로젝트 · 최근 로그 · 도구 · 연락처)
projects.html       전체 프로젝트 (필터 + 상세 팝업)
devlogs.html        개발 일지 (월별 타임라인 + 프로젝트/태그 필터 + 검색)
assets/js/data.js   ★ 모든 내용은 여기서 수정
assets/js/site.js   렌더링 스크립트 (보통 건드릴 일 없음)
assets/css/site.css 공통 스타일
assets/css/story.css 개발 비화 / 상세 글 스타일
dev/dev1~4, dev12   새 디자인으로 옮긴 개발 비화
devlog/post-template.html  데브로그 상세 글 템플릿
```

지워도 되는 파일: `style.css` (어디에서도 안 씀), `devlog/devlog-1.html` (예시 글)

## 2. 이미지 하나 추가
- `Image/project-br.png` — 랜덤 초능력자 배틀로얄 대표 스크린샷 (16:9 권장).
  없으면 "SCREENSHOT SOON" 자리 표시가 나옵니다.

## 3. 나머지 개발 비화 페이지 옮기기 (dev6, 7, 9, 10, 11, 14)
받은 파일에 없어서 옮기지 못했습니다. 각 파일에서 이렇게만 바꾸면 새 디자인이 적용됩니다.

1. `<style> ... </style>` 블록 전체 삭제
2. `</head>` 바로 위에 추가
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Silkscreen&display=swap">
   <link rel="stylesheet" href="../assets/css/site.css">
   <link rel="stylesheet" href="../assets/css/story.css">
   ```
3. `<body>`를 `<body data-base="../" data-page="projects" data-story data-project="human-farm">` 로 교체
   (`data-project`는 data.js의 프로젝트 id: human-farm, gunner-rider, dotty, hsr-arena, john-snow, random-arena)
4. `<body>` 바로 아래에 `<header id="topbar" class="topbar"></header>` 추가
5. `</body>` 바로 위에 추가
   ```html
   <nav class="container story-nav" id="storyNav"></nav>
   <footer id="footer" class="footer"></footer>
   <script src="../assets/js/data.js"></script>
   <script src="../assets/js/site.js"></script>
   ```
   기존 상단 버튼과 오른쪽 아래 소셜 버튼은 자동으로 숨겨집니다.
   (헤더 안에 `<div class="story-actions" id="storyActions"></div>`를 넣으면 플레이 버튼이 자동으로 생깁니다.)

## 4. 새 데브로그 쓰기
`assets/js/data.js`의 `devlogs` 맨 위에 한 줄 추가:
```js
{ no: 43, date: "2026.09.24", project: "Baldo Master", tags: ["Game System"], thumb: "43.gif",
  title: "제목", desc: "요약 한두 줄" },
```
- 썸네일은 `devlog/Thumb/43.gif`에 넣습니다.
- 길게 쓰고 싶으면 `devlog/post-template.html`을 복사해 `devlog/43.html`로 만들고 `url: "devlog/43.html"`을 추가하세요.
- 새 프로젝트 이름을 `project`에 쓰면 필터에 자동으로 생깁니다.

## 5. 시즌
- 데브로그는 `seasons`에 적힌 시즌 단위로 나뉘고, 페이지에 들어가면 가장 최근 시즌이 먼저 보입니다.
- 로그는 날짜로 자동 분류됩니다. 새 시즌을 열려면 `seasons` 맨 위에 `{ id: 3, name: "Season 3", title: "...", start: "YYYY.MM.DD", desc: "..." }`를 추가하고, 이전 시즌에 `end`를 적으세요.
- 긴 공백은 `kind: "interlude"` 로그 하나로 요약할 수 있습니다 (events 목록 포함).

## 6. 자주 바꿀 것
- 소속: `profile.affiliation`
- 메인 대표작: `featured` (첫 번째가 가장 크게 표시)
- 수상 / 게임잼: `awards`, `jams`
