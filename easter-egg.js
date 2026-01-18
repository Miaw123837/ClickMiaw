const videoOverlay = document.getElementById("video-overlay");
const youtubeFrame = document.getElementById("youtube-video");
const closeBtn = document.getElementById("close-video");
const soundOverlay = document.getElementById("sound-overlay");
const soundImg = document.getElementById("sound-img");
const endgameOverlay = document.getElementById("endgame-overlay");
const eggCollection = document.getElementById("achievement-list");

// --- YouTube API Setup ---
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-video", {
    events: {
      onStateChange: onPlayerStateChange,
      onError: onPlayerError,
    },
  });
}

function onPlayerStateChange(event) {
  // Jika video selesai (ENDED = 0), tutup overlay
  if (event.data === YT.PlayerState.ENDED) {
    closeVideoOverlay();
  }
}

function onPlayerError(event) {
  // Tutup overlay jika terjadi error pada video (misal: tidak bisa di-embed atau ID salah)
  console.warn("YouTube Player Error:", event.data);
  // closeVideoOverlay(); // Jangan tutup otomatis agar error terlihat oleh user
}

// Load data Easter Egg yang sudah ditemukan
let foundEggs = JSON.parse(localStorage.getItem("foundEasterEggs") || "[]");

// Fungsi untuk menampilkan koleksi Easter Egg di layar
function renderEasterEggs() {
  if (!eggCollection) return;
  eggCollection.innerHTML = "";

  foundEggs.forEach((eggKey) => {
    const eggDiv = document.createElement("div");
    eggDiv.className = "egg-item";

    // Format Key: Tipe-Score (Contoh: Video-1500, Sound-5000000)
    const [type, scoreVal] = eggKey.split("-");
    let title = `${type} Egg (${scoreVal})`;
    let bgImage = "EASTER.png"; // Gambar default (Kucing)

    // Jika tipe Sound, coba cari gambar spesifiknya
    if (type === "Sound" && typeof soundMilestonesData !== "undefined") {
      // Coba akses data dari config (baik via BigInt atau String)
      try {
        const data =
          soundMilestonesData[BigInt(scoreVal)] ||
          soundMilestonesData[scoreVal];
        if (data && data.image) {
          bgImage = data.image;
        }
      } catch (e) {}
    }

    // Cek gambar khusus Mas Agus (Video-1)
    if (eggKey === "Video-1" && typeof agusImage !== "undefined") {
      bgImage = agusImage;
      title = "Mas Agus Indihome";
    }

    // Cek Achievement Egg (Achievement-1)
    if (
      (eggKey === "Achievement-1" || eggKey === "Achievement-1-Fix") &&
      typeof achievementEggName !== "undefined"
    ) {
      title = achievementEggName;
    }

    eggDiv.style.backgroundImage = `url('${bgImage}')`;
    eggDiv.setAttribute("data-title", title);
    eggCollection.appendChild(eggDiv);
  });
}

// Fungsi Helper untuk mengecek dan menjalankan Easter Egg
function checkEasterEggs(score, currentAchievements = 0) {
  // Cek First Click Easter Egg (Score 1 & Achievement 0)
  // Hanya muncul jika ini klik pertama DAN belum pernah dapat achievement (pengguna baru)
  if (score === 1n && currentAchievements < 1) {
    const key = "Video-1";
    videoOverlay.style.display = "flex";

    if (player && typeof player.loadVideoById === "function") {
      player.loadVideoById(firstClickVideoID);
    } else {
      youtubeFrame.src = `https://www.youtube.com/embed/${firstClickVideoID}?autoplay=1&enablejsapi=1`;
    }

    if (!foundEggs.includes(key)) {
      foundEggs.push(key);
      localStorage.setItem("foundEasterEggs", JSON.stringify(foundEggs));
      renderEasterEggs();
    }
    return; // Jangan cek milestone lain
  }

  // Cek Achievement Egg (Score 5 & Achievement >= 1)
  if (score === 5n && currentAchievements >= 1) {
    const key = "Achievement-1-Fix"; // Ganti key agar muncul ulang jika sebelumnya error
    if (!foundEggs.includes(key)) {
      videoOverlay.style.display = "flex";
      if (player && typeof player.loadVideoById === "function") {
        player.loadVideoById(achievementVideoID);
      } else {
        youtubeFrame.src = `https://www.youtube.com/embed/${achievementVideoID}?autoplay=1&enablejsapi=1`;
      }

      foundEggs.push(key);
      localStorage.setItem("foundEasterEggs", JSON.stringify(foundEggs));
      renderEasterEggs();
    }
  }

  // Cek Easter Egg Video
  if (milestones.includes(score)) {
    videoOverlay.style.display = "flex";
    if (player && typeof player.loadVideoById === "function") {
      player.loadVideoById(youtubeVideoID);
    } else {
      youtubeFrame.src = `https://www.youtube.com/embed/${youtubeVideoID}?autoplay=1&enablejsapi=1`;
    }

    // Simpan progress Easter Egg
    const key = `Video-${score}`;
    if (!foundEggs.includes(key)) {
      foundEggs.push(key);
      localStorage.setItem("foundEasterEggs", JSON.stringify(foundEggs));
      renderEasterEggs(); // Update tampilan
    }
  }

  // Cek Sound Easter Egg
  if (soundMilestonesData[score]) {
    const data = soundMilestonesData[score];
    soundImg.src = data.image;
    soundOverlay.style.display = "flex";

    playCustomAudio(data.audio, () => {
      soundOverlay.style.display = "none";
    });

    // Simpan progress Easter Egg
    const key = `Sound-${score}`;
    if (!foundEggs.includes(key)) {
      foundEggs.push(key);
      localStorage.setItem("foundEasterEggs", JSON.stringify(foundEggs));
      renderEasterEggs(); // Update tampilan
    }
  }
}

// Fungsi Helper untuk menjalankan Endgame
function triggerEndgame() {
  endgameOverlay.style.display = "flex";
  // Mainkan suara oiia.mp3 sampai selesai, lalu tutup overlay
  playCustomAudio("oiia.mp3", () => {
    endgameOverlay.style.display = "none";
  });
}

// Sembunyikan video saat selesai diputar (Tombol Tutup)
closeBtn.onclick = closeVideoOverlay;

function closeVideoOverlay() {
  videoOverlay.style.display = "none";
  if (player && typeof player.stopVideo === "function") {
    player.stopVideo();
  } else {
    youtubeFrame.src = "";
  }
}

// Tampilkan koleksi saat halaman dimuat
renderEasterEggs();

// Fitur Unlock All Easter Eggs (Cheat)
window.unlockAllEasterEggs = function () {
  // Reset dan isi dengan semua kemungkinan Easter Egg
  foundEggs = ["Video-1", "Achievement-1", "Achievement-1-Fix"];

  if (typeof milestones !== "undefined") {
    milestones.forEach((m) => foundEggs.push(`Video-${m}`));
  }

  if (typeof soundMilestonesData !== "undefined") {
    Object.keys(soundMilestonesData).forEach((k) =>
      foundEggs.push(`Sound-${k}`),
    );
  }

  // Hapus duplikat jika ada
  foundEggs = [...new Set(foundEggs)];

  localStorage.setItem("foundEasterEggs", JSON.stringify(foundEggs));
  renderEasterEggs();
  alert("Cheat Activated: All Easter Eggs Unlocked!");
};
