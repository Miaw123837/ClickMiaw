// Tipe data untuk konfigurasi game

// Batas Score
export const LIMIT: bigint =
  19000000000000000000000000000000000000000000000000000000000000n;

// Konfigurasi Gambar Utama
export const img1: string = "download (2).jpeg";
export const img2: string = "download.jpeg";

// ID Video YouTube untuk Easter Egg
export const youtubeVideoID: string = "I68Ehtbu84M";
export const easterEggName: string = "Yeay! 19 DETILION!";

// ID Video First Click
export const firstClickVideoID: string = "RIPaBj4Jhvo";
export const agusImage: string = "masindihome.jpg";

// ID Video Achievement 1
export const achievementVideoID: string = "J---aiyznGQ";
export const achievementEggName: string =
  "Congratulations! You have reached 1 achievement.";
export const achievementEggImage: string =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S0-FC_OqTh7hfGuU4VQKx4t71EjqMgoZIA&s";

// Daftar Milestone
export const milestones: bigint[] = [
  1500n,
  2500n,
  6250n,
  12500n,
  250000n,
  1000000n,
  5000000000000000n,
  5000000000000000000000000000n,
  9000000000000000000000000000000000n,
];

// Data Sound Easter Egg
export const soundMilestonesData: Record<
  string,
  { audio: string; image: string; name: string }
> = {
  "5000000": {
    audio: "sad-meow-song.mp3",
    image: "5-million.png",
    name: "Yeay 5 Million CLICK!",
  },
  "18000000000000000000000000000000000": {
    audio: "sad-meow-song.mp3",
    image: "18-detillion.png",
    name: "Yeay 18 DETILION CLICK!",
  },
};
