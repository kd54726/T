// ===== STARS BACKGROUND =====
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 1 || star.alpha <= 0.1) star.direction *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 220, ${star.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// ===== FLOATING HEARTS =====
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['❤', '💕', '💖', '♥', '💗'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 20000);
}
setInterval(createFloatingHeart, 3000);
for (let i = 0; i < 5; i++) setTimeout(createFloatingHeart, i * 600);

// ===== LOVE COUNTER =====
// Set your start date here (YYYY, MM-1, DD)
const startDate = new Date(2026, 2, 8); // January 1, 2024

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
updateCounter();
setInterval(updateCounter, 1000);

// ===== ENVELOPE =====
let envelopeOpen = false;
let envelopeAnimating = false;
function openEnvelope() {
    if (envelopeAnimating) return;
    envelopeAnimating = true;

    const flap = document.getElementById('flap');
    const paper = document.getElementById('paper');
    const hint = document.getElementById('letterHint');

    if (!envelopeOpen) {
        // Open: flap opens first, then letter slides out
        flap.classList.add('open');
        setTimeout(() => {
            paper.classList.add('revealed');
            envelopeAnimating = false;
        }, 600);
        hint.textContent = '✉️ Click to close';
        envelopeOpen = true;
    } else {
        // Close: letter slides back in first, then flap closes
        paper.classList.remove('revealed');
        setTimeout(() => {
            flap.classList.remove('open');
            envelopeAnimating = false;
        }, 800);
        hint.textContent = '✉️ Click the envelope to open';
        envelopeOpen = false;
    }
}

// ===== PROMISES CAROUSEL =====
const promises = document.querySelectorAll('.promise-card');
const dotsContainer = document.getElementById('promiseDots');
let currentPromise = 0;

promises.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'promise-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToPromise(i);
    dotsContainer.appendChild(dot);
});

function goToPromise(index) {
    promises[currentPromise].classList.remove('active');
    document.querySelectorAll('.promise-dot')[currentPromise].classList.remove('active');
    currentPromise = index;
    promises[currentPromise].classList.add('active');
    document.querySelectorAll('.promise-dot')[currentPromise].classList.add('active');
}

setInterval(() => {
    goToPromise((currentPromise + 1) % promises.length);
}, 4000);

// ===== HEART CLICK =====
let heartCount = 0;
function clickHeart(e) {
    heartCount++;
    document.getElementById('heartCount').textContent = heartCount;

    // Create burst of mini hearts
    const container = document.getElementById('miniHearts');
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('span');
        heart.className = 'mini-heart';
        heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '✨'][i];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.setProperty('--tx', (Math.random() * 120 - 60) + 'px');
        heart.style.setProperty('--rot', (Math.random() * 360) + 'deg');
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    // Special messages at milestones
    const milestones = {
        10: "You're amazing! 🥰",
        25: "So much love! 💕",
        50: "You're incredible! ✨",
        100: "100 hearts! You're the best! 🎉💖",
        200: "I can feel the love! 🌟",
        500: "500! That's dedication! 👑💗"
    };

    if (milestones[heartCount]) {
        showMilestone(milestones[heartCount]);
    }
}

function showMilestone(text) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 71, 120, 0.95);
                color: white;
                padding: 20px 40px;
                border-radius: 50px;
                font-size: 20px;
                font-family: 'Dancing Script', cursive;
                z-index: 10000;
                animation: fadeInUp 0.5s ease, fadeOut 0.5s ease 2s forwards;
                box-shadow: 0 10px 40px rgba(255, 71, 120, 0.4);
            `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2500);
}

// Add fadeOut keyframes
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeOut {
                to { opacity: 0; transform: translate(-50%, -60%); }
            }
        `;
document.head.appendChild(style);

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reason-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ===== SPARKLE TRAIL ON MOUSE =====
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 80) return;
    lastSparkle = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.setProperty('--sx', (Math.random() * 40 - 20) + 'px');
    sparkle.style.setProperty('--sy', (Math.random() * 40 - 20) + 'px');
    sparkle.style.background = ['#ff6b8a', '#ff4778', '#ff8ba7', '#ffd1dc', '#fff'][Math.floor(Math.random() * 5)];
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
});
