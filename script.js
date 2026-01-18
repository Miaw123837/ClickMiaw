const imgElement = document.getElementById("click-img");
const scoreElement = document.getElementById("score");
const achievementElement = document.getElementById("achievement");
const progressBar = document.getElementById("progress-bar");
const achievementOverlay = document.getElementById("achievement-overlay");
const achievementList = document.getElementById("achievement-list");
const closeAchievementBtn = document.getElementById("close-achievement");
const achievementBox = document.querySelector(".achievement-box");

// Ambil data dari localStorage (jika ada), jika tidak mulai dari 0
let score = BigInt(localStorage.getItem("clickerScore") || 0);
let achievements = parseInt(localStorage.getItem("clickerAchievements") || 0);

// Update tampilan awal saat website dibuka
scoreElement.innerText = score.toString();
achievementElement.innerText = `Achievements: ${achievements}`;
updateProgressBar();

// Fitur Klik Achievement untuk melihat statistik Easter Egg
achievementElement.addEventListener("click", () => {
  const foundEggs = JSON.parse(localStorage.getItem("foundEasterEggs") || "[]");

  // Bersihkan list lama
  achievementList.innerHTML = "";

  if (foundEggs.length === 0) {
    achievementList.innerHTML =
      "<p style='font-size: 0.7rem;'>Belum ada Easter Egg ditemukan.</p>";
  } else {
    foundEggs.forEach((eggKey) => {
      const [type, scoreVal] = eggKey.split("-");
      let title = `${type} Egg`;
      let bgImage = "EASTER.png";

      // Cek gambar khusus jika ada
      if (type === "Sound" && typeof soundMilestonesData !== "undefined") {
        try {
          const data =
            soundMilestonesData[BigInt(scoreVal)] ||
            soundMilestonesData[scoreVal];
          if (data && data.image) bgImage = data.image;
        } catch (e) {}
      }

      // Cek gambar khusus Mas Agus (Video-1)
      if (eggKey === "Video-1" && typeof agusImage !== "undefined") {
        bgImage = agusImage;
        title = "Mas Agus Indihome";
      }

      // Buat elemen item
      const itemDiv = document.createElement("div");
      itemDiv.className = "achievement-item";

      itemDiv.innerHTML = `
        <div class="egg-item" style="background-image: url('${bgImage}'); width: 60px; height: 60px; position: static; transform: none;"></div>
        <div class="achievement-name">${title}<br><span style="color: #aaa;">Score: ${scoreVal}</span></div>
      `;

      achievementList.appendChild(itemDiv);
    });
  }

  // --- Logika Animasi iOS ---
  // 1. Hitung posisi tengah dari teks Achievement
  const rect = achievementElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 2. Hitung offset dari tengah layar
  const offsetX = centerX - window.innerWidth / 2;
  const offsetY = centerY - window.innerHeight / 2;

  // 3. Set titik asal animasi (transform-origin) ke arah teks Achievement
  achievementBox.style.transformOrigin = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;

  achievementOverlay.style.display = "flex";
  // Force reflow agar transisi CSS berjalan
  void achievementOverlay.offsetWidth;
  achievementOverlay.classList.add("active");
});

// Tutup Achievement Overlay
closeAchievementBtn.addEventListener("click", () => {
  achievementOverlay.classList.remove("active");
  // Tunggu animasi selesai (0.5s) baru sembunyikan elemen
  setTimeout(() => {
    achievementOverlay.style.display = "none";
  }, 500);
});

// --- MOD FUNCTION (Global Access) ---
window.updateGameScore = function (newScore) {
  score = BigInt(newScore);
  scoreElement.innerText = score.toString();
  updateProgressBar();
  localStorage.setItem("clickerScore", score.toString());
  alert("Cheat Activated: Score updated!");
};

window.addGameAchievement = function (amount) {
  achievements += parseInt(amount);
  achievementElement.innerText = `Achievements: ${achievements}`;
  localStorage.setItem("clickerAchievements", achievements);
  alert("Cheat Activated: Achievement added!");
};

window.removeGameAchievement = function (amount) {
  achievements -= parseInt(amount);
  if (achievements < 0) achievements = 0;
  achievementElement.innerText = `Achievements: ${achievements}`;
  localStorage.setItem("clickerAchievements", achievements);
  alert("Cheat Activated: Achievement removed!");
};

window.setGameAchievement = function (amount) {
  achievements = parseInt(amount) || 0;
  achievementElement.innerText = `Achievements: ${achievements}`;
  localStorage.setItem("clickerAchievements", achievements);
  alert("Cheat Activated: Achievement updated!");
};

// Fungsi update progress bar
function updateProgressBar() {
  // Hitung persentase (score * 10000 / LIMIT) untuk presisi 2 desimal
  const percentage = Number((score * 10000n) / LIMIT) / 100;
  progressBar.style.width = `${percentage}%`;
}

// Preload gambar kedua agar tidak berkedip saat pertama kali klik
new Image().src = img2;

// Fungsi saat ditekan
function startClick(e) {
  // Mencegah perilaku default pada touch (seperti scroll/zoom)
  if (e.type === "touchstart") e.preventDefault();

  // Mainkan suara (reset waktu agar bisa diputar cepat berulang kali)
  playClickSound();

  // Fitur Getar (Haptic Feedback)
  if (navigator.vibrate) {
    navigator.vibrate(50); // Getar selama 50ms
  }

  imgElement.src = img2;
  score++;

  // Cek Easter Egg (Fungsi dari easter-egg.js)
  checkEasterEggs(score, achievements);

  // Cek apakah skor melebihi batas 19 Desiliun
  if (score > LIMIT) {
    score = 0n;
    achievements++;
    // Trigger Endgame (Fungsi dari easter-egg.js)
    triggerEndgame();
  }

  scoreElement.innerText = score.toString();
  achievementElement.innerText = `Achievements: ${achievements}`;
  updateProgressBar();

  // Simpan ke browser
  localStorage.setItem("clickerScore", score.toString());
  localStorage.setItem("clickerAchievements", achievements);
}

// Fungsi saat dilepas
function endClick() {
  imgElement.src = img1;
}

// Event Listeners (Mouse dan Touch)
imgElement.addEventListener("mousedown", startClick);
imgElement.addEventListener("mouseup", endClick);
imgElement.addEventListener("mouseleave", endClick); // Jika mouse keluar area gambar

imgElement.addEventListener("touchstart", startClick);
imgElement.addEventListener("touchend", endClick);

// --- Anti-Inspect / Proteksi Sederhana ---

// 1. Mencegah Klik Kanan
document.addEventListener("contextmenu", (e) => e.preventDefault());

// 2. Mencegah Shortcut Keyboard (F12, Ctrl+Shift+I, Ctrl+U, dll)
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    // F12
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    // Ctrl+Shift+I
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    // Ctrl+Shift+J
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    // Ctrl+U
    return false;
  }
};

// 3. Debugger Trap (Membuat browser 'freeze' jika DevTools terbuka)
setInterval(() => {
  debugger;
}, 100);

// --- Efek Suara Boing pada Teks Berjalan ---
const marqueeContent = document.querySelector(".marquee-content");

marqueeContent.addEventListener("animationiteration", () => {
  playBoingSound();
});
