/* =========================================================
   사이트 데이터 — 관리자 페이지(admin/)에서 편집하거나 직접 수정하세요.
   이미지 경로는 사이트 루트(index.html 위치) 기준입니다.
   마지막 저장: 2026. 9. 26. 오전 6:54:06
   ========================================================= */
window.SITE = {

  /* 프로필 · 연락처 · 소셜 링크 */
  profile: {
    "name": "벨로",
    "nameEn": "BELLO",
    "role": "Unity Game Developer",
    "email": "louie07230723@gmail.com",
    "affiliation": "",
    "avatar": "Image/profile.jpg",
    "since": 2024,
    "socials": [
      {
        "id": "youtube",
        "label": "YouTube",
        "url": "https://www.youtube.com/@bellow3270"
      },
      {
        "id": "github",
        "label": "GitHub",
        "url": "https://github.com/louie0523"
      },
      {
        "id": "instagram",
        "label": "Instagram",
        "url": "https://www.instagram.com/bellocitygames/"
      },
      {
        "id": "itch",
        "label": "itch.io",
        "url": "https://bellocity.itch.io"
      }
    ]
  },

  /* 메인 상단 대표작 (projects의 id). 첫 번째가 가장 크게 표시 */
  featured: [
    "random-br",
    "private-detective-v",
    "human-farm"
  ],

  /* 데브로그 시즌 (최신 시즌이 위). 로그는 날짜로 자동 분류 */
  seasons: [
    {"id":2,"name":"Season 2","title":"랜덤 초능력자 배틀로얄","start":"2026.06.01","desc":"대회 시즌을 마치고 돌아왔습니다."},
    {"id":1,"name":"Season 1","title":"Baldo Master","start":"2026.01.01","end":"2026.05.31","desc":"2D 액션 게임 Baldo Master를 중심으로 거의 매일 작업을 기록한 첫 시즌입니다. 중간에 게임잼 2회에 참가했습니다. \n대회 참여러 공백기가 길어져 시즌을 나눴습니다."}
  ],

  /* 수상 — level: national > contest > regional > school / tier: gold silver bronze excel merit */
  awards: [
    {"level":"national","year":2026,"event":"전국기능경기대회","field":"게임개발 직종","result":"동메달","tier":"bronze"},
    {"level":"national","year":2025,"event":"전국기능경기대회","field":"게임개발 직종","result":"장려상","tier":"merit","project":"national-2025"},
    {"level":"contest","year":2026,"event":"청강게임대전","field":"게임 공모전","result":"우수상","tier":"excel"},
    {"level":"regional","year":2026,"event":"부산 기능경기대회","field":"게임개발 직종","result":"금상","tier":"gold","project":"busan-2026"},
    {"level":"regional","year":2025,"event":"부산 기능경기대회","field":"게임개발 직종","result":"은상","tier":"silver","project":"busan-2025"},
    {"level":"school","year":2024,"event":"교내 전공실기 대회","field":"게임 개발 동아리","result":"금상","tier":"gold","project":"stygian-road"}
  ],

  /* 게임잼 */
  jams: [
    {"date":"2026.05","event":"월별 게임잼 26년 5월","theme":"128x128","result":"출품","project":"private-detective-v"},
    {"date":"2026.01","event":"웨루 게임잼 26년 1월","theme":"연쇄반응","result":"출품","project":"blood-chain"},
    {"date":"2025.12","event":"월별 웨루 게임잼 25년 12월","theme":"겨울","result":"출품","project":"john-snow"},
    {"date":"2025.07","event":"청강하이게임잼","theme":"협동","result":"아이디어상","project":"gunner-rider"},
    {"date":"2025.02","event":"웨루 게임잼 3R","theme":"설계도","result":"3R 진출 · 팀","project":"turn-and-tact"},
    {"date":"2025.01","event":"웨루 게임잼 2R","theme":"노 텍스트","result":"패자부활 3R 진출","project":"be-not-afraid","highlight":true},
    {"date":"2025.01","event":"웨루 게임잼 1R","theme":"직선","result":"2R 진출","project":"straight-line-slash","highlight":true},
    {"date":"","event":"'개웃겨서 도티 낳음' 대회","theme":"","result":"출품","project":"dotty"}
  ],

  /* 프로젝트 — status: dev | paused | done / dim: 2D 3D Web UGC */
  projects: [
    {"id":"random-br","no":19,"status":"dev","main":true,"dim":"3D","year":2026,"period":"2026 ~ 주력 개발 중","title":"랜덤 초능력자 배틀로얄","sub":"1인칭 카툰 배틀로얄 · 멀티플레이 · 가제","img":"Image/project-br.png","desc":"죽을 때마다 초능력이 무작위로 바뀌는 1인칭 카툰 배틀로얄입니다.","long":"죽을 때마다 초능력이 무작위로 바뀌는 1인칭 카툰 배틀로얄입니다. '영혼'이 상점 재화이면서 동시에 승리 조건이라, 써서 강해질지 모아서 이길지 계속 고민하게 만드는 것이 핵심입니다. 기획부터 네트워크까지 혼자 개발하고 있습니다.","points":["영혼 = 상점 재화 + 승리 조건","사망 시 초능력 무작위 재배정","10~12인 캐주얼 파티 게임 목표"],"tags":["Unity 6","URP","Photon Fusion 2","Multiplayer","FPS"],"dev":"devlogs.html?project=%EB%9E%9C%EB%8D%A4%20%EC%B4%88%EB%8A%A5%EB%A0%A5%EC%9E%90%20%EB%B0%B0%ED%8B%80%EB%A1%9C%EC%96%84","devLabel":"개발 일지","link":"#","pendingLabel":"공개 예정","logKey":"랜덤 초능력자 배틀로얄"},
    {"id":"Project_P","no":18,"status":"paused","dim":"2D","year":2026,"title":"Project P","desc":"실시간 턴제 게임과 ai 기반 스킬 생성 게임","tags":["Unity","2D","Unity 6","AI","Turn","Action"],"dev":"#","link":"#","period":"2026.07.13 ~ 2026.08.07","sub":"실시간 턴제와 ai 기반 스킬 생성","pendingLabel":"비공개","logKey":"프로젝트 P"},
    {"id":"parallax","no":17,"status":"done","dim":"2D","year":2026,"title":"Parallax","desc":"시점을 바꾸며 소코반 류 퍼즐을 클리어 하는 게임입니다!","tags":["Unity"],"dev":"#","link":"#","main":true,"sub":"시점을 바꾸는 2d 퍼즐 소코반 게임","pendingLabel":"공개 예정","logKey":"Parallax","award":"청강게임대전","awardTier":"bronze","jam":"우수"},
    {"id":"private-detective-v","no":16,"status":"done","dim":"2D","year":2026,"period":"2026.05.01 ~ 05.03","title":"Private Detective V","sub":"게임잼 출품작 · 탐정","img":"devlog/Thumb/42.gif","jam":"게임잼 출품","desc":"3일간의 게임잼에서 기획, 일러스트, 인트로 컷씬까지 직접 작업한 탐정 게임입니다. 완성했지만 현재 빌드는 비공개입니다.","tags":["Unity","Cutscene","Game Jam"],"dev":"devlogs.html?project=Private%20Detective%20V","devLabel":"개발 일지","link":"#","pendingLabel":"빌드 비공개","logKey":"Private Detective V"},
    {"id":"baldo-master","no":15,"status":"paused","dim":"2D","year":2026,"period":"2026.01 ~ 05 · 일시 중지","title":"Baldo Master","sub":"2D 액션 · 발도","img":"devlog/Thumb/41.gif","desc":"'발도'를 핵심 액션으로 한 2D 액션 게임입니다. 증강, 상점, 보스 패턴, 컷씬 시스템을 직접 설계했습니다. 지금은 배틀로얄 개발에 집중하기 위해 잠시 멈춘 상태입니다.","tags":["Unity","2D","Action","Cinemachine","LuaFlow"],"dev":"devlogs.html?project=Baldo%20Master","devLabel":"개발 일지","link":"#","pendingLabel":"개발 일시 중지","logKey":"Baldo Master","imgPoster":"devlog/Thumb/41.still.webp"},
    {"id":"random-arena","no":14,"status":"done","dim":"Web","title":"RANDOM ARENA","img":"Image/project14.png","desc":"사다리타기나 룰렛, 너무 단순하지 않으신가요? 그런 분들을 위해 만들었습니다!","tags":["Web","Vibe Coding","Tool"],"pendingLabel":"빌드 종료","link":"#","dev":"#"},
    {"id":"busan-2026","no":13,"status":"done","dim":"3D","year":2026,"title":"2026 부산 기능경기대회","img":"Image/project13.png","award":"부산 금상","awardTier":"gold","desc":"부산 기능경기대회 게임개발 기획서를 기반으로 제작한 3D 슈팅 게임입니다.","tags":["Unity","3D","Shooting","Competition"],"dev":"#","link":"https://bellocity.itch.io/2026busangigang"},
    {"id":"blood-chain","no":12,"status":"done","dim":"2D","year":2026,"period":"2026.01.23 ~ 01.27","title":"Blood Chain","img":"Image/project12.png","jam":"테무산 게임잼","desc":"캐릭터끼리의 조합을 맞춰 최대한 연속적인 콤보를 만드는 2D 오토 배틀러 게임입니다.","tags":["Unity","2D","Auto Chess","Combo"],"dev":"dev/dev12.html","link":"https://bellocity.itch.io/blood-chain","logKey":"Blood Chain"},
    {"id":"john-snow","no":11,"status":"done","dim":"3D","title":"존 스노우의 완벽한 크리스마스 이브","img":"Image/project11.png","desc":"크리스마스 이브에 완벽한 하루를 만들기 위해 고군분투하는 존의 3D 병맛 스토리 게임입니다.","tags":["Unity","3D","Comedy","Story"],"dev":"dev/dev11.html","link":"https://bellocity.itch.io/johnsnowsperpectday"},
    {"id":"hsr-arena","no":10,"status":"done","dim":"UGC","title":"붕괴: 스타레일 영웅 대난투","img":"Image/project10.png","desc":"원신의 '별바다 세계'로 제작한, 붕괴: 스타레일 요소를 ARPG 형식으로 구현한 유즈맵입니다. 게임 UID: 16338722770","tags":["Use Map","Miliastra Wonderland","Fan Game"],"dev":"dev/dev10.html","link":"#","pendingLabel":"게임 내 UID로 플레이"},
    {"id":"dotty","no":9,"status":"done","dim":"2D","title":"순풍순풍 도티낳기","img":"Image/project9.png","jam":"도티 낳음 대회","desc":"'개웃겨서 도티 낳음' 대회 출품작으로, 도티를 낳아 저출산을 극복한다는 컨셉의 2D 병맛 클리커 게임입니다.","tags":["Unity","2D","Comedy","Clicker"],"dev":"dev/dev9.html","link":"https://bellocity.itch.io/soonpungdottyclickergame"},
    {"id":"national-2025","no":8,"status":"done","dim":"3D","year":2025,"title":"2025 전국기능경기대회","img":"Image/project8.png","award":"전국 장려상","awardTier":"merit","awardLevel":"national","desc":"전국기능경기대회 게임개발 기획서를 기반으로 제작한 3D 농장 게임입니다.","tags":["Unity","3D","Farm","Competition"],"dev":"#","link":"#","pendingLabel":"빌드 비공개"},
    {"id":"gunner-rider","no":7,"status":"done","dim":"3D","title":"Gunner & Rider","img":"Image/project7.png","desc":"한 명은 쫓아오는 적을 처리하는 거너, 한 명은 말을 조종하는 라이더로 나눠 플레이하는 3D 협동 게임입니다.","tags":["Unity","3D","Co-op"],"dev":"dev/dev7.html","link":"https://bellocity.itch.io/ridder-gunner","jam":"청강하이게임잼"},
    {"id":"human-farm","no":6,"status":"done","dim":"3D","title":"인간농장","sub":"3D 공포 · 스토리","img":"Image/project6.png","desc":"나폴리탄 괴담과 조지 오웰의 '동물 농장'에서 영감을 받아 제작한 3D 공포 게임입니다.","tags":["Unity","3D","Horror","Story"],"dev":"dev/dev6.html","link":"https://bellocity.itch.io/humanfarm"},
    {"id":"busan-2025","no":5,"status":"done","dim":"3D","year":2025,"title":"2025 부산 기능경기대회","img":"Image/project5.png","award":"부산 은상","awardTier":"silver","desc":"부산 기능경기대회 게임개발 기획서를 기반으로 제작한 3D 어드벤처 게임입니다.","tags":["Unity","3D","Adventure","Competition"],"dev":"#","link":"https://bellocity.itch.io/adventure250410"},
    {"id":"turn-and-tact","no":4,"status":"done","dim":"2D","year":2025,"period":"2025.02.09 ~ 02.14","title":"Turn & Tact!","img":"Image/project4.png","jam":"웨루 게임잼 3R","desc":"탑뷰와 사이드뷰를 번갈아 가며, 각 뷰의 다른 요소를 이용해 스테이지를 클리어하는 2D 퍼즐 게임입니다.","tags":["Unity","2D","Puzzle","Top View","Side View"],"dev":"dev/dev4.html","link":"https://superjoy.itch.io/turnandtact"},
    {"id":"be-not-afraid","no":3,"status":"done","dim":"2D","year":2025,"period":"2025.01.24 ~ 01.27","title":"Be not Afraid...","img":"Image/project3.png","jam":"웨루 게임잼 2R","desc":"마을에 숨겨진 흑마법사와 마법진을 찾아 해주하는 것이 목표인 2D 오컬트 퍼즐 게임입니다.","tags":["Unity","2D","Occult","Puzzle"],"dev":"dev/dev3.html","link":"https://bellocity.itch.io/be-not-afraid"},
    {"id":"straight-line-slash","no":2,"status":"done","dim":"2D","year":2025,"period":"2025.01.11 ~ 01.13","title":"Straight line slash!","img":"Image/project2.png","jam":"웨루 게임잼 1R","desc":"직선을 그어 공격하거나 적의 탄막을 막아내며, 강력한 보스와 전투를 펼치는 2D 게임입니다.","tags":["Unity","2D","Bullet Hell"],"dev":"dev/dev2.html","link":"https://bellocity.itch.io/straight-line-slash"},
    {"id":"stygian-road","no":1,"status":"done","dim":"3D","year":2024,"period":"2024.10.07 ~ 10.31","title":"Stygian Road","img":"Image/project1.png","award":"교내 금상","awardTier":"gold","desc":"나폴리탄 괴담에서 영감을 받아, 정해진 규칙을 지키며 생존해야 하는 3D 공포 게임입니다.","tags":["Unity","3D","Horror"],"dev":"dev/dev1.html","link":"https://bellocity.itch.io/stygian-road-neapolitan-ghost-story"}
  ],

  /* 데브로그 (최신이 위) */
  devlogs: [
    {"date":"2026.09.02","project":"랜덤 초능력자 배틀로얄","end":"2026.09.26","title":"랜덤 능력자! 프로토타입 제작","tags":["Game System","UI","Tooling","Sound","Multiplayer"],"desc":"랜덤 초능력자의 기초 프로토타입을 개발했습니다! 이 부분도 데브로그로 쓰고 싶었는데 너무 잊고 있었네요.\n\n간단히 개발하 것들을 소개하자면 다음과 같습니다.\n- 포톤 기반 멀티 플레이어 세팅\n- HP,Movement,Attack 시스템\n- 플레이어간 동기화 시스템\n- 무기 및 무기 공격, 애니메이팅 툴 시스템\n- 캐릭터 패시브 및 스킬 툴 추가\n- 랜덤 능력 프로토타입 추가\n- 손 리깅, 모션별 손 동작, 손가락 ik 추가 및 툴 시스템\n- 원거리 무기(활,총기류,기타) 시스템 추가\n- 상점 추가\n- 인첸트 추가\n- 상자 & 인첸트 스톤 추가\n- UI 씬 분리 후 UI 작업중","thumb":"44.png","no":44},
    {"kind":"interlude","date":"2026.06.01","end":"2026.09.25","title":"대회 시즌","desc":"5개월 동안 데브로그는 멈췄지만, 대회 준비와 출전에 집중한 기간이었습니다.","events":[{"date":"2026.06","name":"BIC 출품 준비","result":"이번엔 불발"},{"date":"2026.07","name":"청강게임대전","result":"우수상","tier":"excel"},{"date":"2026.08","name":"전국기능경기대회 게임개발 직종","result":"동메달","tier":"bronze"}],"no":43,"tags":[],"project":""},
    {"no":42,"date":"2026.05.01","end":"2026.05.03","project":"Private Detective V","tags":["Game Jam","Cutscene","Game System"],"thumb":"42.gif","title":"게임잼 참가 3일차","desc":"1일차는 기획, 2~3일차는 그림만 죽어라 그리다가 인트로 컷씬을 만들어봤습니다."},
    {"no":41,"date":"2026.04.27","project":"Baldo Master","tags":["UI","Game System"],"thumb":"41.gif","title":"컷씬 시스템 복기 및 응용 시스템","desc":"컷신 시스템을 복기하고, 플레이어가 특정 구역을 갈 수 없도록 자연스러운 접근 금지 구역 기능을 추가하였습니다.","poster":"41.still.webp"},
    {"no":40,"date":"2026.04.27","project":"Baldo Master","tags":["UI","Game System"],"thumb":"40.gif","title":"급습 시스템 보완 및 상점 UI 개편","desc":"시험이 끝났습니다. 급습 시스템을 보완하여 등장, 점프, 직선등장, 이동등장 등 여러 가지 기능을 추가하였으며, 상점 UI를 개편하였습니다.","poster":"40.still.webp"},
    {"no":39,"date":"2026.04.20","project":"Baldo Master","tags":["Game System"],"thumb":"39.gif","title":"급습 시스템 기초 추가 및 게임 베이스 재작업","desc":"매우 오랜만입니다. 게임의 긴장감을 더해줄 '급습' 시스템 기초를 추가하고, 오랜만에 와서 까먹은 부분은 그냥 아예 더 효율적으로 코드를 짰습니다.","poster":"39.still.webp"},
    {"no":38,"date":"2026.03.15","end":"2026.04.19","project":"Baldo Master","tags":["Competition"],"thumb":"38.jpg","title":"대회 참가 및 잘 쉬기","desc":"기능경기대회를 준비하느라 한 달 가까이 작업을 쉬었습니다. 다시 본격적으로 시작해볼까 합니다.<br>여담이지만 이번 대회에서 운 좋게 좋은 결과를 얻을 수 있었습니다. 자세한 이야기는 추후 일지로 남기겠습니다."},
    {"no":37,"date":"2026.03.14","project":"Baldo Master","tags":["Game System"],"thumb":"37.gif","title":"증강 4종 추가","desc":"증강 4종을 추가했습니다. 아마 이후로 2~3개 정도 추가하고 데모 버전 증강은 끝낼 것 같네요.","poster":"37.still.webp"},
    {"no":36,"date":"2026.03.13","project":"Baldo Master","tags":["Game System"],"thumb":"36.gif","title":"증강 3종 추가 및 증강 SO 다수 추가","desc":"'발도참' 및 여러 신규 증강 추가와 새로운 증강을 기획하였습니다.","poster":"36.still.webp"},
    {"no":35,"date":"2026.03.12","project":"Baldo Master","tags":["Game System"],"thumb":"35.png","title":"증강 2종 추가","desc":"증강 2종 추가했습니다. :-P"},
    {"no":34,"date":"2026.03.11","project":"Baldo Master","tags":["Level Design","Game System"],"thumb":"34.png","title":"스테이지 구조 추가 및 수정, 증강 3종 추가 및 잡다한 로직 최적화 + 오류 수정","desc":"2-1 스테이지의 마지막 구조를 추가하고, 오류가 나는 부분을 수정하였습니다. 또한 증강 3종을 추가하고, 씬 체인지에 따른 오류들을 수정하였습니다."},
    {"no":33,"date":"2026.03.10","project":"Baldo Master","tags":["Level Design","Game System"],"thumb":"33.gif","title":"함정 효과와 길잡이 박쥐, 스테이지 구조 일부 추가","desc":"함정 효과 및 기본적인 이동으론 가기 힘든 구역을 갈 수 있게 해주는 길잡이 박쥐를 추가하고, 스테이지 구조 일부를 추가하였습니다.","poster":"33.still.webp"},
    {"no":32,"date":"2026.03.09","project":"Baldo Master","tags":["Game System"],"thumb":"32.gif","title":"증강 1종 및 기합 시스템 항목 추가","desc":"증강 1개와 증강끼리의 연계 오류 일부를 수정하고, 기합 시스템의 신규 항목을 추가하였습니다.","poster":"32.still.webp"},
    {"no":31,"date":"2026.03.08","project":"Baldo Master","tags":["Cutscene","Game System"],"thumb":"31.gif","title":"TitleCutsceneManager 및 인트로씬 제작","desc":"타이틀 씬을 위한 TitleCutsceneManager를 추가하고, TitleCutsceneManager를 활용한 인트로 씬을 제작하였습니다.","poster":"31.still.webp"},
    {"no":30,"date":"2026.03.07","project":"Baldo Master","tags":["UI"],"thumb":"30.png","title":"타이틀 씬 추가","desc":"음."},
    {"no":29,"date":"2026.03.06","project":"Baldo Master","tags":["Game System"],"thumb":"29.png","title":"기합 시스템 추가","desc":"발도 시 플레이어가 녹음한 사운드가 출력되는 '기합' 시스템을 추가하였습니다."},
    {"no":28,"date":"2026.03.05","project":"Baldo Master","tags":["UI"],"thumb":"28.png","title":"상점 UI 및 아이콘 디자인","desc":"상점의 스탯 로직 일부를 수정하고, 상점 UI 및 아이콘을 수정하였습니다."},
    {"no":27,"date":"2026.03.02","project":"Baldo Master","tags":["AI","Game System"],"thumb":"27.gif","title":"공중 적 A* 알고리즘 및 다용도 오브젝트 스크립트 제작","desc":"공중 적이 A* 알고리즘으로 플레이어를 추적하게 하고, 기믹 및 게임 플레이에 필요한 오브젝트 로직을 수행하는 스크립트를 제작하였습니다.","poster":"27.still.webp"},
    {"no":26,"date":"2026.02.28","project":"Baldo Master","tags":["Boss","UI","Game System"],"thumb":"26.gif","title":"공중 적과 보스 소환 패턴 추가 및 보스 HP UI 추가","desc":"공중 적에 대한 로직과 보스 패턴 및 보스 HP 슬라이더를 추가했습니다.","poster":"26.still.webp"},
    {"no":25,"date":"2026.02.27","project":"Baldo Master","tags":["Boss","Sound"],"thumb":"25.gif","title":"보스 패턴 및 사운드 추가","desc":"보스의 원거리 투사체 공격과 피격 효과, 사운드 등을 추가하였습니다.","poster":"25.still.webp"},
    {"no":24,"date":"2026.02.25","project":"Baldo Master","tags":["Boss","Game System"],"thumb":"24.gif","title":"보스 기초 패턴 추가","desc":"보스의 원거리 공격과 은신 공격 같은 기초적인 패턴을 추가했습니다.","poster":"24.still.webp"},
    {"no":23,"date":"2026.02.24","project":"Baldo Master","tags":["Boss","Game System"],"thumb":"23.gif","title":"보스 스크립트 및 테스트","desc":"보스를 구성하는 데 필요한 스크립트들을 제작하였습니다.","poster":"23.still.webp"},
    {"no":22,"date":"2026.02.23","project":"Baldo Master","tags":["UI","Effect"],"thumb":"22.gif","title":"Parallax background 효과 및 아이콘 디자인","desc":"시차에 따라 각기 다른 위치로 이동하는 배경 효과를 추가하고, 증강체 아이콘을 디자인했습니다.","poster":"22.still.webp"},
    {"no":21,"date":"2026.02.20","project":"Baldo Master","tags":["Game System"],"thumb":"21.png","title":"증강 2종 및 연계 효과 추가","desc":"암살 발도, 발도는 돌아오는거야 및 증강끼리의 연계성을 추가했습니다."},
    {"no":20.5,"date":"2026.02.12","end":"2026.02.19","project":"","tags":["New Year","Gamgi"],"thumb":"새해.png","minor":true,"title":"명절로 인한 위치 이동 및 감기","desc":"할머니 집으로 올라가 작업을 못 했습니다. 또한 복귀 후 감기에 걸려서 쉬었습니다."},
    {"no":20,"date":"2026.02.11","project":"Baldo Master","tags":["Game System"],"thumb":"20.gif","title":"증강 4종 효과 추가","desc":"빽도, 열광의 발도, 빛의 발도 등의 증강 효과를 구현하였습니다.","poster":"20.still.webp"},
    {"no":19,"date":"2026.02.10","project":"Baldo Master","tags":["Game System"],"thumb":"19.gif","title":"환영 발도 및 삼중 발도 증강 효과 추가","desc":"증강 효과 기초 로직을 추가하고, 환영 발도 및 삼중 발도 효과를 추가하였습니다.","poster":"19.still.webp"},
    {"no":18,"date":"2026.02.09","project":"Baldo Master","tags":["UI","Game System"],"thumb":"18.png","title":"증강 및 상점 관련 일부 버그 수정","desc":"증강과 상점과 관련한 일부 버그를 수정하였습니다. 앞으론 디자인 및 증강체 효과 작업을 시작할 것 같습니다."},
    {"no":17,"date":"2026.02.07","project":"Baldo Master","tags":["UI","Game System"],"thumb":"17.png","title":"상점 시스템 대부분의 기능 제작","desc":"증강 구매 관련 오류 및 새로고침 기능을 추가하고, 증강체 업그레이드 기능을 제작하였습니다."},
    {"no":16,"date":"2026.02.05","end":"2026.02.06","project":"Baldo Master","tags":["UI","Game System"],"thumb":"16.png","title":"상점 시스템 기초 로직","desc":"상점 시스템의 기초 로직을 작업했습니다."},
    {"no":15,"date":"2026.02.03","project":"Baldo Master","tags":["UI","Game System"],"thumb":"15.png","title":"증강 시스템 기초 제작","desc":"증강체 시스템의 기초 로직을 만들었습니다."},
    {"no":14,"date":"2026.02.02","project":"Baldo Master","tags":["Effect"],"thumb":"14.gif","title":"타격감 개선","desc":"Cinemachine을 위한 Camera Shake Manager와 타격 시 파티클을 추가하여 타격감을 더했습니다.","poster":"14.still.webp"},
    {"no":13,"date":"2026.02.01","project":"Baldo Master","tags":["Level Design","Game System"],"thumb":"13.gif","title":"튜토리얼 스테이지 레벨 디자인 기초 완료","desc":"튜토리얼 스테이지의 대략적인 부분들을 대부분 제작하였습니다. 앞으론 몇 가지 상호작용 및 디자인을 수정 후, 1스테이지 맵을 제작할 것 같습니다.","poster":"13.still.webp"},
    {"no":12,"date":"2026.01.31","project":"Baldo Master","tags":["Level Design","Sound"],"thumb":"12.png","title":"튜토리얼 스테이지 50% 완성, 적 사운드 문제 해결","desc":"튜토리얼 스테이지의 50% 정도를 제작 완료하였습니다. 또한 적의 공격이 캔슬될 때 공격 사운드가 같이 끊기고, 피격 소리는 거리 영향을 받지 않는 등을 작업하였습니다."},
    {"no":11,"date":"2026.01.30","project":"Baldo Master","tags":["Game System"],"thumb":"11.gif","title":"TriggerObjects 시스템","desc":"게임에서 중요한 기믹 역할을 종합적으로 수행하는 시스템을 구축하고, Unit이 해당 스크립트와 호환 가능하게 하였습니다.<br><del>게임잼 이후로 너무 놀아서, 내일은 무조건 작업 많이 해야 할 것 같습니다.</del>","poster":"11.still.webp"},
    {"no":10,"date":"2026.01.29","project":"Baldo Master","tags":["Level Design","Game System"],"thumb":"10.png","title":"패링 메커니즘 변경 및 지형 추가","desc":"이제 패링 시 마우스 방향으로 투사체가 날아가며, 원거리 적을 위한 특수한 지형을 추가했습니다."},
    {"no":9,"date":"2026.01.23","end":"2026.01.27","project":"Blood Chain","tags":["Game Jam"],"thumb":"9.png","url":"dev/dev12.html","title":"블러드 체인 개발","desc":"월간 웨루 테무산 게임잼 출품작입니다. 자세한 이야기는 개발 비화에서 볼 수 있습니다."},
    {"no":8,"date":"2026.01.21","project":"Baldo Master","tags":["Game System"],"thumb":"8.gif","title":"투사체 공격을 하는 적과 투사체 패링","desc":"투사체 공격을 하는 적을 추가하고, 투사체를 반사할 수 있는 로직을 추가하였습니다.","poster":"8.still.webp"},
    {"no":7,"date":"2026.01.20","project":"Baldo Master","tags":["UI","Architecture"],"thumb":"7.gif","title":"Fade In/Out 효과와 매니저의 역할 분담","desc":"Fade In/Out 효과를 추가하고, 발도 매니저가 모든 역할을 도맡지 않게끔 다른 매니저와 역할을 분담했습니다.","poster":"7.still.webp"},
    {"no":6,"date":"2026.01.19","project":"Baldo Master","tags":["Cutscene"],"thumb":"6.gif","title":"테스트 컷씬 추가","desc":"Dialogue Manager와 LuaFlow를 연계하여 테스트 컷씬을 추가했습니다.","poster":"6.still.webp"},
    {"no":5,"date":"2026.01.18","project":"Baldo Master","tags":["Cutscene","Tooling"],"thumb":"5.gif","title":"LuaFlow 로직 커스텀","desc":"컷씬 시스템인 LuaFlow (By <a href=\"https://hyuki.dev/\" target=\"_blank\" rel=\"noopener\">hy</a>)의 로직을 현재 프로젝트에 맞게 수정하였습니다. 대표적으론 Animator 부분의 구조와 Camera를 Cinemachine 구조로 변경했습니다.","poster":"5.still.webp"},
    {"no":4,"date":"2026.01.17","project":"Baldo Master","tags":["Cutscene","Tooling"],"thumb":"4.png","title":"LuaFlow와 Hierarchy Decorator 적용","desc":"컷씬 시스템인 LuaFlow (By <a href=\"https://hyuki.dev/\" target=\"_blank\" rel=\"noopener\">hy</a>)와 하이어라키 정리 시스템인 Hierarchy Decorator (By <a href=\"https://github.com/WooshiiDev\" target=\"_blank\" rel=\"noopener\">Damian Slocombe</a>)를 적용했습니다."},
    {"no":3,"date":"2026.01.16","project":"Baldo Master","tags":["Effect","UI","Game System"],"thumb":"3.png","title":"발도 시작 이펙트 및 발도 UI","desc":"발도 시작 이펙트 로직을 추가하고, 발도 UI로 쿨타임을 확인할 수 있게 하였습니다. 추가로 적을 처치하면 '신속 발도'의 쿨타임이 초기화되는 게임 시스템을 추가했습니다."},
    {"no":2,"date":"2026.01.14","project":"Baldo Master","tags":["Effect","UI"],"thumb":"2.png","title":"피격 효과 및 연속 발도 가시성 증가","desc":"유닛이 피해를 받을 때 피격 효과가 나오게 했고, 연속 발도의 사거리를 인게임에서 직접 표시하게 했습니다. 추가로 연속 발도 중 마우스 휠로 카메라 반경을 늘릴 수 있도록 했습니다."},
    {"no":1,"date":"2026.01.13","project":"Baldo Master","tags":["UI"],"thumb":"1.png","title":"데미지 인디케이터 매니저","desc":"유닛이 피해를 입으면 피해값과, 피해량에 비례한 크기의 숫자가 나오게 했습니다."}
  ]
};
