/**
 * Module: Ultra-Cinematic Studio Optics & Dynamic Lens Flare Engine
 * - Rich royal gold palette (f3c26b)
 * - Multi-layered smooth aperture blades
 * - Floating golden bokeh orbs & light dust
 * - Viewfinder focus reticle with dynamic parallax
 */

export function initBackgroundVideo() {
  const canvas = document.getElementById('cinematicCanvas');
  const video = document.getElementById('bgVideo');

  if (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          const wake = () => {
            video.play().catch(() => {});
            window.removeEventListener('click', wake);
            window.removeEventListener('scroll', wake);
          };
          window.addEventListener('click', wake, { once: true });
          window.addEventListener('scroll', wake, { once: true });
        });
      }
    };
    tryPlay();
  }

  if (canvas) {
    startUltraCinematicVFX(canvas);
  }
}

function startUltraCinematicVFX(canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse parallax coordinates
  let mouse = { x: width * 0.5, y: height * 0.45, targetX: width * 0.5, targetY: height * 0.45 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // 1. Royal Golden Bokeh Orbs
  const bokehs = Array.from({ length: 32 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 50 + 20,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -Math.random() * 0.5 - 0.2,
    baseAlpha: Math.random() * 0.22 + 0.08,
    color: Math.random() > 0.4 ? 'rgba(243, 194, 107,' : 'rgba(255, 225, 160,'
  }));

  // 2. Fine Golden Studio Sparkles
  const sparkles = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.8 + 1,
    vx: (Math.random() - 0.5) * 0.55,
    vy: -Math.random() * 0.7 - 0.2,
    alpha: Math.random() * 0.85 + 0.15,
    phase: Math.random() * Math.PI * 2
  }));

  let apertureAngle = 0;
  let focusPulse = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    // --- A. Dynamic Studio Sweeping Spotlight ---
    focusPulse += 0.018;
    const spotX = mouse.x;
    const spotY = mouse.y;
    const spotRadius = Math.max(width, height) * 0.6;

    const spotGrad = ctx.createRadialGradient(spotX, spotY, 20, spotX, spotY, spotRadius);
    spotGrad.addColorStop(0, 'rgba(243, 194, 107, 0.16)');
    spotGrad.addColorStop(0.35, 'rgba(243, 194, 107, 0.05)');
    spotGrad.addColorStop(0.75, 'rgba(6, 7, 9, 0.02)');
    spotGrad.addColorStop(1, 'rgba(6, 7, 9, 0)');
    ctx.fillStyle = spotGrad;
    ctx.fillRect(0, 0, width, height);

    // --- B. Majestic Rotating Cinema Aperture Lens (Center-Right Backdrop) ---
    apertureAngle += 0.0022;
    const apX = width * 0.68;
    const apY = height * 0.45;

    ctx.save();
    ctx.translate(apX, apY);
    ctx.rotate(apertureAngle);

    // Outer Thin Gold Cinema Ring
    ctx.beginPath();
    ctx.arc(0, 0, 260, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(243, 194, 107, 0.12)';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([14, 20]);
    ctx.stroke();

    // Secondary Focus Ring with degree markers
    ctx.beginPath();
    ctx.arc(0, 0, 185, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(243, 194, 107, 0.16)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 12]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 6 Aperture Blades
    const blades = 6;
    for (let i = 0; i < blades; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / blades);
      ctx.beginPath();
      ctx.moveTo(55, 0);
      ctx.lineTo(145, -40);
      ctx.lineTo(118, 62);
      ctx.closePath();
      ctx.fillStyle = 'rgba(243, 194, 107, 0.04)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(243, 194, 107, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }

    // Central Lens Glow
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    coreGrad.addColorStop(0, 'rgba(243, 194, 107, 0.16)');
    coreGrad.addColorStop(1, 'rgba(243, 194, 107, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // --- C. Camera Focus Reticle [] (Viewfinder HUD) ---
    const bracketSize = 24;
    const boxW = 125 + Math.sin(focusPulse) * 8;
    const boxH = 95 + Math.sin(focusPulse) * 6;
    const focusCenterX = width * 0.48 + (mouse.x - width * 0.48) * 0.08;
    const focusCenterY = height * 0.48 + (mouse.y - height * 0.48) * 0.08;

    ctx.save();
    ctx.translate(focusCenterX, focusCenterY);
    ctx.strokeStyle = 'rgba(243, 194, 107, 0.28)';
    ctx.lineWidth = 1.6;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(-boxW / 2, -boxH / 2 + bracketSize);
    ctx.lineTo(-boxW / 2, -boxH / 2);
    ctx.lineTo(-boxW / 2 + bracketSize, -boxH / 2);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(boxW / 2 - bracketSize, -boxH / 2);
    ctx.lineTo(boxW / 2, -boxH / 2);
    ctx.lineTo(boxW / 2, -boxH / 2 + bracketSize);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(-boxW / 2, boxH / 2 - bracketSize);
    ctx.lineTo(-boxW / 2, boxH / 2);
    ctx.lineTo(-boxW / 2 + bracketSize, boxH / 2);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(boxW / 2 - bracketSize, boxH / 2);
    ctx.lineTo(boxW / 2, boxH / 2);
    ctx.lineTo(boxW / 2, boxH / 2 - bracketSize);
    ctx.stroke();

    // Center Crosshair
    ctx.beginPath();
    ctx.moveTo(-6, 0); ctx.lineTo(6, 0);
    ctx.moveTo(0, -6); ctx.lineTo(0, 6);
    ctx.strokeStyle = 'rgba(243, 194, 107, 0.45)';
    ctx.stroke();

    ctx.restore();

    // --- D. Floating Luxurious Bokeh Orbs ---
    bokehs.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;

      if (b.y < -b.radius * 2) b.y = height + b.radius * 2;
      if (b.x < -b.radius * 2) b.x = width + b.radius * 2;
      if (b.x > width + b.radius * 2) b.x = -b.radius * 2;

      const g = ctx.createRadialGradient(b.x, b.y, b.radius * 0.1, b.x, b.y, b.radius);
      g.addColorStop(0, `${b.color} ${b.baseAlpha * 1.6})`);
      g.addColorStop(0.65, `${b.color} ${b.baseAlpha * 0.7})`);
      g.addColorStop(1, `${b.color} 0)`);

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // --- E. Golden Studio Sparkles & Ambient Film Grain Particles ---
    sparkles.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.phase += 0.035;

      if (s.y < -10) s.y = height + 10;
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;

      const dynamicAlpha = Math.max(0.18, Math.min(0.95, s.alpha + Math.sin(s.phase) * 0.25));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 194, 107, ${dynamicAlpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(243, 194, 107, 0.8)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}
