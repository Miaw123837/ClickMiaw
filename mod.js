const modOverlay = document.getElementById("mod-overlay");
const btn7Million = document.getElementById("btn-7m");
const btn1Octillion = document.getElementById("btn-1oct");
const btnSetCustom = document.getElementById("btn-set-custom");
const inputCustomScore = document.getElementById("mod-input-score");
const btnAddAchievement = document.getElementById("btn-add-achievement");
const btnRemoveAchievement = document.getElementById("btn-remove-achievement");
const inputCustomAchievement = document.getElementById("mod-input-achievement");
const btnSetCustomAchievement = document.getElementById(
  "btn-set-custom-achievement"
);
const btnUnlockAllEggs = document.getElementById("btn-unlock-all-eggs");
const btnCloseMod = document.getElementById("btn-close-mod");

// Variabel untuk fitur "Mee" (Kontrol 5x Ctrl)
let ctrlPressCount = 0;
let ctrlPressTimer;

// Buka Menu Mod saat tombol 'Ctrl' ditekan 5 kali
document.addEventListener("keydown", (e) => {
  if (e.key === "Control" && !e.repeat) {
    ctrlPressCount++;

    // Reset hitungan jika tidak ditekan lagi dalam 1 detik
    clearTimeout(ctrlPressTimer);
    ctrlPressTimer = setTimeout(() => {
      ctrlPressCount = 0;
    }, 1000);

    if (ctrlPressCount === 5) {
      checkModLimitAndOpen();
      ctrlPressCount = 0;
    }
  }
  // Tutup dengan tombol Esc
  if (e.key === "Escape") {
    modOverlay.style.display = "none";
  }
});

// Set Score ke 7 Juta
btn7Million.addEventListener("click", () => {
  if (window.updateGameScore) {
    window.updateGameScore(7000000n);
  }
  modOverlay.style.display = "none";
});

// Set Score ke 1 Oktiliun (10^27)
btn1Octillion.addEventListener("click", () => {
  if (window.updateGameScore) {
    window.updateGameScore(1000000000000000000000000000n);
  }
  modOverlay.style.display = "none";
});

// Set Custom Score dari Input
btnSetCustom.addEventListener("click", () => {
  const customValue = inputCustomScore.value;
  if (customValue && window.updateGameScore) {
    try {
      window.updateGameScore(customValue); // Mengubah input string menjadi BigInt
      modOverlay.style.display = "none";
    } catch (e) {
      alert("Masukkan angka yang valid (hanya digit)!");
    }
  }
});

// Tambah Achievement
btnAddAchievement.addEventListener("click", () => {
  if (window.addGameAchievement) {
    window.addGameAchievement(1);
  }
  modOverlay.style.display = "none";
});

// Kurangi Achievement
btnRemoveAchievement.addEventListener("click", () => {
  if (window.removeGameAchievement) {
    window.removeGameAchievement(1);
  }
  modOverlay.style.display = "none";
});

// Set Custom Achievement
btnSetCustomAchievement.addEventListener("click", () => {
  const customValue = inputCustomAchievement.value;
  if (customValue && window.setGameAchievement) {
    window.setGameAchievement(customValue);
    modOverlay.style.display = "none";
  }
});

// Unlock All Easter Eggs
btnUnlockAllEggs.addEventListener("click", () => {
  if (window.unlockAllEasterEggs) {
    window.unlockAllEasterEggs();
    modOverlay.style.display = "none";
  }
});

// Tutup Menu
btnCloseMod.addEventListener("click", () => {
  modOverlay.style.display = "none";
});

// Fungsi Cek Limit Harian (5x Sehari)
function checkModLimitAndOpen() {
  const today = new Date().toDateString();
  // Menggunakan key baru (_v5) agar hitungan ter-reset lagi
  const lastDate = localStorage.getItem("modLastDate_v5");
  let usageCount = parseInt(localStorage.getItem("modUsageCount_v5") || 0);

  if (isNaN(usageCount)) usageCount = 0;

  // Reset jika hari berganti
  if (lastDate !== today) {
    usageCount = 0;
    localStorage.setItem("modLastDate_v5", today);
    localStorage.setItem("modUsageCount_v5", usageCount);
  }

  if (usageCount < 5) {
    modOverlay.style.display = "flex";
    usageCount++;
    localStorage.setItem("modUsageCount_v5", usageCount);
  } else {
    alert("Batas penggunaan Mod Menu harian tercapai (5x sehari)!");
  }
}
