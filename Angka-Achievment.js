// Membuat elemen Score secara dinamis
const scoreDiv = document.createElement("div");
scoreDiv.id = "score";
scoreDiv.innerText = "0";
document.body.appendChild(scoreDiv);

// Membuat elemen Achievement secara dinamis
const achievementDiv = document.createElement("div");
achievementDiv.id = "achievement";
achievementDiv.innerText = "Achievements: 0";
document.body.appendChild(achievementDiv);
