/* =========================================================
   렌더링 스크립트 — 내용은 data.js에서 수정하세요.
   ========================================================= */
(function () {
  "use strict";
  var S = window.SITE || { profile: {}, projects: [], devlogs: [], awards: [], jams: [], featured: [] };
  var body = document.body;
  var BASE = body.getAttribute("data-base") || "";
  var PAGE = body.getAttribute("data-page") || "";

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function url(p) {
    if (!p || p === "#") return null;
    return /^(https?:|mailto:)/.test(p) ? p : BASE + p;
  }
  function isExt(p) { return /^https?:/.test(p || ""); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function stripHtml(h) { var d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent || ""; }
  function set(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; return el; }

  var projects = S.projects || [];
  var byId = {};
  projects.forEach(function (p) { byId[p.id] = p; });
  var logs = (S.devlogs || []).slice().sort(function (a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : (b.no || 0) - (a.no || 0);
  });
  function isCounted(d) { return !d.minor && d.kind !== "interlude"; }
  function logId(d) { return "log-" + (d.no != null ? String(d.no).replace(".", "-") : (d.kind || "x") + "-" + d.date.replace(/\./g, "")); }
  function logLabel(d) { return d.kind === "interlude" ? "INTERLUDE" : "#" + d.no; }
  var seasons = (S.seasons || []).slice().sort(function (a, b) { return a.start < b.start ? 1 : -1; });
  function seasonOf(d) {
    for (var i = 0; i < seasons.length; i++) if (d.date >= seasons[i].start) return seasons[i].id;
    return seasons.length ? seasons[seasons.length - 1].id : null;
  }

  var ICON = {
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
    itch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-3.95 3.4l-.9 6.1A2.6 2.6 0 0 0 4.4 17.5c.8 0 1.5-.4 2-1l1.4-1.6a2 2 0 0 1 1.5-.7h5.4a2 2 0 0 1 1.5.7l1.4 1.6c.5.6 1.2 1 2 1a2.6 2.6 0 0 0 2.55-3l-.9-6.1A4 4 0 0 0 17.3 5z"/></svg>'
  };

  /* ---------- shared UI pieces ---------- */
  function media(src, label, extra) {
    var u = url(src);
    return '<div class="media' + (u ? "" : " is-empty") + '">' +
      (u ? '<img src="' + esc(u) + '" alt="' + esc(label) + '" loading="lazy" decoding="async" onerror="this.parentNode.classList.add(\'is-empty\');this.remove()">' : "") +
      '<span class="media-empty"><b>' + esc(label) + '</b>SCREENSHOT SOON</span>' + (extra || "") + '</div>';
  }
  function tags(list, first) {
    return '<div class="tags">' + (first || "") + (list || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div>';
  }
  function statusChip(p) {
    if (p.status === "dev") return '<span class="status dev"><i></i>' + (p.main ? "주력 개발 중" : "개발 중") + '</span>';
    if (p.status === "paused") return '<span class="status paused"><i></i>일시 중지</span>';
    if (url(p.link)) return '<span class="status live"><i></i>플레이 가능</span>';
    return '<span class="status"><i></i>완료</span>';
  }
  function badge(p) {
    if (p.award) return '<span class="badge ' + esc(p.awardTier || "") + (p.awardLevel === "national" ? " national" : "") + '">' + esc(p.award) + '</span>';
    if (p.jam) return '<span class="badge jam">' + esc(p.jam) + '</span>';
    return "";
  }
  function actions(p) {
    var out = [];
    var link = url(p.link), dev = url(p.dev);
    if (link) out.push('<a class="btn pri" href="' + esc(link) + '"' + (isExt(link) ? ' target="_blank" rel="noopener"' : "") + '>' + esc(p.linkLabel || "플레이") + ' ↗</a>');
    if (dev) out.push('<a class="btn" href="' + esc(dev) + '">' + esc(p.devLabel || "개발 비화") + ' →</a>');
    if (!link && !dev) out.push('<span class="btn" aria-disabled="true">' + esc(p.pendingLabel || "공개 예정") + '</span>');
    else if (!link && p.pendingLabel) out.push('<span class="btn" aria-disabled="true">' + esc(p.pendingLabel) + '</span>');
    return '<div class="actions">' + out.join("") + '</div>';
  }
  function dateRange(d) {
    if (!d.end) return d.date;
    var sameYear = d.end.slice(0, 4) === d.date.slice(0, 4);
    return d.date + " – " + (sameYear ? d.end.slice(5) : d.end);
  }
  function projectCard(p) {
    var meta = ["No." + pad(p.no), p.dim, p.year].filter(Boolean).map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    var foot = badge(p) || statusChip(p);
    if (badge(p) && p.status === "dev") foot = statusChip(p) + badge(p);
    return '<a class="pcard rv" href="' + esc(BASE + "projects.html#" + p.id) + '" data-id="' + esc(p.id) + '">' +
      media(p.img, p.title) +
      '<div class="pcard-body"><div class="pcard-meta">' + meta + '</div>' +
      '<h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
      '<div class="pcard-foot">' + foot + '</div></div></a>';
  }

  /* ---------- chrome (top bar / footer) ---------- */
  function chrome() {
    var P = S.profile || {};
    var top = $("#topbar");
    if (top) {
      top.className = "topbar";
      top.innerHTML = '<div class="wrap">' +
        '<a class="logo" href="' + BASE + 'index.html"><i></i>' + esc(P.nameEn || "BELLO") + '<span>GAME DEV</span></a>' +
        '<nav class="nav" aria-label="주요 메뉴">' +
        '<a href="' + BASE + 'projects.html" data-k="projects">프로젝트</a>' +
        '<a href="' + BASE + 'devlogs.html" data-k="devlogs">데브로그</a>' +
        '<a href="' + BASE + 'index.html#awards" data-k="awards" class="hide-sm">수상</a>' +
        '<a href="' + BASE + 'index.html#contact" data-k="contact">연락</a>' +
        '</nav>' +
        (P.email ? '<a class="topbar-mail" href="mailto:' + esc(P.email) + '">' + esc(P.email) + '</a>' : "") +
        '</div>';
      var on = top.querySelector('[data-k="' + PAGE + '"]');
      if (on) on.classList.add("on");
    }
    var foot = $("#footer");
    if (foot) {
      foot.className = "footer";
      foot.innerHTML = '<div class="wrap"><span>© ' + new Date().getFullYear() + ' ' + esc(P.name || "") + ' · BelloCity Games</span>' +
        '<nav>' + (P.socials || []).map(function (s) {
          return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
        }).join("") + '</nav></div>';
    }
  }

  /* ---------- home ---------- */
  function home() {
    var P = S.profile || {};
    var logCount = logs.filter(isCounted).length;

    set("pcStats",
      '<div><dt>PROJECTS</dt><dd>' + projects.length + '</dd></div>' +
      '<div><dt>DEVLOGS</dt><dd>' + logCount + '</dd></div>' +
      '<div><dt>AWARDS</dt><dd>' + (S.awards || []).length +
        (function () { var n = (S.awards || []).filter(function (a) { return a.level === "national"; }).length; return n ? '<small>전국 ' + n + '</small>' : ""; })() +
        '</dd></div>' +
      '<div><dt>GAME JAMS</dt><dd>' + (S.jams || []).length + '</dd></div>');
    if (P.affiliation) set("pcAff", esc(P.affiliation));

    var q = byId[(S.featured || [])[0]];
    if (q) set("pcQuest", '<span class="px-label">CURRENT QUEST</span><strong><span>' + esc(q.title) + '</span><span>→</span></strong>');

    // featured
    set("featGrid", (S.featured || []).map(function (id, i) {
      var p = byId[id];
      if (!p) { console.warn('[data.js] featured에 있는 "' + id + '" 와 같은 id의 프로젝트가 없습니다.'); return ""; }
      return '<article class="feat rv' + (i === 0 ? " main" : "") + '" id="f-' + esc(p.id) + '">' +
        media(p.img, p.title) +
        '<div class="feat-body">' +
        '<div class="feat-top">' + statusChip(p) + '<span class="mono dim" style="font-size:12px">' + esc(p.period || p.year || "") + '</span></div>' +
        '<h3>' + esc(p.title) + '</h3>' +
        (p.sub ? '<p class="feat-sub">' + esc(p.sub) + '</p>' : "") +
        '<p class="feat-desc">' + esc(i === 0 && p.long ? p.long : p.desc) + '</p>' +
        (i === 0 && p.points ? '<ul class="points">' + p.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul>' : "") +
        tags(p.tags, badge(p)) +
        actions(p) +
        '</div></article>';
    }).join(""));

    // awards
    var medalChar = { gold: "금", silver: "은", bronze: "동", excel: "우", merit: "장" };
    var LEVELS = [
      ["national", "전국 대회", "National"],
      ["contest", "공모전 · 게임대전", "Contest"],
      ["regional", "지방 대회", "Regional"],
      ["school", "교내 대회", "School"]
    ];
    var awards = S.awards || [];
    set("awardList", LEVELS.map(function (L) {
      var rows = awards.filter(function (a) { return (a.level || "regional") === L[0]; })
        .sort(function (a, b) { return b.year - a.year; });
      if (!rows.length) return "";
      return '<li class="ach-level lv-' + L[0] + '"><span>' + L[1] + '</span><span class="px-label">' + L[2] + '</span></li>' +
        rows.map(function (a) {
          var p = byId[a.project];
          return '<li class="ach rv lv-' + L[0] + '"><span class="medal ' + esc(a.tier) + '">' + (medalChar[a.tier] || "★") + '</span>' +
            '<div><span class="ach-meta">' + esc(a.year) + ' · ' + esc(a.field) + '</span><strong>' + esc(a.event) + '</strong>' +
            (p ? '<a class="ach-proj" href="' + BASE + 'projects.html#' + esc(p.id) + '">' + esc(p.title) + ' →</a>' : "") +
            '</div><span class="ach-result ' + esc(a.tier) + '">' + esc(a.result) + '</span></li>';
        }).join("");
    }).join(""));

    set("jamList", (S.jams || []).map(function (j) {
      var p = byId[j.project];
      var meta = [j.date, j.theme ? "주제 '" + j.theme + "'" : ""].filter(Boolean).join(" · ");
      return '<li class="ach rv"><span class="medal jam' + (j.highlight ? " hi" : "") + '">JAM</span>' +
        '<div>' + (meta ? '<span class="ach-meta">' + esc(meta) + '</span>' : "") + '<strong>' + esc(j.event) + '</strong>' +
        (p ? '<a class="ach-proj" href="' + BASE + 'projects.html#' + esc(p.id) + '">' + esc(p.title) + ' →</a>' : "") +
        '</div><span class="ach-result jam' + (j.highlight ? " hi" : "") + '">' + esc(j.result) + '</span></li>';
    }).join(""));

    // projects preview
    var feat = S.featured || [];
    var list = projects.slice().sort(function (a, b) { return b.no - a.no; })
      .filter(function (p) { return feat.indexOf(p.id) < 0; }).slice(0, 6);
    set("projPreview", list.map(projectCard).join(""));
    set("projCount", projects.length);

    // recent logs
    set("recentLogs", logs.filter(function (d) { return !d.minor; }).slice(0, 5).map(function (d) {
      var href = d.url ? url(d.url) : BASE + "devlogs.html#" + logId(d);
      return '<li class="rlog rv"><time>' + esc(d.date) + '</time>' +
        '<a href="' + esc(href) + '">' + media(d.thumb ? "devlog/Thumb/" + d.thumb : "", logLabel(d)) + '</a>' +
        '<div><h3><a href="' + esc(href) + '">' + esc(d.title) + '</a></h3><p>' + esc(stripHtml(d.desc)) + '</p></div>' +
        (d.project ? '<span class="tag proj">' + esc(d.project) + '</span>' : "<span></span>") + '</li>';
    }).join(""));
    set("logCount", logCount);

    // contact
    var mail = $("#mailLink");
    if (mail && P.email) { mail.href = "mailto:" + P.email; mail.textContent = P.email; }
    set("socials", (P.socials || []).map(function (s) {
      return '<a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + (ICON[s.id] || "") + esc(s.label) + '</a>';
    }).join(""));
    var copy = $("#copyMail");
    if (copy) copy.addEventListener("click", function () {
      var done = function () { copy.textContent = "복사됨 ✓"; setTimeout(function () { copy.textContent = "주소 복사"; }, 1600); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(P.email).then(done, fallback);
      else fallback();
      function fallback() {
        var t = document.createElement("textarea"); t.value = P.email; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        t.remove();
      }
    });
  }

  /* ---------- projects page ---------- */
  function projectsPage() {
    var FILTERS = [
      ["all", "전체", function () { return true; }],
      ["dev", "개발 중", function (p) { return p.status === "dev"; }],
      ["award", "수상작", function (p) { return !!p.award; }],
      ["jam", "게임잼", function (p) { return !!p.jam; }],
      ["3d", "3D", function (p) { return p.dim === "3D"; }],
      ["2d", "2D", function (p) { return p.dim === "2D"; }],
      ["etc", "Web · UGC", function (p) { return p.dim !== "2D" && p.dim !== "3D"; }]
    ];
    var cur = "all";
    var sorted = projects.slice().sort(function (a, b) { return b.no - a.no; });
    set("projTotal", projects.length);

    function draw() {
      set("projFilters", FILTERS.map(function (f) {
        var n = projects.filter(f[2]).length;
        if (!n) return "";
        return '<button class="chip' + (cur === f[0] ? " on" : "") + '" data-f="' + f[0] + '">' + f[1] + '<small>' + n + '</small></button>';
      }).join(""));
      var fn = FILTERS.filter(function (f) { return f[0] === cur; })[0][2];
      set("projGrid", sorted.filter(fn).map(projectCard).join(""));
      reveal();
    }
    $("#projFilters").addEventListener("click", function (e) {
      var b = e.target.closest("[data-f]"); if (!b) return;
      cur = b.getAttribute("data-f"); draw();
    });
    draw();

    // modal
    var modal = $("#modal");
    function open(id) {
      var p = byId[id]; if (!p) return;
      var meta = ["No." + pad(p.no), p.dim, p.period || p.year].filter(Boolean).join(" · ");
      set("modalBox", media(p.img, p.title) +
        '<div class="modal-body">' +
        '<div class="modal-top"><span class="mono dim" style="font-size:12.5px">' + esc(meta) + '</span>' +
        '<button class="modal-close" data-close aria-label="닫기">×</button></div>' +
        '<h2 id="modalTitle">' + esc(p.title) + '</h2>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' + statusChip(p) + badge(p) + '</div>' +
        '<p>' + esc(p.long || p.desc) + '</p>' +
        tags(p.tags) + actions(p) + '</div>');
      modal.classList.add("open");
      document.documentElement.style.overflow = "hidden";
      var c = modal.querySelector("[data-close]"); if (c) c.focus();
    }
    function close() {
      modal.classList.remove("open");
      document.documentElement.style.overflow = "";
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    }
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("open")) close(); });
    $("#projGrid").addEventListener("click", function (e) {
      var a = e.target.closest("[data-id]"); if (!a) return;
      e.preventDefault();
      history.replaceState(null, "", "#" + a.getAttribute("data-id"));
      open(a.getAttribute("data-id"));
    });
    function fromHash() { var id = decodeURIComponent(location.hash.slice(1)); if (byId[id]) open(id); }
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* ---------- devlogs page ---------- */
  function devlogsPage() {
    var params = new URLSearchParams(location.search);
    var st = { project: params.get("project") || "all", tag: params.get("tag") || "all", q: "", asc: false, season: params.get("season") };
    if (!st.season) {
      // 특정 프로젝트/로그로 들어오면 그 로그가 있는 시즌을, 아니면 최신 시즌을 보여줌
      var target = null;
      if (location.hash) logs.forEach(function (d) { if ("#" + logId(d) === location.hash) target = d; });
      if (target) st.season = String(seasonOf(target));
      else if (st.project !== "all") {
        var ss = []; logs.forEach(function (d) { if (d.project === st.project && ss.indexOf(seasonOf(d)) < 0) ss.push(seasonOf(d)); });
        st.season = ss.length === 1 ? String(ss[0]) : "all";
      } else st.season = seasons.length ? String(seasons[0].id) : "all";
    }

    function pool() { return st.season === "all" ? logs : logs.filter(function (d) { return String(seasonOf(d)) === st.season; }); }
    function seasonObj() { var o = null; seasons.forEach(function (x) { if (String(x.id) === st.season) o = x; }); return o; }
    function periodOf(list) {
      if (!list.length) return "";
      var first = list[list.length - 1], last = list[0];
      return first.date.slice(0, 7) + " – " + (last.end || last.date).slice(0, 7);
    }

    function sync() {
      var p = new URLSearchParams();
      if (st.season !== (seasons.length ? String(seasons[0].id) : "all")) p.set("season", st.season);
      if (st.project !== "all") p.set("project", st.project);
      if (st.tag !== "all") p.set("tag", st.tag);
      var qs = p.toString();
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    }

    function drawSeasons() {
      if (!seasons.length) return;
      set("seasonTabs", seasons.map(function (x) {
        var list = logs.filter(function (d) { return seasonOf(d) === x.id; });
        var n = list.filter(isCounted).length;
        return '<button class="season' + (st.season === String(x.id) ? " on" : "") + '" data-season="' + x.id + '">' +
          '<span class="px-label">' + esc(x.name) + (x === seasons[0] ? ' · Now' : "") + '</span>' +
          '<strong>' + esc(x.title) + '</strong>' +
          '<small>' + esc(x.end ? periodOf(list) : x.start.slice(0, 7) + " – 진행 중") + ' · ' + n + ' logs</small></button>';
      }).join("") +
        '<button class="season all' + (st.season === "all" ? " on" : "") + '" data-season="all"><span class="px-label">All</span><strong>전체 기록</strong><small>' + logs.filter(isCounted).length + ' logs</small></button>');
    }

    function drawSide() {
      var P = pool();
      function cnt(kind, v) {
        return P.filter(function (d) { return kind === "project" ? (d.project || "기타") === v : (d.tags || []).indexOf(v) >= 0; }).length;
      }
      var names = [];
      P.forEach(function (d) { if (d.kind === "interlude") return; var k = d.project || "기타"; if (names.indexOf(k) < 0) names.push(k); });
      if (st.project !== "all" && names.indexOf(st.project) < 0) names.push(st.project);
      names.sort(function (a, b) { if (a === "기타") return 1; if (b === "기타") return -1; return cnt("project", b) - cnt("project", a); });
      set("projList", '<button data-p="all" class="' + (st.project === "all" ? "on" : "") + '"><span>전체</span><small>' + P.filter(isCounted).length + '</small></button>' +
        names.map(function (n) {
          return '<button data-p="' + esc(n) + '" class="' + (st.project === n ? "on" : "") + '"><span>' + esc(n) + '</span><small>' + cnt("project", n) + '</small></button>';
        }).join(""));

      var tc = {};
      P.forEach(function (d) { (d.tags || []).forEach(function (t) { tc[t] = (tc[t] || 0) + 1; }); });
      var tl = Object.keys(tc).filter(function (t) { return tc[t] >= 2 || t === st.tag; }).sort(function (a, b) { return tc[b] - tc[a]; });
      set("tagList", '<button class="chip' + (st.tag === "all" ? " on" : "") + '" data-t="all">전체</button>' +
        tl.map(function (t) {
          return '<button class="chip' + (st.tag === t ? " on" : "") + '" data-t="' + esc(t) + '">' + esc(t) + '<small>' + (tc[t] || 0) + '</small></button>';
        }).join(""));
      set("sortBox", '<button class="chip' + (!st.asc ? " on" : "") + '" data-s="desc">최신순</button><button class="chip' + (st.asc ? " on" : "") + '" data-s="asc">처음부터</button>');
    }

    function drawInfo() {
      var p = null;
      projects.forEach(function (x) { if (x.logKey && x.logKey === st.project) p = x; });
      if (p) {
        var all = logs.filter(function (d) { return d.project === st.project; });
        var first = all[all.length - 1], last = all[0];
        set("projInfo", '<div class="proj-info">' + media(p.img, p.title) +
          '<div><div style="display:flex;gap:8px;flex-wrap:wrap">' + statusChip(p) + badge(p) + '</div>' +
          '<h2>' + esc(p.title) + '</h2><p>' + esc(p.desc) + '</p>' +
          '<div class="proj-stats"><span>LOGS <b>' + all.length + '</b></span><span>FIRST <b>' + esc(first.date) + '</b></span><span>LATEST <b>' + esc(last.end || last.date) + '</b></span></div>' +
          '<a class="log-more" href="' + BASE + 'projects.html#' + esc(p.id) + '">프로젝트 정보 →</a></div></div>');
        return;
      }
      var so = seasonObj();
      if (so && st.project === "all") {
        var list = pool();
        set("projInfo", '<div class="season-info"><span class="px-label">' + esc(so.name) + (so === seasons[0] ? " · Now Playing" : " · Cleared") + '</span>' +
          '<h2>' + esc(so.title) + '</h2>' + (so.desc ? '<p>' + esc(so.desc) + '</p>' : "") +
          '<div class="proj-stats"><span>LOGS <b>' + list.filter(isCounted).length + '</b></span><span>PERIOD <b>' + esc(so.end ? periodOf(list) : so.start.slice(0, 7) + " – 진행 중") + '</b></span></div></div>');
        return;
      }
      set("projInfo", "");
    }

    function interlude(d) {
      return '<section class="interlude rv" id="' + logId(d) + '">' +
        '<div class="il-head"><span class="px-label">Interlude</span><time>' + esc(dateRange(d)) + '</time></div>' +
        '<h3>' + esc(d.title) + '</h3>' + (d.desc ? '<p>' + d.desc + '</p>' : "") +
        (d.events ? '<ol class="il-events">' + d.events.map(function (e) {
          return '<li><time>' + esc(e.date) + '</time><span>' + esc(e.name) + '</span><b class="' + esc(e.tier || "none") + '">' + esc(e.result) + '</b></li>';
        }).join("") + '</ol>' : "") + '</section>';
    }

    function drawList() {
      var q = st.q.trim().toLowerCase();
      var P = pool();
      var items = P.filter(function (d) {
        if (d.kind === "interlude") return st.project === "all" && st.tag === "all" && !q;
        if (st.project !== "all" && (d.project || "기타") !== st.project) return false;
        if (st.tag !== "all" && (d.tags || []).indexOf(st.tag) < 0) return false;
        if (q && (d.title + " " + stripHtml(d.desc) + " " + (d.project || "")).toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
      if (st.asc) items = items.slice().reverse();
      drawInfo();
      set("logTotal", P.filter(isCounted).length);
      set("logShown", items.filter(isCounted).length);
      if (!items.length) { set("timeline", '<div class="empty">조건에 맞는 로그가 없습니다.</div>'); return; }

      var groups = [], key = null;
      items.forEach(function (d) {
        if (d.kind === "interlude") { groups.push({ il: d }); key = null; return; }
        var k = d.date.slice(0, 7);
        if (k !== key) { groups.push({ k: k, items: [] }); key = k; }
        groups[groups.length - 1].items.push(d);
      });
      set("timeline", groups.map(function (g) {
        if (g.il) return interlude(g.il);
        return '<section class="month"><h2 class="month-label">' + esc(g.k) + '<small>' + g.items.length + ' logs</small></h2>' +
          g.items.map(function (d) {
            var href = d.url ? url(d.url) : null;
            var thumb = media(d.thumb ? "devlog/Thumb/" + d.thumb : "", logLabel(d));
            return '<article class="log rv' + (d.minor ? " minor" : "") + '" id="' + logId(d) + '">' +
              (href ? '<a href="' + esc(href) + '">' + thumb + '</a>' : thumb) +
              '<div class="log-body"><div class="log-meta"><span class="log-no">' + esc(logLabel(d)) + '</span><time>' + esc(dateRange(d)) + '</time></div>' +
              '<h3>' + (href ? '<a href="' + esc(href) + '">' + esc(d.title) + '</a>' : esc(d.title)) + '</h3>' +
              '<p>' + (d.desc || "") + '</p>' +
              tags(d.tags, d.project ? '<span class="tag proj">' + esc(d.project) + '</span>' : "") +
              (href ? '<a class="log-more" href="' + esc(href) + '">자세히 보기 →</a>' : "") +
              '</div></article>';
          }).join("") + '</section>';
      }).join(""));
      reveal();
    }

    function redraw() { drawSeasons(); drawSide(); drawList(); sync(); }

    var tabs = $("#seasonTabs");
    if (tabs) tabs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-season]"); if (!b) return;
      st.season = b.getAttribute("data-season"); st.project = "all"; st.tag = "all"; redraw();
    });
    $("#projList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-p]"); if (!b) return;
      st.project = b.getAttribute("data-p"); redraw();
    });
    $("#tagList").addEventListener("click", function (e) {
      var b = e.target.closest("[data-t]"); if (!b) return;
      st.tag = b.getAttribute("data-t"); redraw();
    });
    $("#sortBox").addEventListener("click", function (e) {
      var b = e.target.closest("[data-s]"); if (!b) return;
      st.asc = b.getAttribute("data-s") === "asc"; redraw();
    });
    var timer;
    $("#logSearch").addEventListener("input", function (e) {
      clearTimeout(timer);
      timer = setTimeout(function () { st.q = e.target.value; drawList(); }, 120);
    });
    redraw();

    if (location.hash) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) { t.classList.add("in"); setTimeout(function () { t.scrollIntoView(); }, 50); }
    }
  }

  /* ---------- story pages (dev/*.html, devlog/*.html) ---------- */
  function storyPage() {
    // 이미지 확대 보기
    var imgs = document.querySelectorAll(".gallery img, .story-img");
    if (imgs.length) {
      var lb = document.createElement("div");
      lb.className = "lightbox";
      lb.innerHTML = "<img alt=\"\">";
      document.body.appendChild(lb);
      lb.addEventListener("click", function () { lb.classList.remove("open"); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
      imgs.forEach(function (im) {
        im.style.cursor = "zoom-in";
        im.addEventListener("click", function () { lb.firstChild.src = im.src; lb.classList.add("open"); });
      });
    }

    var p = byId[body.getAttribute("data-project")];
    if (!p) return;
    var act = $("#storyActions");
    if (act) {
      var link = url(p.link);
      act.innerHTML = (link ? '<a class="btn pri" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || "플레이") + ' ↗</a>' : "") +
        '<a class="btn" href="' + BASE + 'projects.html#' + esc(p.id) + '">프로젝트 정보</a>';
    }
    var badgeBox = $("#storyBadge");
    if (badgeBox) badgeBox.innerHTML = badge(p);

    var nav = $("#storyNav");
    if (nav) {
      var list = projects.filter(function (x) { return /^dev\//.test(x.dev || ""); }).sort(function (a, b) { return a.no - b.no; });
      var i = -1;
      list.forEach(function (x, k) { if (x.id === p.id) i = k; });
      var prev = list[i - 1], next = list[i + 1];
      nav.innerHTML =
        (prev ? '<a href="' + esc(url(prev.dev)) + '"><small>← PREV</small><strong>' + esc(prev.title) + '</strong></a>' : "") +
        (next ? '<a href="' + esc(url(next.dev)) + '"><small>NEXT →</small><strong>' + esc(next.title) + '</strong></a>' : "");
    }
  }

  /* ---------- reveal on scroll ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -40px 0px" }) : null;
  function reveal() {
    document.querySelectorAll(".rv:not(.in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("in");
    });
  }

  chrome();
  if (PAGE === "home") home();
  if (PAGE === "projects" && $("#projGrid")) projectsPage();
  if (PAGE === "devlogs" && $("#timeline")) devlogsPage();
  if (body.hasAttribute("data-story")) storyPage();
  reveal();
})();
