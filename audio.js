// Konfigurasi Audio Global
const clickSound = new Audio("mario-meow.mp3");
const boingSound = new Audio(
  "https://www.myinstants.com/media/sounds/boing2.mp3"
);

// Fungsi memutar suara klik
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch((e) => console.warn("Click sound failed:", e));
}

// Fungsi memutar suara boing (untuk marquee)
function playBoingSound() {
  boingSound.currentTime = 0;
  boingSound.play().catch(() => {}); // Abaikan error jika belum ada interaksi user
}

// Fungsi memutar audio custom (untuk Easter Egg)
function playCustomAudio(src, onEndedCallback) {
  const audio = new Audio(src);
  audio.play().catch((e) => console.warn("Custom audio failed:", e));
  if (onEndedCallback) {
    audio.onended = onEndedCallback;
  }
}
