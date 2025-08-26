const heading = document.querySelector('h1');
let inputBuffer = '';
let rainbowInterval = null;
let bounceInterval = null;
let bounceDirection = 1;
let bouncePosition = 0;
let audio = new Audio('https://raw.githubusercontent.com/beanboi-svg/beanboi/main/assets/awesome.mp3');

function startRainbowEffect() {
  if (rainbowInterval) return;
  let hue = 0;
  rainbowInterval = setInterval(() => {
    hue = (hue + 10) % 360;
    heading.style.color = `hsl(${hue}, 100%, 50%)`;
  }, 12);
  startBounceEffect();
  audio.play();
}

// stop effects
function stopRainbowEffect() {
  if (rainbowInterval) {
    clearInterval(rainbowInterval);
    rainbowInterval = null;
    heading.style.color = '';
  }
  stopBounceEffect();
}

function startBounceEffect() {
  if (bounceInterval) return;
  bounceInterval = setInterval(() => {
    bouncePosition += bounceDirection * 2;
    if (bouncePosition > 20 || bouncePosition < 0) {
      bounceDirection *= -1;
    }
    heading.style.transform = `translateY(${bouncePosition}px)`;
  }, 20);
}

function stopBounceEffect() {
  if (bounceInterval) {
    clearInterval(bounceInterval);
    bounceInterval = null;
    heading.style.transform = '';
  }
}

// When audio ends, stop effects
audio.addEventListener('ended', () => {
  stopRainbowEffect();
});

window.addEventListener('keydown', (e) => {
  const char = e.key.toLowerCase();
  if (char.length === 1 && /[a-z]/.test(char)) {
    inputBuffer += char;
    if (inputBuffer.length > 7) {
      inputBuffer = inputBuffer.slice(-7);
    }
    if (inputBuffer === 'awesome') {
      if (!rainbowInterval) {
        startRainbowEffect();
      }
      inputBuffer = '';
    }
  }
});