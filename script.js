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

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

// ========================
// Modal Logic
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
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// ========================
// Resume Button
// ========================
const ctaBtn = document.querySelector('.cta-btn');
ctaBtn.addEventListener('click', e => {
  e.preventDefault();
  const resumeFile = ctaBtn.dataset.resume;
  showModal(resumeFile, "Resume");
});

// ========================
// Certificates
// ========================
const certCards = document.querySelectorAll('.cert-card, .badge');
certCards.forEach(card => {
  card.addEventListener('click', () => {
    const certFile = card.dataset.cert;
    if (certFile) showModal(`files/${certFile}`, card.textContent || "Certificate");
  });
});

// ========================
// Project Cards
// ========================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectType = card.dataset.project;
    if (projectType === "new-hire-orientation") {
      showNewHireModal();
    } else if (projectType === "mms-project") {
      showMMSProjectModal();
    }
  });
});

// ========================
// Smooth Typing Effect for Home Section
// ========================
const phrases = ["Aspiring IT Project Manager", "AI Enthusiast", "Certified Project Manager"];
let i = 0, j = 0;
let isDeleting = false;
const typingEl = document.querySelector('.home-inner h3');
const typingDelay = 120;   // Typing speed
const erasingDelay = 60;   // Erasing speed
const newTextDelay = 1500; // Pause before new phrase

function type() {
  if (!typingEl) return;

  let currentPhrase = phrases[i];

  if (isDeleting) {
    typingEl.textContent = currentPhrase.substring(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(type, erasingDelay);
    }
  } else {
    typingEl.textContent = currentPhrase.substring(0, j++);
    if (j > currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
    } else {
      setTimeout(type, typingDelay);
    }
  }
}

// Add blinking cursor style
const style = document.createElement('style');
style.innerHTML = `
  .home-inner h3::after {
    content: '|';
    animation: blink 0.7s infinite;
  }
  @keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0; }
  }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => setTimeout(type, newTextDelay));

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

// ========================
// MMS Project Modal
// ========================
function showMMSProjectModal() {
  const projectModal = document.createElement('div');
  projectModal.classList.add('modal');
  projectModal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>MMS Project – Infosys Analysis</h2>
      <p>
        Conducted a comprehensive industry and company analysis of Infosys using 20+ secondary sources, including annual reports, journals, Statista, and Gartner.<br>
        Analyzed Infosys’s $18B+ revenue model, 300K+ workforce, and global presence in 50+ countries.<br>
        Performed SWOT and competitor benchmarking against TCS, Wipro, and Accenture.<br>
        Assessed digital transformation strategies in AI, Cloud, Cybersecurity, and Automation.<br>
        Recommended diversification into emerging markets and strategies to strengthen sustainability and reduce attrition risks.<br>
        This project sharpened skills in business analysis, research methodology, financial analysis, and strategic evaluation.
      </p>
    </div>
  `;
  document.body.appendChild(projectModal);

  const closeBtn = projectModal.querySelector('.close');
  closeBtn.addEventListener('click', () => document.body.removeChild(projectModal));

  projectModal.style.display = 'block';
  window.addEventListener('click', e => {
    if (e.target === projectModal) document.body.removeChild(projectModal);
  });
}

// ========================
// New Hire Orientation Modal
// ========================
function showNewHireModal() {
  const headings = [
    "Project Charter",
    "Project Scope",
    "Stakeholder Register Format",
    "RACI",
    "Risk Register",
    "Resource Breakdown Structure",
    "WBS",
    "Communications Management Plan",
    "Change Log",
    "Issue Log",
    "Budget Plan",
    "Quality Management Plan",
    "Resource Plan",
    "Procurement Plan",
    "Lessons Learned / Retrospective Report"
  ];

  const projectModal = document.createElement('div');
  projectModal.classList.add('modal');
  projectModal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>New Hire Orientation Program</h2>
      <p>
        Directed the successful development and execution of a two-day onboarding program for 20+ new hires quarterly, enhancing retention and engagement.<br>
        Reduced first-week attrition by 4% and 45-day attrition by 20%, aligning with industry benchmarks.<br>
        Managed a $22K+ project budget, delivering the program on time and within 5% of planned costs.<br>
        Led and coordinated 10+ cross-functional stakeholders to ensure smooth execution.<br>
        Achieved >80% participant satisfaction in post-event surveys.
      </p>
      <div class="gallery"></div>
    </div>
  `;
  document.body.appendChild(projectModal);

  const gallery = projectModal.querySelector('.gallery');
  for (let k = 0; k < headings.length; k++) {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.innerHTML = `
      <h4>${headings[k]}</h4>
      <img src="files/ss${k+1}.jpg" alt="Screenshot ${k+1}" data-title="${headings[k]}" data-src="files/ss${k+1}.jpg">
    `;
    gallery.appendChild(item);
  }

  const closeBtn = projectModal.querySelector('.close');
  closeBtn.addEventListener('click', () => document.body.removeChild(projectModal));

  const ssModal = document.createElement('div');
  ssModal.classList.add('modal');
  ssModal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2 id="ss-modal-title"></h2>
      <img id="ss-modal-img" src="">
    </div>
  `;
  document.body.appendChild(ssModal);

  const ssModalImg = ssModal.querySelector('#ss-modal-img');
  const ssModalTitle = ssModal.querySelector('#ss-modal-title');
  const ssCloseBtn = ssModal.querySelector('.close');

  gallery.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
      ssModal.style.display = 'block';
      ssModalImg.src = img.dataset.src;
      ssModalTitle.textContent = img.dataset.title;
    });
  });

  ssCloseBtn.addEventListener('click', () => ssModal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === ssModal) ssModal.style.display = 'none';
  });

  projectModal.style.display = 'block';
  window.addEventListener('click', e => {
    if (e.target === projectModal) document.body.removeChild(projectModal);
  });
}
