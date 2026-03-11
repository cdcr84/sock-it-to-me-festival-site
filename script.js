const canvas = document.getElementById('searchlights');
const ctx = canvas.getContext('2d');

function resize() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

const beams = [
  { xBase: 180, angle: -0.32, speed: 0.0007, width: 160, alpha: 0.08 },
  { xBase: 480, angle: 0.24, speed: 0.00055, width: 190, alpha: 0.07 },
  { xBase: 980, angle: -0.18, speed: 0.00062, width: 170, alpha: 0.07 },
  { xBase: 1180, angle: 0.28, speed: 0.0008, width: 150, alpha: 0.06 }
];

function drawBeam(baseX, angle, width, alpha, height) {
  ctx.save();
  ctx.translate(baseX, height + 80);
  ctx.rotate(angle);
  const grad = ctx.createLinearGradient(0, 0, 0, -height * 1.2);
  grad.addColorStop(0, `rgba(255, 225, 150, ${alpha})`);
  grad.addColorStop(0.2, `rgba(255, 225, 150, ${alpha * 0.8})`);
  grad.addColorStop(1, 'rgba(255, 225, 150, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(28, 0);
  ctx.lineTo(width, -height * 1.15);
  ctx.lineTo(-width, -height * 1.15);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function animate(time) {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);
  beams.forEach((beam, i) => {
    const angle = beam.angle + Math.sin(time * beam.speed + i) * 0.18;
    drawBeam(beam.xBase, angle, beam.width, beam.alpha, h * 0.78);
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(animate);
