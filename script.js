// =========================
// TYPING EFFECT (NO JUMPING)
// =========================
const words = [
"Cybersecurity Enthusiast",
"Ethical Hacking Learner",
"Exploring AI & Technology"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
    const typing = document.getElementById("typing");

    if (!typing) return;

    currentWord = words[i];

    if (!isDeleting) {
        typing.textContent = currentWord.substring(0, j);
        j++;

        if (j > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200); // pause on full word
            return;
        }

    } else {
        typing.textContent = currentWord.substring(0, j);
        j--;

        if (j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            j = 0;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 90);
}

setTimeout(typeEffect, 100);


// =========================
// MOBILE NAVBAR TOGGLE
// =========================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent weird click issues

    if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
    } else {
        navLinks.classList.add("active");
    }
});

document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
    }
});


// =========================
// CLOSE MENU ON LINK CLICK (MOBILE)
// =========================
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// =========================
// AOS INIT (SCROLL ANIMATIONS)
// =========================
AOS.init({
    duration: 1000,
    once: false
});