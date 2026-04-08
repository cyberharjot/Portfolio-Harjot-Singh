const words = [
  "Cybersecurity Enthusiast",
  "Ethical Hacking Learner",
  "Secure Development Focus"
];

const typingEl = document.getElementById("typing");
const menuBtn = document.getElementById("menuBtn");
const navPanel = document.getElementById("navPanel");
const navItems = document.querySelectorAll(".nav-item");
const backTop = document.getElementById("backTop");
const yearEl = document.getElementById("year");
const sectionChip = document.getElementById("sectionChip");
const sections = Array.from(document.querySelectorAll("section[id]"));

const NAV_OFFSET = () => (window.innerWidth <= 540 ? 84 : 70);

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typingTimer = null;
let scrollTicking = false;

function typeLoop() {
  if (!typingEl) return;

  const current = words[wordIndex];

  if (!deleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      deleting = true;
      typingTimer = setTimeout(typeLoop, 750);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  typingTimer = setTimeout(typeLoop, deleting ? 30 : 48);
}

setTimeout(typeLoop, 220);

function closeMenu() {
  navPanel.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  navPanel.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function setActiveSection(id) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.section === id);
  });

  if (sectionChip) {
    const label = {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      certifications: "Certifications",
      contact: "Contact"
    }[id] || "Home";

    sectionChip.innerHTML = `<i class="ri-focus-3-line"></i><span>${label}</span>`;
  }
}

function scrollToSection(id, closeNav = true) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET();
  window.scrollTo({ top, behavior: "smooth" });
  setActiveSection(id);
  history.replaceState(null, "", `#${id}`);

  if (closeNav && window.innerWidth <= 900) closeMenu();
}

menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  navPanel.classList.contains("open") ? closeMenu() : openMenu();
});

document.addEventListener("click", (e) => {
  if (!navPanel.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection(item.dataset.section, true);
  });
});

function updateCurrentSection() {
  const probe = window.scrollY + Math.min(window.innerHeight * 0.28, 220);
  let currentId = "home";

  for (const section of sections) {
    if (section.offsetTop <= probe) {
      currentId = section.id;
    } else {
      break;
    }
  }

  setActiveSection(currentId);
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      updateCurrentSection();

      if (window.scrollY > 420) {
        backTop.classList.add("show");
      } else {
        backTop.classList.remove("show");
      }

      scrollTicking = false;
    });

    scrollTicking = true;
  }
});

backTop.addEventListener("click", () => scrollToSection("home", true));

window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  const valid = sections.some((section) => section.id === hash);

  if (valid) {
    setTimeout(() => scrollToSection(hash, false), 50);
  } else {
    updateCurrentSection();
  }
});

window.addEventListener("resize", updateCurrentSection);
yearEl.textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => revealObserver.observe(el));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.width = "260px";
  glow.style.height = "260px";
  glow.style.borderRadius = "50%";
  glow.style.pointerEvents = "none";
  glow.style.zIndex = "0";
  glow.style.filter = "blur(80px)";
  glow.style.opacity = "0.14";
  glow.style.background = "radial-gradient(circle, rgba(192,77,255,0.75), transparent 65%)";
  glow.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}