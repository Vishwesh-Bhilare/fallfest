(function scrollAnimations() {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.section-head, .track-row, .speaker-card, .timeline-item, .stat-cell').forEach((el) => observer.observe(el));
})();

(function staggerAnimations() {
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.classList.contains('speaker-grid')) {
        const cards = entry.target.querySelectorAll('.speaker-card');
        cards.forEach((card, index) => {
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = `fadeInUp 0.8s ease-out forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
          }, 10);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.speaker-grid').forEach((el) => observer.observe(el));
})();

(function heroTextAnimation() {
  const heroCopy = document.querySelector('.hero-copy');
  if (!heroCopy) return;
  heroCopy.style.opacity = '0';
  setTimeout(() => { heroCopy.style.animation = 'fadeInUp 0.7s ease-out forwards'; }, 100);
})();

(function navToggle() {
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

(function dayTabs() {
  const tabs = document.querySelectorAll('.day-tab');
  if (!tabs.length) return;
  const panels = document.querySelectorAll('[data-day-panel]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      const target = tab.getAttribute('data-day');
      panels.forEach((p) => { p.style.display = p.getAttribute('data-day-panel') === target ? '' : 'none'; });
    });
  });
})();

(function blochSphere() {
  const canvas = document.getElementById('bloch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const INK = '#31135E';
  const LINE = '#D9C9EE';
  const LINE_SOFT = '#EAE0F5';
  const ACCENT = '#A56EFF';
  const DOT = '#31135E';

  let w, h, dpr;
  let mouseNormX = 0, mouseNormY = 0, isHovering = false;
  let animationTime = 0;
  const ANIMATION_DURATION = 0.6;
  let isAnimating = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  canvas.addEventListener('mouseenter', () => { isHovering = true; });
  canvas.addEventListener('mouseleave', () => { isHovering = false; });
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    mouseNormX = (x / rect.width) * 2 - 1;
    mouseNormY = (y / rect.height) * 2 - 1;
  });

  function project(x, y, z, cx, cy, r, rotY, tiltX) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    let x1 = x * cosY + z * sinY;
    let z1 = -x * sinY + z * cosY;
    let y1 = y;
    const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;
    const scale = 1 / (1 + z2 * 0.35);
    return { sx: cx + x1 * r * scale, sy: cy + y2 * r * scale, depth: z2, scale };
  }

  function circlePoints(axis, r, steps, cx, cy, radius, rotY, tiltX) {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      let x, y, z;
      if (axis === 'xy') { x = Math.cos(t); y = Math.sin(t); z = 0; }
      else if (axis === 'xz') { x = Math.cos(t); y = 0; z = Math.sin(t); }
      else { x = 0; y = Math.cos(t); z = Math.sin(t); }
      pts.push(project(x, y, z, cx, cy, radius, rotY, tiltX));
    }
    return pts;
  }

  function strokePath(pts, color, width, dashed) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (dashed) ctx.setLineDash([3, 4]); else ctx.setLineDash([]);
    pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy); });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  let angle = 0;
  const tiltX = -0.32;
  const BASE_THETA = Math.PI / 2.6;
  let vecTheta = BASE_THETA, vecPhi = 0;
  const EASE = 0.08;

  function draw(deltaTime) {
    ctx.clearRect(0, 0, w, h);
    if (isAnimating) {
      animationTime += deltaTime / 1000;
      if (animationTime >= ANIMATION_DURATION) { isAnimating = false; animationTime = ANIMATION_DURATION; }
    }
    const progress = Math.min(animationTime / ANIMATION_DURATION, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const cx = w / 2 + (w * 0.15) * easeProgress;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.34;
    const rotY = angle;

    ctx.beginPath();
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1.25;
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const equator = circlePoints('xz', r, 64, cx, cy, r, rotY, tiltX);
    strokePath(equator, LINE, 1);
    const meridianA = circlePoints('yz', r, 64, cx, cy, r, rotY, tiltX);
    strokePath(meridianA, LINE_SOFT, 1);
    const meridianB = circlePoints('xy', r, 64, cx, cy, r, rotY + Math.PI / 2, tiltX);
    strokePath(meridianB, LINE_SOFT, 1);

    const top = project(0, 1, 0, cx, cy, r, rotY, tiltX);
    const bottom = project(0, -1, 0, cx, cy, r, rotY, tiltX);
    ctx.beginPath();
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.moveTo(top.sx, top.sy);
    ctx.lineTo(bottom.sx, bottom.sy);
    ctx.stroke();

    const autoPhi = angle * 1.6;
    let targetTheta = BASE_THETA, targetPhi = autoPhi;
    if (isHovering) {
      targetTheta = BASE_THETA - mouseNormY * 0.9;
      targetTheta = Math.max(0.2, Math.min(Math.PI - 0.2, targetTheta));
      targetPhi = autoPhi + mouseNormX * 1.3;
    }
    vecTheta += (targetTheta - vecTheta) * EASE;
    vecPhi += (targetPhi - vecPhi) * EASE;

    const vx = Math.sin(vecTheta) * Math.cos(vecPhi);
    const vy = Math.cos(vecTheta);
    const vz = Math.sin(vecTheta) * Math.sin(vecPhi);
    const tip = project(vx, vy, vz, cx, cy, r, rotY, tiltX);
    const origin = project(0, 0, 0, cx, cy, r, rotY, tiltX);

    ctx.beginPath();
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.moveTo(origin.sx, origin.sy);
    ctx.lineTo(tip.sx, tip.sy);
    ctx.stroke();

    const ang = Math.atan2(tip.sy - origin.sy, tip.sx - origin.sx);
    ctx.beginPath();
    ctx.fillStyle = ACCENT;
    ctx.moveTo(tip.sx, tip.sy);
    ctx.lineTo(tip.sx - 8 * Math.cos(ang - 0.4), tip.sy - 8 * Math.sin(ang - 0.4));
    ctx.lineTo(tip.sx - 8 * Math.cos(ang + 0.4), tip.sy - 8 * Math.sin(ang + 0.4));
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = DOT;
    ctx.arc(tip.sx, tip.sy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '13px "IBM Plex Mono", monospace';
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText('|0⟩', top.sx, top.sy - 12);
    ctx.fillText('|1⟩', bottom.sx, bottom.sy + 20);

    if (!prefersReduced) angle += 0.006;
  }

  let lastTime = performance.now();
  function loop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    draw(deltaTime);
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  if (prefersReduced) { draw(0); } else { requestAnimationFrame(loop); }
})();
