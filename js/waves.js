const canvas = document.getElementById('waves');
const ctx = canvas.getContext('2d');
let width, height, t = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function wave(y, amp, freq, speed, color) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  for (let x = 0; x < width; x++) {
    ctx.lineTo(x, y + Math.sin(x * freq + t * speed) * amp);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function animate() {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  ctx.clearRect(0, 0, width, height);
  const color1 = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const color2 = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  for (let i = 0; i < 2; i++) {
    const amp = 20 + i * 10;
    const freq = 0.01 + i * 0.003;
    const speed = 0.002 + i * 0.001;
    wave(height * 0.5 + i * 10, amp, freq, speed, i === 0 ? color1 : color2);
  }
  t += 0.02;
  requestAnimationFrame(animate);
}
animate();
