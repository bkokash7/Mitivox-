/* Mitivox — twinkling star field */
(function () {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], raf;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
  }

  function seed() {
    stars = [];
    const n = Math.min(Math.floor(canvas.width * canvas.height / 3600), 300);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.25 + 0.15,
        a: Math.random() * 0.65 + 0.15,
        p: Math.random() * Math.PI * 2,
        s: 0.004 + Math.random() * 0.011
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.p += s.s;
      const o = s.a * (0.5 + 0.5 * Math.sin(s.p));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.2832);
      ctx.fillStyle = `rgba(210,195,255,${o.toFixed(3)})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize(); seed(); draw();
  });

  resize(); seed(); draw();
})();
