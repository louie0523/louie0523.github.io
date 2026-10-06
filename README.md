# 포트폴리오 개편 — 적용 방법

## 0. 관리자 페이지 (admin/)
`https://louie0523.github.io/admin/` 에서 데브로그 · 프로젝트 · 수상 · 게임잼 · 시즌 · 프로필을 폼으로 편집하고 [게시]를 누르면 저장소에 커밋됩니다.
- 처음 한 번: GitHub에서 **Fine-grained 토큰**을 만들어 붙여넣습니다 (이 저장소 하나 · Contents: Read and write). 페이지 안 "토큰 만드는 법"에 순서가 있어요.
- 토큰이 없으면 누가 이 페이지를 열어도 아무것도 저장할 수 없습니다. 토큰은 내 브라우저에만 저장됩니다.
- 썸네일 · 대표 이미지는 클릭/드래그/붙여넣기로 넣으면 알맞은 경로로 자동 저장됩니다.
- [상세 글 쓰기] / [개발 비화 쓰기]는 마크다운으로 쓰고 미리보기를 보면서 페이지를 만듭니다. 나중에 다시 열어서 수정할 수 있어요.
- 여러 개를 고친 뒤 [게시]를 한 번 누르면 커밋 하나로 올라갑니다. Ctrl+S = 적용.
- 저장 시 data.js는 도구가 다시 정리해서 씁니다 (손으로 쓴 주석은 사라질 수 있어요).

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

## 7. 진열장 수록곡 · 데브로그 종류
- 프로젝트마다 `bgm: [{ title: "곡 - 아티스트", url: "https://youtu.be/..." }]`를 넣으면 메인 진열장에서 그 디스크를 넣었을 때 수록곡으로 나오고, 누르면 재생됩니다. 관리자 → 프로젝트 → "작업하며 들은 곡"에서 한 줄에 하나씩 넣으면 돼요.
- 메인 진열장의 프로젝트는 플로피 디스크로 표시됩니다. 디스크 색은 관리자 → 프로젝트 → "플로피 디스크"에서 고르고(`fdColor`), 라벨에는 대표 이미지가 들어갑니다. 이미지가 없으면 NOT YET / COMING SOON.
- CD는 음악 탭(music.html) 전용입니다. 관리자 → 음악 → "CD 꾸미기"에서 효과(홀로그램·광택·LP 결·반짝이·무광·흑백·가운데까지 그림), 테두리 색, 인쇄 문구를 고르면 미리보기가 바로 바뀝니다. (data.js 필드: `cdFx`, `cdRim`, `cdText`)
- 데브로그 `kind`: 비우면 개발 일지, `"diary"` 개인 일지, `"event"` 행사 기록(장소는 `place`), `"interlude"` 공백 요약. 개인 일지와 행사 기록은 프로젝트 없이 써도 데브로그 필터에 따로 묶여요.

## 8. 노트 (notes.html)
- 데브로그와 별개로 꿀팁 · 트러블슈팅(황당한 일) · 코드 정리 · 일상 글을 쓰는 곳입니다.
- 관리자 → **노트** 탭 → 새로 만들기 → [본문 쓰기]. 글은 `note/번호.html`로 저장되고, 이미지는 `note/img번호/`에 들어갑니다.
- 마크다운 팁: ```` ```csharp ```` 코드 블록은 색이 입혀지고 복사 버튼이 붙습니다. `> TIP ...` / `> WARN ...` / `> INFO ...`로 시작하면 강조 박스가 됩니다.
- "목록 맨 위에 고정"을 켜면 노트 목록 상단에 고정됩니다. 메인 페이지에는 최근 노트 3개가 나옵니다.

## 9. 음악 (music.html)
- 작업하며 듣는 노래를 CD로 모으는 곳입니다. 관리자 → **음악** 탭에서 CD 제목, 아티스트, 커버, 수록곡(곡 제목 | 유튜브 링크 / 재생목록 링크), 메모, 태그, 같이 만든 프로젝트를 넣으세요.
- CD를 고르면 턴테이블에 올라가고, 곡을 누르면 YouTube 플레이어로 재생되면서 디스크가 돌아갑니다.
