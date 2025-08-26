const h1 = document.querySelector("h1");

h1.style.position = "absolute";
h1.style.cursor = "grab";

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

h1.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - h1.offsetLeft;
  offsetY = e.clientY - h1.offsetTop;
  h1.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  const toggleHeight = toggleBtn ? toggleBtn.offsetHeight + 30 : 0;

  newLeft = Math.max(0, Math.min(window.innerWidth - h1.offsetWidth, newLeft));
  newTop = Math.max(0, Math.min(window.innerHeight - h1.offsetHeight - toggleHeight, newTop));

  h1.style.left = newLeft + "px";
  h1.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  h1.style.cursor = "grab";
});

h1.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - h1.offsetLeft;
  offsetY = touch.clientY - h1.offsetTop;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  let newLeft = touch.clientX - offsetX;
  let newTop = touch.clientY - offsetY;

  const toggleHeight = toggleBtn ? toggleBtn.offsetHeight + 30 : 0;

  newLeft = Math.max(0, Math.min(window.innerWidth - h1.offsetWidth, newLeft));
  newTop = Math.max(0, Math.min(window.innerHeight - h1.offsetHeight - toggleHeight, newTop));

  h1.style.left = newLeft + "px";
  h1.style.top = newTop + "px";
  e.preventDefault();
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
});

const trailing = document.querySelector("#trailing");
if (trailing) {
  trailing.addEventListener("animationend", () => {
    document.title = "With Care, from Joey";
  });
}

// Function to apply theme based on isDark boolean
function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    leftCircle.setAttribute("fill", "white");
    leftCircle.removeAttribute("stroke");
    rightCircle.setAttribute("stroke", "white");
    rightCircle.setAttribute("fill", "none");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    leftCircle.setAttribute("stroke", "black");
    leftCircle.setAttribute("fill", "none");
    rightCircle.setAttribute("fill", "black");
    rightCircle.removeAttribute("stroke");
  }
}


// Manual theme toggle button
const toggleBtn = document.getElementById("theme-toggle");
const leftCircle = document.getElementById("left-circle");
const rightCircle = document.getElementById("right-circle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isCurrentlyDark = document.body.classList.contains("dark-mode");
    applyTheme(!isCurrentlyDark);
  });
}
