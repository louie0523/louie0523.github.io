/* =========================================================
   렌더링 스크립트 — 내용은 data.js에서 수정하세요.
   ========================================================= */
function siteMain() {
  "use strict";
  var S = window.SITE || { profile: {}, projects: [], devlogs: [], awards: [], jams: [], featured: [] };
  var body = document.body;
  var BASE = body.getAttribute("data-base") || "";
  var PAGE = body.getAttribute("data-page") || "";

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
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
  /* 데브로그 종류: (일반) · diary 개인 일지 · event 행사 기록 · interlude 공백 요약 */
  var KIND = { diary: "개인 일지", event: "행사 기록" };
  function groupOf(d) { return d.project || KIND[d.kind] || "기타"; }
  function kindChip(d) { return KIND[d.kind] ? '<span class="tag kind">' + KIND[d.kind] + (d.place ? ' · ' + esc(d.place) : "") + '</span>' : ""; }
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
  /* GIF는 평소에 정지 이미지(poster)로 보여주고, 마우스를 올렸을 때만 재생합니다. */
  function media(src, label, extra, poster) {
    var u = url(src);
    var isGif = u && /\.gif(\?|$)/i.test(u);
    var still = isGif && poster ? url(poster) : null;
    var attrs = isGif ? ' data-gif="' + esc(u) + '"' + (still ? ' data-still="' + esc(still) + '"' : "") : "";
    return '<div class="media' + (u ? "" : " is-empty") + '">' +
      (u ? '<img src="' + esc(still || u) + '"' + attrs + ' alt="' + esc(label) + '" loading="lazy" decoding="async" onerror="window.__imgErr&&window.__imgErr(this)">' : "") +
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
      media(p.img, p.title, "", p.imgPoster) +
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
        '<a href="' + BASE + 'notes.html" data-k="notes">노트</a>' +
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
    if (q) {
      var qe = $("#pcQuest");
      if (qe && qe.classList.contains("win-quest")) qe.innerHTML = '<span><small>CURRENT QUEST</small>' + esc(q.title) + '</span><span>→</span>';
      else set("pcQuest", '<span class="px-label">CURRENT QUEST</span><strong><span>' + esc(q.title) + '</span><span>→</span></strong>');
    }

    // featured
    set("featGrid", (S.featured || []).map(function (id, i) {
      var p = byId[id];
      if (!p) { console.warn('[data.js] featured에 있는 "' + id + '" 와 같은 id의 프로젝트가 없습니다.'); return ""; }
      return '<article class="feat rv' + (i === 0 ? " main" : "") + '" id="f-' + esc(p.id) + '">' +
        media(p.img, p.title, "", p.imgPoster) +
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
          return '<li class="ach lv-' + L[0] + '"><span class="medal ' + esc(a.tier) + '">' + (medalChar[a.tier] || "★") + '</span>' +
            '<div><span class="ach-meta">' + esc(a.year) + ' · ' + esc(a.field) + '</span><strong>' + esc(a.event) + '</strong>' +
            (p ? '<a class="ach-proj" href="' + BASE + 'projects.html#' + esc(p.id) + '">' + esc(p.title) + ' →</a>' : "") +
            '</div><span class="ach-result ' + esc(a.tier) + '">' + esc(a.result) + '</span></li>';
        }).join("");
    }).join(""));

    set("jamList", (S.jams || []).map(function (j) {
      var p = byId[j.project];
      var meta = [j.date, j.theme ? "주제 '" + j.theme + "'" : ""].filter(Boolean).join(" · ");
      return '<li class="ach"><span class="medal jam' + (j.highlight ? " hi" : "") + '">JAM</span>' +
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
        '<a href="' + esc(href) + '">' + media(d.thumb ? "devlog/Thumb/" + d.thumb : "", logLabel(d), "", d.poster ? "devlog/Thumb/" + d.poster : "") + '</a>' +
        '<div><h3><a href="' + esc(href) + '">' + esc(d.title) + '</a></h3><p>' + esc(stripHtml(d.desc)) + '</p></div>' +
        (d.project ? '<span class="tag proj">' + esc(d.project) + '</span>' : KIND[d.kind] ? '<span class="tag kind">' + KIND[d.kind] + '</span>' : "<span></span>") + '</li>';
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
      ach("mail");
    });
    if ($("#hudStats") || $("#shelfRow")) playHome(P, logCount);
    var rn = $("#recentNotes");
    if (rn) {
      var ns = notesSorted().slice(0, 3);
      var sec = rn.closest("section");
      if (!ns.length) { if (sec) sec.style.display = "none"; }
      else { rn.innerHTML = ns.map(function (n) { return noteCard(n, true); }).join(""); set("noteCount", (S.notes || []).length); }
    }
  }

  /* =========================================================
     PLAY MODE (메인): 픽셀 아이콘 · 모니터 바탕화면 · CD 진열장
     ========================================================= */
  var PXC = { K: "#14121b", k: "#23202c", W: "#f4f1fa", Y: "#e0a91f", y: "#ffd23f", O: "#ff5b2e", B: "#8a86a0", V: "#8b7bff",
    P: "#ff5fa2", p: "#ffc2dc", C: "#39e3c5", c: "#a6f5e6", R: "#ff4a4a", S: "#c9c4d6", G: "#62d48f" };
  var PXI = {
    folder: ["............", ".YYYY.......", "YyyyyYYYYYY.", "YyyyyyyyyyyY", "YYYYYYYYYYYY", "YyyyyyyyyyyY", "YyyyyyyyyyyY", "YyyyyyyyyyyY", "YyyyyyyyyyyY", "YYYYYYYYYYYY"],
    note: ["..KKKKKKKK..", "..KWWWWWWK..", "..KWBBBBWK..", "..KWWWWWWK..", "..KWBBBBWK..", "..KWWWWWWK..", "..KWBBBWWK..", "..KWWWWWWK..", "..KWWWWOOK..", "..KKKKKKKK.."],
    trophy: ["..YYYYYYYY..", "YYyyyyyyyyYY", "Y.yyyyyyyy.Y", "Y.yyWyyyyy.Y", ".YyyyyyyyyY.", "...yyyyyy...", ".....yy.....", ".....yy.....", "...KKKKKK...", "...KKKKKK..."],
    pad: ["............", "..VVVVVVVV..", ".VVVVVVVVVV.", "VVWVVVVVVPVV", "VWWWVVVVPVCV", "VVWVVVVVVCVV", "VVVVVVVVVVVV", "VVVV....VVVV", ".VV......VV.", "............"],
    mail: ["............", "KKKKKKKKKKKK", "KWKWWWWWWKWK", "KWWKWWWWKWWK", "KWWWKWWKWWWK", "KWWWWKKWWWWK", "KWWWWWWWWWWK", "KWWWWWWWWWWK", "KKKKKKKKKKKK", "............"],
    play: ["............", ".RRRRRRRRRR.", "RRRRRRRRRRRR", "RRRRWRRRRRRR", "RRRRWWWRRRRR", "RRRRWWWWRRRR", "RRRRWWWRRRRR", "RRRRWRRRRRRR", ".RRRRRRRRRR.", "............"],
    term: ["KKKKKKKKKKKK", "KSSSSSSSSSSK", "KkkkkkkkkkkK", "KkGkkkkkkkkK", "KkkGkkkkkkkK", "KkGkkGGGkkkK", "KkkkkkkkkkkK", "KkkkkkkkkkkK", "KKKKKKKKKKKK", "............"],
    cam: ["............", "...PPPP.....", "PPPPPPPPPPPP", "PppppKKppppP", "PpppKWWKpppP", "PpppKWWKpppP", "PppppKKppppP", "PppppppppppP", "PPPPPPPPPPPP", "............"],
    cart: ["..CCCCCCCC..", "..CccccccC..", "..CcKKKKcC..", "..CcKWWKcC..", "..CcKKKKcC..", "..CccccccC..", "..CcCcCcCC..", "..CCCCCCCC..", "...C.C.C....", "............"],
    secret: ["..KKKKKK....", "..KWWWWKK...", "..KWWWWKWK..", "..KWOOOWKK..", "..KWWWOWWK..", "..KWWOOWWK..", "..KWWWWWWK..", "..KWWOWWWK..", "..KWWWWWWK..", "..KKKKKKKK.."],
    star: ["......y.....", ".....yy.....", ".....yyy....", "yyyyyyyyyyyy", ".yyyyyyyyyy.", "..yyyyyyyy..", "..yyyyyyyy..", ".yyyy..yyyy.", ".yyy....yyy.", ".y........y."],
    memo: ["YYYYYYYYYY..", "YyyyyyyyyY..", "YyKKKKKKyY..", "YyyyyyyyyY..", "YyKKKKKyyY..", "YyyyyyyyyY..", "YyKKKKKKyYY.", "YyyyyyyyyyYY", "YyyyyyyyYYY.", "YYYYYYYYY..."],
    disc: ["...SSSSSS...", "..SccccccS..", ".SccCCCCccS.", ".ScCC..CCcS.", ".ScC.KK.CcS.", ".ScC.KK.CcS.", ".ScCC..CCcS.", ".SccCCCCccS.", "..SccccccS..", "...SSSSSS..."]
  };
  function px(name) {
    var g = PXI[name] || PXI.disc, w = g[0].length, h = g.length, r = "";
    g.forEach(function (row, y) { for (var x = 0; x < row.length; x++) { var c = PXC[row[x]]; if (c) r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c + '"/>'; } });
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges" aria-hidden="true">' + r + '</svg>';
  }
  window.__px = px;
  function ach(id) { if (window.__ach) window.__ach(id); }

  function playHome(P, logCount) {
    var awards = S.awards || [], nat = awards.filter(function (a) { return a.level === "national"; }).length;
    // HUD 스탯
    set("hudStats", [
      ["disc", projects.length, "PROJECTS", "var(--cyan)"],
      ["note", logCount, "DEVLOGS", "var(--violet)"],
      ["trophy", awards.length + (nat ? '<small style="display:inline;margin-left:4px">전국 ' + nat + '</small>' : ""), "AWARDS", "var(--yellow)"],
      ["pad", (S.jams || []).length, "GAME JAMS", "var(--pink)"]
    ].map(function (x) {
      return '<div class="hud-stat" style="--c:' + x[3] + '">' + px(x[0]) + '<div><b>' + x[1] + '</b><small>' + x[2] + '</small></div></div>';
    }).join(""));

    monitor(P, logCount);
    shelf();
  }

  /* ---------- 모니터 바탕화면 ---------- */
  function monitor(P, logCount) {
    var screen = $("#monScreen"); if (!screen) return;
    var socialIcon = { youtube: "play", github: "term", instagram: "cam", itch: "cart" };
    var apps = [
      { label: "프로젝트", icon: "folder", href: "#shelf" },
      { label: "데브로그", icon: "note", href: BASE + "devlogs.html" },
      { label: "수상", icon: "trophy", href: "#awards" },
      { label: "노트", icon: "memo", href: BASE + "notes.html" },
      { label: "메일", icon: "mail", href: "#contact" }
    ];
    (P.socials || []).forEach(function (s) { apps.push({ label: s.label, icon: socialIcon[s.id] || "cart", href: s.url, ext: true }); });
    apps.push({ label: "secret.txt", icon: "secret", secret: true });

    set("deskIcons", apps.map(function (a, i) {
      return '<a class="app" href="' + esc(a.href || "#") + '" data-app="' + i + '"' + (a.ext ? ' target="_blank" rel="noopener"' : "") + '>' + px(a.icon) + '<span>' + esc(a.label) + '</span></a>';
    }).join(""));

    $("#deskIcons").addEventListener("click", function (e) {
      var el = e.target.closest("[data-app]"); if (!el) return;
      var a = apps[+el.getAttribute("data-app")];
      if (a.secret) { e.preventDefault(); openNote(); return; }
      if (a.ext) { launchFx(el); return; }            // 새 탭은 바로 열기 (팝업 차단 방지)
      e.preventDefault();
      launchFx(el, function () {
        if (a.href.charAt(0) === "#") { var t = document.querySelector(a.href); if (t) t.scrollIntoView({ behavior: "smooth" }); }
        else location.href = a.href;
      });
    });

    function launchFx(el, done) {
      el.classList.add("launch");
      var sr = screen.getBoundingClientRect(), r = el.getBoundingClientRect();
      var z = document.createElement("div"); z.className = "zoomwin";
      z.style.left = (r.left - sr.left) + "px"; z.style.top = (r.top - sr.top) + "px"; z.style.width = r.width + "px"; z.style.height = r.height + "px";
      screen.appendChild(z);
      requestAnimationFrame(function () { requestAnimationFrame(function () { z.style.left = "4%"; z.style.top = "4%"; z.style.width = "92%"; z.style.height = "84%"; z.style.opacity = "0"; }); });
      setTimeout(function () { z.remove(); el.classList.remove("launch"); if (done) done(); }, 420);
    }

    // 창: 드래그 · 최소화 · 닫기
    var win = $("#winPlayer"), tb = $("#tbPlayer");
    function toggleWin(show) { win.classList.toggle("min", !show); tb.classList.toggle("on", show); }
    win.querySelector("[data-win-min]").onclick = function () { toggleWin(false); };
    win.querySelector("[data-win-close]").onclick = function () { toggleWin(false); };
    tb.onclick = function () { toggleWin(win.classList.contains("min")); };
    dragWin(win, screen);

    // 시계
    var clock = $("#tbClock");
    function tick() { var d = new Date(); clock.textContent = pad(d.getHours()) + ":" + pad(d.getMinutes()); }
    tick(); setInterval(tick, 20000);

    // 부팅 (세션당 한 번)
    var boot = $("#boot"), seen = false;
    try { seen = sessionStorage.getItem("bello-boot") === "1"; sessionStorage.setItem("bello-boot", "1"); } catch (e) {}
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { boot.classList.add("off"); return; }
    var lines = [
      "BELLO BIOS v2.6  (C) 2024-" + new Date().getFullYear(),
      "ENGINE: Unity · C# .............. <span class=ok>OK</span>",
      "DISC SCAN: " + projects.length + " PROJECTS ........... <span class=ok>OK</span>",
      "PATCH NOTES: " + logCount + " LOGS ............ <span class=ok>OK</span>",
      "ACHIEVEMENTS: " + (S.awards || []).length + " UNLOCKED ........ <span class=ok>OK</span>",
      "",
      "BOOTING BELLO OS <span class=cur></span>"
    ];
    var i = 0, timer;
    function step() {
      boot.innerHTML = lines.slice(0, ++i).join("<br>");
      if (i < lines.length) timer = setTimeout(step, 170); else timer = setTimeout(end, 650);
    }
    function end() { clearTimeout(timer); boot.classList.add("off"); }
    boot.addEventListener("click", end);
    step();
  }
  function dragWin(win, area) {
    var bar = win.querySelector(".win-bar"), sx, sy, ox, oy, moved = false;
    bar.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button")) return;
      var ar = area.getBoundingClientRect(), wr = win.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = wr.left - ar.left; oy = wr.top - ar.top; moved = false;
      win.style.left = ox + "px"; win.style.top = oy + "px"; win.style.right = "auto"; win.style.bottom = "auto";
      win.classList.add("dragging"); bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener("pointermove", function (e) {
      if (!win.classList.contains("dragging")) return;
      var ar = area.getBoundingClientRect();
      var nx = Math.max(-win.offsetWidth + 60, Math.min(ar.width - 60, ox + e.clientX - sx));
      var ny = Math.max(0, Math.min(ar.height - 60, oy + e.clientY - sy));
      if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 6) moved = true;
      win.style.left = nx + "px"; win.style.top = ny + "px";
    });
    function up() { if (!win.classList.contains("dragging")) return; win.classList.remove("dragging"); if (moved) ach("drag"); }
    bar.addEventListener("pointerup", up); bar.addEventListener("pointercancel", up);
  }
  /* secret.txt 내용: data.js의 profile.secret (관리자 → 프로필 · 대표작에서 수정). 줄바꿈 그대로, **굵게** 사용 가능 */
  function secretBody() {
    var t = (S.profile || {}).secret;
    if (!t) return '게임 개발자라면 다 아는 그 커맨드…<br><b>↑ ↑ ↓ ↓ ← → ← → B A</b><br><span style="color:#5d5770">(모바일: 화면을 ↑↑↓↓←→←→ 로 스와이프한 뒤 두 번 탭)</span>';
    return esc(t).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
  }
  function openNote() {
    var screen = $("#monScreen"), n = $("#winNote");
    if (!n) {
      n = document.createElement("div"); n.className = "win win-note"; n.id = "winNote";
      n.innerHTML = '<div class="win-bar"><span>SECRET.TXT</span><button type="button" aria-label="닫기">×</button></div>' +
        '<div class="win-body">' + secretBody() + '</div>';
      $(".desk", screen).appendChild(n);
      n.querySelector("button").onclick = function () { n.classList.add("min"); };
      dragWin(n, screen);
    }
    n.classList.remove("min");
    ach("secret");
  }

  /* ---------- CD 진열장 ---------- */
  /* YouTube 링크 → 영상 id / 시작 초 */
  function ytId(u) { var m = /(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/.exec(u || ""); return m ? m[1] : null; }
  function ytStart(u) { var m = /[?&](?:t|start)=(\d+)/.exec(u || ""); return m ? +m[1] : 0; }
  function ytList(u) { var m = /[?&]list=([\w-]+)/.exec(u || ""); return m ? m[1] : null; }
  function ytEmbed(u) {   // 영상 / 재생목록 / 재생목록 속 영상 모두 지원
    var id = ytId(u), list = ytList(u), st = ytStart(u);
    var q = "autoplay=1&rel=0&playsinline=1" + (st ? "&start=" + st : "") + (list ? "&list=" + list : "");
    return "https://www.youtube-nocookie.com/embed/" + (id || "videoseries") + "?" + q;
  }
  function tracksOf(p) { var b = p.bgm; if (!b) return []; return (Array.isArray(b) ? b : [b]).filter(function (t) { return t && (ytId(t.url) || ytList(t.url)); }); }

  /* ---------- CD 디스크 (공용) ----------
     project.cdFx   : ["holo","gloss","vinyl","glitter","matte","mono","full"] 중 여러 개
     project.cdRim  : black(기본) | silver | white | gold | accent | none
     project.cdText : 디스크에 인쇄할 짧은 문구 */
  var RIMS = { black: "#0a0a0d", silver: "#b9bec9", white: "#f1f1f4", gold: "#d6ae55", accent: "#ff5b2e", none: "transparent" };
  function absUrl(u) { try { return new URL(u, location.href).href; } catch (e) { return u; } }
  function discImg(p) { var g = /\.gif$/i.test(p.img || ""); return url(g && p.imgPoster ? p.imgPoster : p.img); }
  function discHTML(p, cls) {
    var im = discImg(p), fx = (p.cdFx || []).filter(Boolean);
    var rim = RIMS[p.cdRim || "black"] || p.cdRim;
    return '<span class="cdx ' + (cls || "") + fx.map(function (f) { return " fx-" + f; }).join("") + (im ? "" : " blank") + '"' +
      ' style="--rim:' + esc(rim) + (im ? ";--img:url('" + esc(absUrl(im)) + "')" : "") + '">' +
      '<i class="art"></i><i class="sheen"></i>' +
      fx.map(function (f) { return '<i class="fx f-' + esc(f) + '"></i>'; }).join("") +
      (im ? "" : '<em>' + esc(p.title) + '</em>') +
      (p.cdText ? '<i class="cdtext"><span>' + esc(p.cdText) + '</span></i>' : "") +
      '<i class="ring"></i></span>';
  }
  window.__discHTML = discHTML;

  function shelf() {
    var row = $("#shelfRow"), deck = $("#deck"); if (!row || !deck) return;
    var feat = (S.featured || []).filter(function (id) { return byId[id]; });
    var list = feat.map(function (id) { return byId[id]; })
      .concat(projects.slice().sort(function (a, b) { return b.no - a.no; }).filter(function (p) { return feat.indexOf(p.id) < 0; }));
    var cur = -1, seen = {}, need = Math.ceil(list.length * 0.75);
    function label(p) {
      if (feat.indexOf(p.id) >= 0) return "대표작";
      if (p.award) return p.award;
      if (p.status === "dev") return "개발 중";
      return "";
    }

    row.innerHTML = list.map(function (p, i) {
      var lb = label(p);
      return '<button class="cd" type="button" role="option" data-i="' + i + '" aria-label="' + esc(p.title) + '">' +
        '<span class="cd-shadow">' + discHTML(p, "cd-disc") + '</span>' +
        '<span class="cd-title">' + esc(p.title) + '</span>' +
        '<span class="cd-meta">' + esc([p.dim, p.year].filter(Boolean).join(" · ")) +
        (lb ? ' <b>' + esc(lb) + '</b>' : "") + (tracksOf(p).length ? ' <span class="cd-note" title="수록곡 있음">♪</span>' : "") + '</span></button>';
    }).join("");
    set("projCount", projects.length);

    function stopMusic() {
      var box = $("#ytBox", deck); if (box) box.innerHTML = "";
      var d = $(".disc2", deck); if (d) d.classList.remove("playing");
      $$(".trk", deck).forEach(function (b) { b.classList.remove("on"); b.querySelector(".st").textContent = "▶"; });
      var led = $(".player-led span", deck); if (led) led.textContent = "STANDBY";
      deck.classList.remove("is-playing");
    }
    function playTrack(p, k) {
      var t = tracksOf(p)[k]; if (!t) return;
      var btn = $$(".trk", deck)[k];
      if (btn && btn.classList.contains("on")) { stopMusic(); return; }
      stopMusic();
      $("#ytBox", deck).innerHTML = '<iframe src="' + esc(ytEmbed(t.url)) + '" title="' + esc(t.title || "수록곡") + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      $(".disc2", deck).classList.add("playing");
      if (btn) { btn.classList.add("on"); btn.querySelector(".st").textContent = "■"; }
      $(".player-led span", deck).textContent = "TRACK " + pad(k + 1);
      deck.classList.add("is-playing");
    }

    function draw(p, i) {
      var isFeat = feat.indexOf(p.id) >= 0, tr = tracksOf(p);
      deck.innerHTML =
        '<div class="player"><div class="platter">' + discHTML(p, "disc2") + '</div>' +
        '<div class="player-led"><i></i><span>' + (tr.length ? "STANDBY" : "NO AUDIO") + '</span><b>DISC ' + pad(i + 1) + ' / ' + pad(list.length) + '</b></div></div>' +
        '<div class="deck-info"><div class="deck-top">' + (isFeat ? '<span class="pick">대표작</span>' : "") + statusChip(p) + badge(p) + '</div>' +
        '<h3>' + esc(p.title) + '</h3>' + (p.sub ? '<p class="sub">' + esc(p.sub) + '</p>' : "") +
        '<p class="desc">' + esc(p.long || p.desc) + '</p>' +
        (p.points ? '<ul class="points">' + p.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul>' : "") +
        tags(p.tags) + actions(p) +
        (tr.length ? '<div class="tracks"><div class="tr-head">작업하며 들은 곡</div>' +
          tr.map(function (t, k) {
            return '<button type="button" class="trk" data-tr="' + k + '"><span class="no">' + pad(k + 1) + '</span><span class="tt">' + esc(t.title || (ytId(t.url) ? "Track " + (k + 1) : "재생목록")) + '</span><span class="st">▶</span></button>';
          }).join("") + '<div class="yt" id="ytBox"></div></div>' : "") +
        '</div>';
      $$(".trk", deck).forEach(function (b) { b.onclick = function () { playTrack(p, +b.getAttribute("data-tr")); }; });
    }
    function select(i, focus) {
      if (i < 0 || i >= list.length || i === cur) return;
      var first = cur < 0;
      cur = i;
      $$(".cd", row).forEach(function (c, k) { c.classList.toggle("on", k === i); c.setAttribute("aria-selected", k === i); });
      var el = row.children[i];
      if (focus) el.focus({ preventScroll: true });
      if (!first) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      seen[list[i].id] = 1;
      if (Object.keys(seen).length >= need) ach("collector");
      if (first) { draw(list[i], i); return; }
      stopMusic();
      swapTo(list[i], i);
    }
    var swapping = 0;
    function swapTo(p, i) {
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      var old = $(".disc2", deck), token = ++swapping;
      if (reduce || !old || !old.animate) { draw(p, i); return; }
      // 1) 지금 디스크를 살짝 들어 올려 치움
      var out = old.animate([
        { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1 },
        { transform: "translate(22%,-26%) rotate(50deg) scale(1.04)", opacity: 0 }
      ], { duration: 220, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" });
      var info = $(".deck-info", deck);
      if (info) info.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(6px)" }], { duration: 180, fill: "forwards" });
      out.onfinish = function () {
        if (token !== swapping) return;
        draw(p, i);
        // 2) 새 디스크를 위에서 내려 플래터에 "촥" 안착
        var d = $(".disc2", deck), pl = $(".platter", deck), inf = $(".deck-info", deck);
        d.animate([
          { transform: "translate(-14%,-34%) rotate(-120deg) scale(1.1)", opacity: 0, offset: 0 },
          { transform: "translate(-2%,-4%) rotate(-14deg) scale(1.02)", opacity: 1, offset: 0.62 },
          { transform: "translate(0,0) rotate(0deg) scale(.985)", offset: 0.84 },
          { transform: "translate(0,0) rotate(0deg) scale(1)", opacity: 1, offset: 1 }
        ], { duration: 520, easing: "cubic-bezier(.22,.7,.3,1)" });
        if (pl) pl.animate([
          { transform: "scale(1)" }, { transform: "scale(1)", offset: 0.6 }, { transform: "scale(.985)", offset: 0.78 }, { transform: "scale(1)" }
        ], { duration: 560, easing: "ease-out" });
        if (inf) inf.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: 120, easing: "ease-out", fill: "backwards" });
      };
    }
    function run() {
      var p = list[cur], link = url(p.link), dev = url(p.dev);
      if (link) window.open(link, "_blank", "noopener"); else if (dev) location.href = dev;
    }
    row.addEventListener("click", function (e) {
      var c = e.target.closest(".cd"); if (!c) return;
      var i = +c.getAttribute("data-i");
      if (i === cur) run(); else select(i);
    });
    row.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); select(Math.min(list.length - 1, cur + 1), true); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); select(Math.max(0, cur - 1), true); }
    });
    if (list.length) select(0);
  }

  /* =========================================================
     노트 (팁 · 트러블슈팅 · 코드 정리 · 일상)
     ========================================================= */
  var NOTE_CAT = { tip: "꿀팁", trouble: "트러블슈팅", code: "코드 정리", daily: "일상" };
  function noteCat(n) { return NOTE_CAT[n.cat] || n.cat || "기타"; }
  function notesSorted() {
    return (S.notes || []).slice().sort(function (a, b) {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return a.date < b.date ? 1 : a.date > b.date ? -1 : (b.no || 0) - (a.no || 0);
    });
  }
  function noteCard(n, compact) {
    var href = n.url ? url(n.url) : null, tag = href ? "a" : "div";
    var cover = n.cover ? media(n.cover, n.title) : "";
    return '<' + tag + ' class="note-card rv' + (cover && !compact ? " has-cover" : "") + '"' + (href ? ' href="' + esc(href) + '"' : "") + '>' +
      '<div class="nc-body"><div class="nc-top"><span class="nc-cat c-' + esc(n.cat || "etc") + '"><i></i>' + esc(noteCat(n)) + '</span>' +
      '<time>' + esc(n.date) + '</time>' + (n.pinned && !compact ? '<span class="nc-pin">PINNED</span>' : "") + '</div>' +
      '<h3>' + esc(n.title) + '</h3>' + (n.summary ? '<p>' + esc(n.summary) + '</p>' : "") +
      (!compact && (n.tags || []).length ? tags(n.tags) : "") +
      (href ? '<span class="nc-more">읽기 →</span>' : "") + '</div>' +
      (cover && !compact ? '<div class="nc-cover">' + cover + '</div>' : "") + '</' + tag + '>';
  }
  function notesPage() {
    var all = notesSorted(), st = { cat: "all", tag: "all", q: "" };
    var params = new URLSearchParams(location.search);
    if (params.get("cat")) st.cat = params.get("cat");
    if (params.get("tag")) st.tag = params.get("tag");
    set("noteTotal", all.length);
    var cats = []; all.forEach(function (n) { var c = n.cat || "etc"; if (cats.indexOf(c) < 0) cats.push(c); });
    var order = ["tip", "trouble", "code", "daily"];
    cats.sort(function (a, b) { var x = order.indexOf(a), y = order.indexOf(b); return (x < 0 ? 9 : x) - (y < 0 ? 9 : y); });
    function draw() {
      set("noteCats", '<button class="chip' + (st.cat === "all" ? " on" : "") + '" data-c="all">전체<small>' + all.length + '</small></button>' +
        cats.map(function (c) {
          var n = all.filter(function (x) { return (x.cat || "etc") === c; }).length;
          return '<button class="chip' + (st.cat === c ? " on" : "") + '" data-c="' + esc(c) + '">' + esc(NOTE_CAT[c] || (c === "etc" ? "기타" : c)) + '<small>' + n + '</small></button>';
        }).join(""));
      var tc = {}; all.forEach(function (n) { (n.tags || []).forEach(function (t) { tc[t] = (tc[t] || 0) + 1; }); });
      var tl = Object.keys(tc).sort(function (a, b) { return tc[b] - tc[a]; }).slice(0, 16);
      set("noteTags", tl.length ? tl.map(function (t) { return '<button class="ntag' + (st.tag === t ? " on" : "") + '" data-t="' + esc(t) + '">#' + esc(t) + '</button>'; }).join("") : "");
      var q = st.q.trim().toLowerCase();
      var items = all.filter(function (n) {
        if (st.cat !== "all" && (n.cat || "etc") !== st.cat) return false;
        if (st.tag !== "all" && (n.tags || []).indexOf(st.tag) < 0) return false;
        if (q && (n.title + " " + (n.summary || "") + " " + (n.tags || []).join(" ")).toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
      set("noteList", items.length ? items.map(function (n) { return noteCard(n); }).join("")
        : '<div class="empty">' + (all.length ? "조건에 맞는 노트가 없습니다." : "아직 노트가 없어요. 관리자 페이지 → 노트에서 첫 글을 써보세요.") + '</div>');
      reveal();
    }
    $("#noteCats").addEventListener("click", function (e) { var b = e.target.closest("[data-c]"); if (!b) return; st.cat = b.getAttribute("data-c"); draw(); });
    $("#noteTags").addEventListener("click", function (e) { var b = e.target.closest("[data-t]"); if (!b) return; var t = b.getAttribute("data-t"); st.tag = st.tag === t ? "all" : t; draw(); });
    var tm; $("#noteSearch").addEventListener("input", function (e) { clearTimeout(tm); tm = setTimeout(function () { st.q = e.target.value; draw(); }, 120); });
    draw();
  }

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
      set("modalBox", media(p.img, p.title, "", p.imgPoster) +
        '<div class="modal-body">' +
        '<div class="modal-top"><span class="mono dim" style="font-size:12.5px">' + esc(meta) + '</span>' +
        '<button class="modal-close" data-close aria-label="닫기">×</button></div>' +
        '<h2 id="modalTitle">' + esc(p.title) + '</h2>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' + statusChip(p) + badge(p) + '</div>' +
        '<p>' + esc(p.long || p.desc) + '</p>' +
        tags(p.tags) + actions(p) + '</div>');
      modal.classList.add("open");
      gifs(modal);
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
        return P.filter(function (d) { return kind === "project" ? groupOf(d) === v : (d.tags || []).indexOf(v) >= 0; }).length;
      }
      var names = [];
      P.forEach(function (d) { if (d.kind === "interlude") return; var k = groupOf(d); if (names.indexOf(k) < 0) names.push(k); });
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
        set("projInfo", '<div class="proj-info">' + media(p.img, p.title, "", p.imgPoster) +
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
        if (st.project !== "all" && groupOf(d) !== st.project) return false;
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
            var thumb = media(d.thumb ? "devlog/Thumb/" + d.thumb : "", logLabel(d), "", d.poster ? "devlog/Thumb/" + d.poster : "");
            return '<article class="log rv' + (d.minor ? " minor" : "") + '" id="' + logId(d) + '">' +
              (href ? '<a href="' + esc(href) + '">' + thumb + '</a>' : thumb) +
              '<div class="log-body"><div class="log-meta"><span class="log-no">' + esc(logLabel(d)) + '</span><time>' + esc(dateRange(d)) + '</time></div>' +
              '<h3>' + (href ? '<a href="' + esc(href) + '">' + esc(d.title) + '</a>' : esc(d.title)) + '</h3>' +
              '<p>' + (d.desc || "") + '</p>' +
              tags(d.tags, kindChip(d) + (d.project ? '<span class="tag proj">' + esc(d.project) + '</span>' : "")) +
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
  /* 코드 블록: 간단한 하이라이트 + 복사 버튼 */
  var KW = "abstract as async await base bool break byte case catch char class const continue decimal default delegate do double else enum event explicit extern false finally float for foreach get goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed set short static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using var virtual void volatile while yield let function export import from".split(" ");
  function hiCode(src) {
    var out = "", re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?f?\b)|(\b[A-Za-z_]\w*\b)|([\s\S])/g, m;
    while ((m = re.exec(src))) {
      if (m[1]) out += '<span class="hl-c">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="hl-s">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="hl-n">' + esc(m[3]) + '</span>';
      else if (m[4]) out += KW.indexOf(m[4]) >= 0 ? '<span class="hl-k">' + m[4] + '</span>' : /^[A-Z]/.test(m[4]) ? '<span class="hl-t">' + m[4] + '</span>' : m[4];
      else out += esc(m[5]);
    }
    return out;
  }
  function codeBlocks() {
    $$(".section pre, .content pre").forEach(function (pre) {
      if (pre.getAttribute("data-ready")) return; pre.setAttribute("data-ready", "1");
      var code = pre.querySelector("code") || pre, raw = code.textContent;
      code.innerHTML = hiCode(raw);
      var b = document.createElement("button"); b.type = "button"; b.className = "copy-btn"; b.textContent = "복사";
      b.onclick = function () {
        var done = function () { b.textContent = "복사됨 ✓"; setTimeout(function () { b.textContent = "복사"; }, 1400); };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(raw).then(done);
        else { var t = document.createElement("textarea"); t.value = raw; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) {} t.remove(); }
      };
      pre.appendChild(b);
    });
  }

  function storyPage() {
    codeBlocks();
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

  /* ---------- GIF: 정지 이미지 + 호버 재생 ---------- */
  var stillCache = {};
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var noHover = window.matchMedia && matchMedia("(hover: none)").matches;
  window.__imgErr = function (img) {
    var gif = img.getAttribute("data-gif"), still = img.getAttribute("data-still");
    if (still && img.src.indexOf(still) >= 0 && gif) { img.removeAttribute("data-still"); img.src = gif; return; } // 정지 이미지가 없으면 GIF로
    img.parentNode.classList.add("is-empty"); img.remove();
  };
  function freeze(img) {
    // 정지 이미지 파일이 없는 GIF: 로드되면 첫 화면을 캡처해서 멈춰 둠 (재생 부담 제거)
    var gif = img.getAttribute("data-gif");
    function cap() {
      if (img._playing || img.getAttribute("data-still")) return;
      try {
        var w = img.naturalWidth, h = img.naturalHeight; if (!w) return;
        var k = Math.min(1, 480 / w), c = document.createElement("canvas");
        c.width = Math.round(w * k); c.height = Math.round(h * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        stillCache[gif] = c.toDataURL("image/jpeg", 0.82);
        img.src = stillCache[gif];
      } catch (e) { /* 다른 도메인 이미지면 그대로 둠 */ }
    }
    if (stillCache[gif]) { img.src = stillCache[gif]; return; }
    if (img.complete && img.naturalWidth) cap(); else img.addEventListener("load", cap, { once: true });
  }
  function play(img) {
    if (reduceMotion || img._playing) return;
    img._playing = true; img.src = img.getAttribute("data-gif");
  }
  function stop(img) {
    if (!img._playing) return;
    img._playing = false;
    var s = img.getAttribute("data-still") || stillCache[img.getAttribute("data-gif")];
    if (s) img.src = s;
  }
  var HOVER_SEL = ".log, .rlog, .pcard, .feat, .proj-info, .modal-box";
  var gifIO = ("IntersectionObserver" in window && noHover) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) play(e.target); else stop(e.target); });
  }, { threshold: 0.75 }) : null;
  function gifs(root) {
    (root || document).querySelectorAll("img[data-gif]:not([data-gif-ready])").forEach(function (img) {
      img.setAttribute("data-gif-ready", "");
      if (!img.getAttribute("data-still")) freeze(img);
      if (gifIO) gifIO.observe(img);
    });
  }
  if (!noHover) {
    document.addEventListener("mouseover", function (e) {
      var card = e.target.closest && e.target.closest(HOVER_SEL); if (!card || card.contains(e.relatedTarget)) return;
      card.querySelectorAll("img[data-gif]").forEach(play);
    });
    document.addEventListener("mouseout", function (e) {
      var card = e.target.closest && e.target.closest(HOVER_SEL); if (!card || card.contains(e.relatedTarget)) return;
      card.querySelectorAll("img[data-gif]").forEach(stop);
    });
  }

  /* ---------- reveal on scroll ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -40px 0px" }) : null;
  function reveal() {
    gifs();
    document.querySelectorAll(".rv:not(.in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("in");
    });
  }

  chrome();
  if (PAGE === "home") home();
  if (PAGE === "projects" && $("#projGrid")) projectsPage();
  if (PAGE === "devlogs" && $("#timeline")) devlogsPage();
  if (PAGE === "notes" && $("#noteList")) notesPage();
  if (body.hasAttribute("data-story")) storyPage();
  reveal();
}

/* data.js를 항상 최신으로 불러옵니다.
   GitHub Pages는 파일을 최대 10분 캐시하기 때문에, 게시 직후에도 새 글이 바로 보이도록
   1분 단위 버전 번호를 붙여 다시 받아온 뒤 화면을 그립니다. */
(function () {
  var started = false;
  function run() {
    if (started) return; started = true; siteMain();
    var f = document.createElement("script");
    f.src = (document.body.getAttribute("data-base") || "") + "assets/js/fun.js?v=" + Math.floor(Date.now() / 3600000);
    document.body.appendChild(f);
  }
  var base = document.body.getAttribute("data-base") || "";
  var s = document.createElement("script");
  s.src = base + "assets/js/data.js?v=" + Math.floor(Date.now() / 60000);
  s.onload = run;
  s.onerror = run;               // 실패하면 페이지에 이미 있는 data.js로 그림
  setTimeout(run, 4000);         // 너무 늦으면 그냥 진행
  document.head.appendChild(s);
})();
