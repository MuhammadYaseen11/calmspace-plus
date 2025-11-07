// CalmSpace+ - Relaxation Website

const breatheText = document.getElementById("breathe-text");
const quotes = [
  "You are enough, just as you are.",
  "Breathe in calm. Breathe out tension.",
  "This too shall pass.",
  "Peace begins with a deep breath.",
  "You are doing your best, and that’s enough.",
  "Let go of what you can’t control.",
  "Your mind deserves a break too."
];

let phase = 0;
setInterval(() => {
  phase = (phase + 1) % 2;
  breatheText.textContent = ["Inhale...", "Exhale..."][phase];
}, 4000);

// Affirmation Button
document.getElementById("quote-btn").addEventListener("click", () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = randomQuote;
});

// Music Controls
const musicBtn = document.getElementById("music-btn");
const musicSelect = document.getElementById("music-select");
let audio = new Audio(musicSelect.value);
let playing = false;

musicBtn.addEventListener("click", () => {
  if (!playing) {
    audio.play();
    musicBtn.textContent = "⏸ Pause";
  } else {
    audio.pause();
    musicBtn.textContent = "▶ Play";
  }
  playing = !playing;
});

musicSelect.addEventListener("change", () => {
  audio.pause();
  audio = new Audio(musicSelect.value);
  audio.loop = true;
  if (playing) audio.play();
});

// Theme Toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Bubble Background
const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let bubbles = [];

class Bubble {
  constructor(x, y, r, c, s) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.s = s;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.c;
    ctx.fill();
  }
  update() {
    this.y -= this.s;
    if (this.y + this.r < 0) this.y = canvas.height + this.r;
    this.draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => b.update());
  requestAnimationFrame(animate);
}

for (let i = 0; i < 30; i++) {
  bubbles.push(new Bubble(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    Math.random() * 10 + 5,
    `rgba(255,255,255,${Math.random() * 0.5 + 0.2})`,
    Math.random() * 1 + 0.2
  ));
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

