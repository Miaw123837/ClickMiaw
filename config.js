// --- Konfigurasi Game ---

// Batas Score (19 Desiliun)
// Menggunakan BigInt karena melebihi batas Number biasa (2^53)
const LIMIT = 19000000000000000000000000000000000000000000000000000000000000n;

// Konfigurasi Gambar Utama
const img1 = "download (2).jpeg"; // Gambar diam
const img2 = "download.jpeg"; // Gambar saat diklik

// ID Video YouTube untuk Easter Egg (Green Screen Spinning Cat Meme)
const youtubeVideoID = "I68Ehtbu84M";
const easterEggName = "Yeay! 19 DETILION!";

// ID Video First Click (Mas Agus Indihome)
const firstClickVideoID = "RIPaBj4Jhvo";
const agusImage = "masindihome.jpg"; // Gambar Mas Agus untuk koleksi

// ID Video Achievement 1 (Rick Roll)
const achievementVideoID = "J---aiyznGQ";
const achievementEggName = "Congratulations! You have reached 1 achievement.";
const achievementEggImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S0-FC_OqTh7hfGuU4VQKx4t71EjqMgoZIA&s";

// Daftar Milestone untuk Easter Egg Video
const milestones = [
  1500n,
  2500n,
  6250n,
  12500n,
  250000n,
  1000000n, // 1 Juta
  5000000000000000n, // 5 Kuadriliun (10^15)
  5000000000000000000000000000n, // 5 Oktiliun (10^27)
  9000000000000000000000000000000000n, // 9 Desiliun (10^33)
];

// Data Sound Easter Egg (Milestone Khusus dengan Gambar & Suara)
const soundMilestonesData = {
  5000000n: {
    audio: "sad-meow-song.mp3",
    image: "5-million.png",
    name: "Yeay 5 Million CLICK!",
  },
  18000000000000000000000000000000000n: {
    audio: "sad-meow-song.mp3",
    image: "18-detillion.png",
    name: "Yeay 18 DETILION CLICK!",
  },
};
