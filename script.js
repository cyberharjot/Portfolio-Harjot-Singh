const words = [
  "Cybersecurity Enthusiast",
  "Ethical Hacking Learner",
  "Exploring AI & Technology"
];

const typingEl = document.getElementById("typing");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const yearEl = document.getElementById("year");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingEl) return;

  const currentWord = words[wordIndex];

  if (!deleting) {
    typingEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typingEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 85);
}

setTimeout(typeLoop, 300);

function closeMenu() {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  navLinks.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = navLinks.classList.contains("open");
  isOpen ? closeMenu() : openMenu();
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Smooth active link + reveal on scroll
const sections = [...document.querySelectorAll("section[id]")];
const navItems = [...document.querySelectorAll(".nav-link")];
const revealEls = [...document.querySelectorAll(".reveal")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.5, rootMargin: "-15% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

yearEl.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Optional subtle cursor glow for desktop
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.width = "240px";
  glow.style.height = "240px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "1";
  glow.style.filter = "blur(70px)";
  glow.style.opacity = "0.14";
  glow.style.background = "radial-gradient(circle, rgba(100,246,211,0.8), transparent 65%)";
  glow.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}