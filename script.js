// ========================
// Section Switching
// ========================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

function showSection(sectionId) {
  sections.forEach(sec => sec.classList.remove('active'));
  navLinks.forEach(link => link.classList.remove('active'));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');

  const activeLink = Array.from(navLinks).find(link => link.dataset.section === sectionId);
  if (activeLink) activeLink.classList.add('active');
}

// Nav click
navLinks.forEach(link => link.addEventListener('click', e => {
  e.preventDefault();
  showSection(link.dataset.section);
}));

// ========================
// Modal Logic (Resume, Certificates, Project Screenshots)
// ========================
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const closeModal = modal.querySelector('.close');

function showModal(file, title) {
  modalImg.src = file;
  modalTitle.textContent = title;
  modal.style.display = 'block';
}

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

// Resume Button
const ctaBtn = document.querySelector('.cta-btn');
ctaBtn.addEventListener('click', e => {
  e.preventDefault();
  const resumeFile = ctaBtn.dataset.resume;
  showModal(resumeFile, "Resume");
});

// Certificates
const certCards = document.querySelectorAll('.cert-card, .badge');
certCards.forEach(card => {
  card.addEventListener('click', () => {
    const certFile = card.dataset.cert;
    if (certFile) showModal(`files/${certFile}`, card.textContent || "Certificate");
  });
});

// Project Cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const screenshot = card.dataset.screenshot;
    if (screenshot) showModal(screenshot, card.querySelector('h3').textContent);
  });
});

// ========================
// Typing Effect for Home Section
// ========================
const phrases = ["Aspiring IT Project Manager", "AI Enthusiast", "Certified Project Manager"];
let i = 0, j = 0, currentPhrase = '', isDeleting = false;
const typingEl = document.querySelector('.home-inner h3');

function type() {
  if (!typingEl) return;
  if (i >= phrases.length) i = 0;
  currentPhrase = phrases[i];

  if (isDeleting) {
    typingEl.textContent = currentPhrase.substring(0, j--);
    if (j < 0) { isDeleting = false; i++; j = 0; }
  } else {
    typingEl.textContent = currentPhrase.substring(0, j++);
    if (j > currentPhrase.length) { isDeleting = true; j = currentPhrase.length; }
  }
  setTimeout(type, isDeleting ? 50 : 150);
}
type();

// ========================
// Animate Hire Cards on Scroll
// ========================
function animateHireCards() {
  const hireCards = document.querySelectorAll('.hire-card');
  hireCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      setTimeout(() => card.classList.add('visible'), index * 150);
    }
  });
}
window.addEventListener('scroll', animateHireCards);
window.addEventListener('load', animateHireCards);

// ========================
// Particles.js Initialization
// ========================
if (window.particlesJS) {
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 50 },
      "color": { "value": "#9b59b6" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5 },
      "size": { "value": 3 },
      "line_linked": { "enable": true, "distance": 150, "color": "#9b59b6", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": { "onhover": { "enable": true, "mode": "repulse" } }
    }
  });
}
