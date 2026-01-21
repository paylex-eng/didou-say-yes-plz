const bear = document.getElementById('bear');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const msg = document.getElementById('message');
const confetti = document.getElementById('confetti');

const originalSrc = bear ? bear.getAttribute('src') : '';
const sadSrc = 'assets/sad.gif';
const happySrc = 'assets/happy.gif';

function setBear(src) {
  if (!bear) return;
  bear.setAttribute('src', src);
}

/* Confetti / hearts burst */
function burst(count = 20) {
  if (!confetti) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = ['💖', '💘', '💕', '❣️'][Math.floor(Math.random() * 4)];
    el.style.left = Math.random() * 100 + '%';
    el.style.top = 60 + Math.random() * 30 + '%';
    el.style.fontSize = (10 + Math.random() * 28) + 'px';
    el.style.animationDuration = (900 + Math.random() * 1000) + 'ms';
    confetti.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }
}

/* "Oui" behaviour */
if (yes) {
    // hover / focus -> happy
  yes.addEventListener('mouseenter', () => { setBear(happySrc); });
  yes.addEventListener('focus', () => { setBear(happySrc); });

  // leave / blur -> original
  yes.addEventListener('mouseleave', () => { setBear(originalSrc); });
  yes.addEventListener('blur', () => { setBear(originalSrc); });
  yes.addEventListener('click', () => {
    if (msg) msg.textContent = "Youpi ! J'ai hâte 💕";
    burst(28);
    yes.disabled = true;
    if (no) no.disabled = true;
    setBear(originalSrc);
  });
}

/* Evasive "non": move on click and shrink progressively; disappear below threshold */
let clickCount = 0;
let currentScale = 1;
const minScale = 0.18;      // absolute minimum scale
const shrinkFactor = 0.84;  // multiply scale by this each click
const hideThreshold = 0.42; // when scale <= threshold, button will disappear

function moveAndShrinkNo() {
  if (!no || no.disabled) return;
  const x = (Math.random() * 200 - 70) + 'px';
  const y = (Math.random() * 100 - 20) + 'px';

  // compute new scale and clamp
  currentScale = Math.max(minScale, currentScale * shrinkFactor);

  // apply translate + scale
  no.style.transition = 'transform .35s cubic-bezier(.2,.9,.3,1)';
  no.style.transform = `translate(${x}, ${y}) scale(${currentScale})`;

  // after movement, drop translation but keep scale
  if (currentScale <= hideThreshold) {
    no.style.transition = 'opacity .28s ease, transform .28s ease';
    no.style.opacity = '0';
    no.style.pointerEvents = 'none';
    no.disabled = true;
    // keep scaled down during fade, then hide from layout
    setTimeout(() => {
      no.style.display = 'none';
    }, 320);
  }
  setTimeout(() => {
    // if below hide threshold, fade out and remove
  }, 360);
}

function showSad() { setBear(sadSrc); }
function showHappy() { setBear(happySrc); }
function showOriginal() { setBear(originalSrc); }

/* Hover/focus only change the bear image (no movement) */
if (no) {
  no.addEventListener('mouseenter', () => { showSad(); });
  no.addEventListener('focus', () => { showSad(); });
  no.addEventListener('mouseleave', () => { showOriginal(); });
  no.addEventListener('blur', () => { showOriginal(); });

  /* Click triggers move + progressive shrink + brief message */
  no.addEventListener('click', (e) => {
    e.preventDefault();
    if (no.disabled) return;
    clickCount++;
    showSad();
    moveAndShrinkNo();
    if (msg) msg.textContent = clickCount >= 6 ? "Sérieusement ? 😅" : "Oh non... 😢";
    setTimeout(() => { if (msg) msg.textContent = ''; showOriginal(); }, 1400);
  });

  /* Touch: show sad on touchstart, click handles movement on tap */
  no.addEventListener('touchstart', () => { showSad(); }, { passive: true });
}

/* Keyboard support */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement === yes) yes && yes.click();
  if (e.key === 'Enter' && document.activeElement === no) no && no.click();
  if (e.key === 'Escape') { showOriginal(); if (msg) msg.textContent = ''; }
});

/* Respect reduced motion preference */
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (bear) bear.style.animation = 'none';
  if (no) no.style.transition = 'none';
}