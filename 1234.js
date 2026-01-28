

// ===== Populate Hairstyles =====
const container = document.getElementById("hairstyles");

function displayHairstyles(list) {
  container.innerHTML = "";
  list.forEach(h => {
    const div = document.createElement("div");
    div.className = "hairstyle";
    div.innerHTML = `
      <img src="${h.img}" alt="${h.name}">
      <div style="text-align:center; margin-top:6px;">${h.name}</div>
    `;
    container.appendChild(div);
  });
}

// initial display
displayHairstyles(hairstyles);

// ===== Search Functionality =====
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = hairstyles.filter(h => h.name.toLowerCase().includes(query));
  displayHairstyles(filtered);
});
document.querySelectorAll('.mobile-btn[data-cat]').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    showCategory(cat);
  });
});
const swipeIndicator = document.getElementById("swipe-indicator");
const bars = swipeIndicator.querySelectorAll(".bar");

let currentIndex = 0;
function updateSwipeIndicator(index) {
  bars.forEach((b, i) => {
    b.classList.toggle("active", i === index);
  });
}

// Example: highlight first bar initially
updateSwipeIndicator(0);

// Remove indicator after first swipe
function removeSwipeIndicator() {
  swipeIndicator.style.opacity = "0";
  setTimeout(() => swipeIndicator.style.display = "none", 500);
}

// Call this inside your swipe handler
function handleSwipe(dx, dy) {
  if (!swipeIndicator.classList.contains("hidden")) {
    removeSwipeIndicator();
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 60) swipeRight();
    if (dx < -60) swipeLeft();
  } else {
    if (dy < -60) hideInfo();
    if (dy > 60) showInfo();
  }
}

// Example: update active bubble when swiping
function swipeLeft() {
  currentIndex = (currentIndex + 1) % bars.length;
  loadCategory(categories[currentIndex]);
  updateSwipeIndicator(currentIndex);
}

function swipeRight() {
  currentIndex = (currentIndex - 1 + bars.length) % bars.length;
  loadCategory(categories[currentIndex]);
  updateSwipeIndicator(currentIndex);
}
