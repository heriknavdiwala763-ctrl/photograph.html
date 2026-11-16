/**
 * Module: Ultra-Cinematic Studio Optics & Camera Aperture VFX Engine
 * Creates a breathtaking visual photoshoot environment:
 * 1. Dynamic Rotating Camera Aperture Blades (matching the Aakar logo)
 * 2. Floating Golden Photography Dust & Bokeh Orbs
 * 3. Interactive Mouse Parallax Lens Flare
 * 4. Pulsing Studio Rim Lights & Camera Focus Reticle
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

  // Mouse interaction coordinates
  let mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // 1. Golden Bokeh Orbs
  const bokehs = Array.from({ length: 28 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 45 + 15,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 0.5 - 0.2,
    baseAlpha: Math.random() * 0.18 + 0.05,
    hue: Math.random() > 0.3 ? 'rgba(229, 179, 100,' : 'rgba(255, 215, 130,'
  }));

  // 2. Fine Studio Dust Sparkles
  const sparkles = Array.from({ length: 65 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.5 + 0.8,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -Math.random() * 0.8 - 0.2,
    alpha: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 0.04 + 0.01
  }));

  // 3. Camera Lens Aperture Ring State
  let apertureAngle = 0;
  let focusPulse = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse parallax interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // --- A. Dynamic Studio Sweeping Spotlight ---
    focusPulse += 0.015;
    const spotX = mouse.x;
    const spotY = mouse.y;
    const spotRadius = Math.max(width, height) * 0.55;

    const spotGrad = ctx.createRadialGradient(spotX, spotY, 20, spotX, spotY, spotRadius);
    spotGrad.addColorStop(0, 'rgba(229, 179, 100, 0.14)');
    spotGrad.addColorStop(0.35, 'rgba(229, 179, 100, 0.04)');
    spotGrad.addColorStop(0.7, 'rgba(10, 11, 14, 0.02)');
    spotGrad.addColorStop(1, 'rgba(10, 11, 14, 0)');
    ctx.fillStyle = spotGrad;
    ctx.fillRect(0, 0, width, height);

    // --- B. Majestic Rotating Camera Aperture Rings (Center-Right Backdrop) ---
    apertureAngle += 0.0025;
    const apX = width * 0.65;
    const apY = height * 0.42;

    ctx.save();
    ctx.translate(apX, apY);
    ctx.rotate(apertureAngle);

    // Outer Thin Gold Cinema Ring
    ctx.beginPath();
    ctx.arc(0, 0, 240, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(229, 179, 100, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([12, 18]);
    ctx.stroke();

    // Secondary Focus Ring with degree markers
    ctx.beginPath();
    ctx.arc(0, 0, 170, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(229, 179, 100, 0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 10]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 6 Aperture Blades (Similar to Aakar Logo concept)
    const blades = 6;
    for (let i = 0; i < blades; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / blades);
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(130, -35);
      ctx.lineTo(105, 55);
      ctx.closePath();
      ctx.fillStyle = 'rgba(229, 179, 100, 0.035)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(229, 179, 100, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // Central Lens Glow
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 90);
    coreGrad.addColorStop(0, 'rgba(229, 179, 100, 0.12)');
    coreGrad.addColorStop(1, 'rgba(229, 179, 100, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // --- C. Camera Focus Brackets [] in Center ---
    const bracketSize = 25;
    const boxW = 120 + Math.sin(focusPulse) * 8;
    const boxH = 90 + Math.sin(focusPulse) * 6;
    const focusCenterX = width * 0.5 + (mouse.x - width * 0.5) * 0.08;
    const focusCenterY = height * 0.45 + (mouse.y - height * 0.45) * 0.08;

    ctx.save();
    ctx.translate(focusCenterX, focusCenterY);
    ctx.strokeStyle = 'rgba(229, 179, 100, 0.22)';
    ctx.lineWidth = 1.5;

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
    ctx.strokeStyle = 'rgba(229, 179, 100, 0.35)';
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
      g.addColorStop(0, `${b.hue} ${b.baseAlpha * 1.5})`);
      g.addColorStop(0.7, `${b.hue} ${b.baseAlpha * 0.6})`);
      g.addColorStop(1, `${b.hue} 0)`);

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // --- E. Golden Studio Sparkles & Dust Particles ---
    sparkles.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.alpha += Math.sin(focusPulse * 4 + s.x) * 0.02;

      if (s.y < -10) s.y = height + 10;
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;

      const currentAlpha = Math.max(0.15, Math.min(0.9, s.alpha));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 205, 140, ${currentAlpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(229, 179, 100, 0.7)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}
