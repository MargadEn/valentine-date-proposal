/******** EMAIL JS ********/
(function () {
  emailjs.init("NSHx8-vYHqCn-gEkB");
})();

/******** PASSWORD ********/
const PASSWORD = "2019-11-05"; // <-- put your correct date here (YYYY-MM-DD)
let heartInterval = null;

/******** LOCK SCREEN UNLOCK ********/
function unlock() {
  const input = document.getElementById("password").value.trim();
  const msg = document.getElementById("lock-msg");

  if (!input) {
    msg.innerText = "Please select a date 💕";
    return;
  }

  if (input === PASSWORD) {
    // Hide lock screen, show main
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');
    msg.innerText = '';

    // Play music automatically
    const music = document.getElementById('bg-music');
    music.play().catch(() => {});
    document.getElementById('music-btn').innerText = "🎵 Playing...";

    // Start floating hearts
    createHearts();
  } else {
    msg.innerText = "Wrong date 😢";
  }
}

/******** ENTER KEY SUPPORT ********/
document.getElementById("password").addEventListener("keypress", e => {
  if (e.key === "Enter") unlock();
});

/******** MUSIC TOGGLE ********/
function playMusic() {
  const bgMusic = document.getElementById("bg-music");
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    document.getElementById('music-btn').innerText = "🎵 Playing...";
  } else {
    bgMusic.pause();
    document.getElementById('music-btn').innerText = "🎶 Play our song";
  }
}

/******** NO BUTTON ESCAPE ********/
const noBtn = document.getElementById("no-btn");
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/******** YES BUTTON ********/
function sayYes() {
  // Send email safely
  try {
    emailjs.send("service_kc7eyp7", "template_9hln2nl", {
      response: "YES 💖",
      message: document.getElementById("comment").value || "No comment"
    });
  } catch (e) {
    console.log("EmailJS not configured or error:", e);
  }

  // Hide main card
  const main = document.getElementById("main");
  main.classList.add("hidden");
  main.style.display = "none"; // safe fallback

  // Show YES screen
  const yesScreen = document.getElementById("yes-screen");
  yesScreen.classList.remove("hidden");
}

/******** NO BUTTON RESPONSE ********/
function sayNo() {
  document.getElementById('status').textContent =
    "I'm sorry to hear that, but I hope we can try again another time. ❤️";
}

/******** FLOATING HEARTS BEHIND CARD ********/
function createHearts() {
  heartInterval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div");
      heart.innerText = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "0";
      heart.style.fontSize = Math.random() * 20 + 15 + "px";
      heart.style.zIndex = 1;
      document.body.appendChild(heart);

      let rise = 0;
      const float = setInterval(() => {
        rise++;
        heart.style.bottom = rise + "px";
        if (rise > window.innerHeight) {
          clearInterval(float);
          heart.remove();
        }
      }, 20);
    }
  }, 500);
}

/******** MENU MODAL ********/
function openMenu() {
  document.getElementById("menu-modal").classList.remove("hidden");
}

function closeMenu() {
  document.getElementById("menu-modal").classList.add("hidden");
}

/******** ENSURE LOCK SCREEN SHOWN ON PAGE LOAD ********/
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lock-screen').classList.remove('hidden');
  document.getElementById('main').classList.add('hidden');
  document.getElementById('menu-modal').classList.add('hidden');
});
