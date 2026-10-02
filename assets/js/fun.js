/* =========================================================
   FUN.JS — 반응형 이펙트 · 업적 · 이스터에그
   - ↑↑↓↓←→←→BA : 햄버거가 떨어집니다 (새로고침하면 사라짐)
     모바일: ↑↑↓↓←→←→ 스와이프 후 두 번 탭
   - 햄버거 이미지는 data.js의 profile.burger (기본: Image/burger.png)
   ========================================================= */
(function () {
  "use strict";
  if (window.__funLoaded) return;
  window.__funLoaded = true;

  var S = window.SITE || {};
  var P = S.profile || {};
  var BASE = document.body.getAttribute("data-base") || "";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COLORS = ["#ff5b2e", "#ffd23f", "#39e3c5", "#ff5fa2", "#8b7bff"];

  /* ---------- 업적 토스트 ---------- */
  var ACH = {
    konami: ["햄버거 파티", "햄버거가 하늘에서 쏟아집니다"],
    burgerclick: ["햄버거 저글러", "떨어진 햄버거를 다시 튕겨 올렸다"],
    secret: ["버거 보완 계획", "🍔"],
    drag: ["어지러워요", "조금 울렁거리네요"],
    collector: ["디스크 수집가", "진열장 디스크의 75% 이상을 넣어봤다"],
    mail: ["원 코인", "이메일 주소를 복사했다"],
    clicker: ["100", "100번 클릭했다"]
  };
  var got = {}, box;
  window.__ach = function (id) {
    if (got[id] || !ACH[id]) return;
    got[id] = 1;
    if (!box) { box = document.createElement("div"); box.className = "toasts"; box.setAttribute("aria-live", "polite"); document.body.appendChild(box); }
    var t = document.createElement("div");
    t.className = "ach-toast";
    t.innerHTML = (window.__px ? window.__px("trophy") : "") +
      '<div><small>ACHIEVEMENT UNLOCKED</small><b>' + ACH[id][0] + '</b><span>' + ACH[id][1] + '</span></div>';
    box.appendChild(t);
    setTimeout(function () { t.remove(); }, 4200);
  };

  /* ---------- EXP 바 (스크롤 진행도) ---------- */
  var bar = document.createElement("div");
  bar.className = "exp-bar"; bar.innerHTML = "<i></i>";
  document.body.appendChild(bar);
  var fill = bar.firstChild;
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    var r = h > 0 ? Math.min(1, scrollY / h) : 0;
    fill.style.width = (r * 100) + "%";
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- 제목 글자 통통 ---------- */
  var hn = document.getElementById("heroName");
  if (hn && hn.firstChild && hn.firstChild.nodeType === 3) {
    var txt = hn.firstChild.textContent;
    var frag = document.createElement("span"); frag.className = "chs";
    Array.prototype.forEach.call(txt, function (ch) {
      var s = document.createElement("span"); s.className = "ch"; s.textContent = ch; frag.appendChild(s);
    });
    hn.replaceChild(frag, hn.firstChild);
    if (!reduce) {
      var chs = hn.querySelectorAll(".ch");
      Array.prototype.forEach.call(chs, function (c, i) {
        setTimeout(function () { c.classList.add("hop"); setTimeout(function () { c.classList.remove("hop"); }, 520); }, 400 + i * 120);
      });
    }
  }

  /* ---------- 클릭 불꽃 ---------- */
  var clicks = 0;
  document.addEventListener("pointerdown", function (e) {
    if (++clicks >= 100) window.__ach("clicker");
    if (reduce || e.pointerType === "touch" && e.isPrimary === false) return;
    for (var i = 0; i < 7; i++) {
      var s = document.createElement("i");
      s.className = "spark";
      s.style.left = e.clientX - 3 + "px"; s.style.top = e.clientY - 3 + "px";
      s.style.background = COLORS[(Math.random() * COLORS.length) | 0];
      document.body.appendChild(s);
      var a = Math.random() * Math.PI * 2, d = 24 + Math.random() * 30;
      s.animate([
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: "translate(" + Math.cos(a) * d + "px," + (Math.sin(a) * d + 10) + "px) scale(.4)", opacity: 0 }
      ], { duration: 420 + Math.random() * 200, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = (function (el) { return function () { el.remove(); }; })(s);
    }
  }, { passive: true });

  /* ---------- 카드 기울이기 (data-tilt="최대각도") ---------- */
  if (!reduce && matchMedia("(hover: hover)").matches) {
    var tiltEl = null;
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest("[data-tilt]");
      if (tiltEl && tiltEl !== el) { tiltEl.style.transform = ""; tiltEl = null; }
      if (!el) return;
      tiltEl = el;
      var r = el.getBoundingClientRect(), m = parseFloat(el.getAttribute("data-tilt")) || 4;
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = "perspective(900px) rotateX(" + (-y * m) + "deg) rotateY(" + (x * m) + "deg)";
    }, { passive: true });
    document.addEventListener("pointerleave", function () { if (tiltEl) { tiltEl.style.transform = ""; tiltEl = null; } });
  }

  /* =========================================================
     이스터에그: 햄버거 비
     ========================================================= */
  var SEQ = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
    var k = /^Arrow/.test(e.key) ? e.key : e.code;          // 한글 자판이어도 B/A 인식
    if (k === SEQ[pos]) { pos++; if (pos === SEQ.length) { pos = 0; burgerRain(); } }
    else pos = k === SEQ[0] ? 1 : 0;
  });

  // 모바일: 스와이프 ↑↑↓↓←→←→ + 탭 두 번
  var TSEQ = ["U", "U", "D", "D", "L", "R", "L", "R", "T", "T"], tpos = 0, ts = null;
  document.addEventListener("touchstart", function (e) { var t = e.touches[0]; ts = { x: t.clientX, y: t.clientY, t: Date.now() }; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (!ts) return;
    var t = e.changedTouches[0], dx = t.clientX - ts.x, dy = t.clientY - ts.y, ad = Math.abs(dx) + Math.abs(dy), g;
    if (ad < 12 && Date.now() - ts.t < 300) g = "T";
    else if (ad > 40) g = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "R" : "L") : (dy > 0 ? "D" : "U");
    ts = null; if (!g) return;
    if (g === TSEQ[tpos]) { tpos++; if (tpos === TSEQ.length) { tpos = 0; burgerRain(); } }
    else tpos = g === TSEQ[0] ? 1 : 0;
  }, { passive: true });

  var cv, ctx, img, imgOk = false, bodies = [], running = false, last = 0, still = 0, dpr = 1;
  function setup() {
    cv = document.createElement("canvas"); cv.id = "burgerCanvas"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    ctx = cv.getContext("2d");
    resize(); addEventListener("resize", resize);
    img = new Image();
    img.onload = function () { imgOk = true; };
    var src = P.burger || "Image/burger.png";
    img.src = /^(https?:|data:)/.test(src) ? src : BASE + src;
    // 떨어진 햄버거 클릭하면 다시 튕기기
    document.addEventListener("pointerdown", function (e) {
      for (var i = bodies.length - 1; i >= 0; i--) {
        var b = bodies[i], dx = e.clientX - b.x, dy = e.clientY - b.y;
        if (dx * dx + dy * dy < b.r * b.r) {
          b.vy = -700 - Math.random() * 300; b.vx = (Math.random() - 0.5) * 500; b.vr = (Math.random() - 0.5) * 12;
          window.__ach("burgerclick"); wake(); break;
        }
      }
    });
  }
  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    wake();
  }
  function burgerRain() {
    if (!cv) setup();
    window.__ach("konami");
    var n = Math.max(1, Math.min(120, +P.burgerCount || 36));
    if (bodies.length > 160) bodies.splice(0, n);         // 너무 쌓이면 오래된 것부터 정리
    var base = innerWidth < 600 ? 22 : 30;
    for (var i = 0; i < n; i++) {
      (function (k) {
        setTimeout(function () {
          var r = base + Math.random() * base * 0.5;
          bodies.push({ x: r + Math.random() * (innerWidth - 2 * r), y: -r - Math.random() * 200, vx: (Math.random() - 0.5) * 120, vy: 80 + Math.random() * 200, r: r, a: Math.random() * 6.28, vr: (Math.random() - 0.5) * 4 });
          wake();
        }, k * 55);
      })(i);
    }
  }
  function wake() { still = 0; if (!running && cv) { running = true; last = performance.now(); requestAnimationFrame(loop); } }
  function loop(now) {
    var dt = Math.min(0.033, (now - last) / 1000); last = now;
    step(dt / 2); step(dt / 2);
    draw();
    var moving = bodies.some(function (b) { return Math.abs(b.vy) > 12 || Math.abs(b.vx) > 12 || b.y < -b.r; });
    still = moving ? 0 : still + dt;
    if (still > 0.8) { running = false; return; }          // 다 쌓이면 멈춤 (CPU 절약)
    requestAnimationFrame(loop);
  }
  function step(dt) {
    var W = innerWidth, H = innerHeight, G = 1800;
    for (var i = 0; i < bodies.length; i++) {
      var b = bodies[i];
      b.vy += G * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.vr * dt;
      if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -0.32; b.vx *= 0.86; b.vr = b.vx / b.r; if (Math.abs(b.vy) < 30) b.vy = 0; }
      if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.5; }
      if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.5; }
    }
    for (var p = 0; p < 2; p++) {
      for (i = 0; i < bodies.length; i++) for (var j = i + 1; j < bodies.length; j++) {
        var A = bodies[i], B = bodies[j], dx = B.x - A.x, dy = B.y - A.y, rr = A.r + B.r, d2 = dx * dx + dy * dy;
        if (d2 >= rr * rr || d2 === 0) continue;
        var d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = (rr - d) / 2;
        A.x -= nx * ov; A.y -= ny * ov; B.x += nx * ov; B.y += ny * ov;
        var rv = (B.vx - A.vx) * nx + (B.vy - A.vy) * ny;
        if (rv < 0) {
          var jn = -(1.25) * rv / 2;
          A.vx -= jn * nx; A.vy -= jn * ny; B.vx += jn * nx; B.vy += jn * ny;
          A.vx *= 0.96; B.vx *= 0.96;
        }
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < bodies.length; i++) {
      var b = bodies[i];
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a);
      if (imgOk) {
        var s = b.r * 2.2, ar = img.naturalWidth / img.naturalHeight || 1;
        var w = ar >= 1 ? s : s * ar, h = ar >= 1 ? s / ar : s;
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      } else drawBurger(b.r);
      ctx.restore();
    }
  }
  /* 이미지가 없을 때 그리는 기본 햄버거 */
  function drawBurger(r) {
    var w = r * 1.9;
    function rr(x, y, w2, h, rad, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w2, h, rad) : ctx.rect(x, y, w2, h); ctx.fill(); }
    ctx.fillStyle = "#e9973d"; ctx.beginPath(); ctx.ellipse(0, -r * 0.22, w / 2, r * 0.62, 0, Math.PI, 0); ctx.fill();   // 윗빵
    ctx.fillStyle = "#fff3c9";
    for (var i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(i * r * 0.32, -r * 0.55 + Math.abs(i) * r * 0.08, r * 0.07, r * 0.04, 0.4, 0, 6.28); ctx.fill(); }
    rr(-w / 2 - 2, -r * 0.22, w + 4, r * 0.16, 4, "#5fbf3a");              // 양상추
    rr(-w / 2 + 2, -r * 0.08, w - 4, r * 0.12, 3, "#ffcf33");              // 치즈
    rr(-w / 2, r * 0.02, w, r * 0.32, r * 0.14, "#6b3a1f");                // 패티
    rr(-w / 2, r * 0.32, w, r * 0.32, r * 0.16, "#e0893a");                // 아랫빵
  }

  window.__burger = burgerRain;   // 콘솔에서 테스트: __burger()
})();
