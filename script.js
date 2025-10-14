// ========================
// Merged script.js + animation.js
// ========================

document.addEventListener("DOMContentLoaded", () => {

  // ========================
  // Smooth Typing Effect with Backspace
  // ========================
  const typingText = [
    "Project Management Enthusiast",
    "CAPM Certified Professional",
    "IT Systems & AI Integration",
    "Agile & Scrum Practitioner"
  ];

  let typingIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector('.typing');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetween = 2000;
  const pauseBeforeDelete = 1000;

  let typingTimeout; // NEW — store typing animation timeout


  function typeWriter() {
    if (!typingElement) return;

    const currentText = typingText[typingIndex];

    if (isDeleting) {
      charIndex--;
      typingElement.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex++;
      typingElement.textContent = currentText.substring(0, charIndex);
    }

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
      timeout = pauseBeforeDelete;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingText.length;
      timeout = typingSpeed;
    }

    setTimeout(typeWriter, timeout);
  }

  function addCursorEffect() {
    if (!typingElement) return;
    typingElement.style.borderRight = "2px solid white";
    typingElement.style.animation = "blink-caret 0.7s step-end infinite";
  }

  addCursorEffect();
  setTimeout(typeWriter, 500);

  // ========================
  // Section Switching
  // ========================
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('nav a');

  function showSection(sectionId) {
    sections.forEach(sec => {
      sec.classList.remove('active');
      sec.style.opacity = 0;
      sec.style.transition = "opacity 0.6s ease";
    });
    navLinks.forEach(link => link.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add('active');
      setTimeout(() => {
        target.style.opacity = 1;
      }, 50);
    }

    const activeLink = Array.from(navLinks).find(link => link.dataset.section === sectionId);
    if (activeLink) activeLink.classList.add('active');
  }

  navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showSection(link.dataset.section);

    // Remove typing cursor effect temporarily
    if (typingElement) {
      typingElement.style.borderRight = "none";
    }

    // Restart typing animation after section change
    setTimeout(() => {
      addCursorEffect();
      startTyping();
    }, 100);
  });
});

  // ========================
  // Modal Logic
  // ========================
  const modal = document.getElementById('modal');

  function closeModal() {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.display = 'none';
      modal.innerHTML = '';
    }, 300);
  }

  window.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // ========================
  // Resume Button with Preview
  // ========================
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', e => {
      e.preventDefault();
      const resumeFile = ctaBtn.dataset.resume;
      const resumePreview = "files/resume.jpg";

      modal.innerHTML = `
        <div class="modal-content animate-modal">
          <span class="close">&times;</span>
          <h2>My Resume</h2>
          <img src="${resumePreview}" alt="Resume Preview" style="width:100%; height:auto; border-radius:10px; margin-bottom:1rem;">
          <a href="${resumeFile}" download class="cta-btn">⬇ Download PDF</a>
        </div>
      `;
      modal.style.display = 'block';
      modal.style.opacity = 0;
      setTimeout(() => modal.style.opacity = 1, 50);

      modal.querySelector('.close').addEventListener('click', closeModal);
    });
  }

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

  function showModal(file, title) {
    modal.innerHTML = `
      <div class="modal-content animate-modal">
        <span class="close">&times;</span>
        <h2>${title}</h2>
        <img src="${file}" alt="${title}" style="width:100%; border-radius:10px;">
      </div>
    `;
    modal.style.display = 'block';
    modal.style.opacity = 0;
    setTimeout(() => modal.style.opacity = 1, 50);

    modal.querySelector('.close').addEventListener('click', closeModal);
  }

  // ========================
  // Project Cards
  // ========================
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('animate-card');
      setTimeout(() => card.classList.remove('animate-card'), 300);
      const projectType = card.dataset.project;
      if (projectType === "new-hire-orientation") {
        showNewHireModal();
      } else if (projectType === "mms-project") {
        showMMSProjectModal();
      }
    });
  });

  function showMMSProjectModal() {
    modal.innerHTML = `
      <div class="modal-content animate-modal">
        <span class="close">&times;</span>
        <h2>MMS Project – Infosys Analysis</h2>
        <div class="project-description">
          <p><b>Project Title:</b> Comprehensive Study of General Management Practices at Infosys</p>
          <p><b>Duration:</b> 3 Months</p>
          <p><b>Overview:</b> This project explored Infosys’ organizational structure, departmental operations, management strategies, and digital transformation initiatives. It applied MMS theoretical knowledge to real-world business scenarios with both qualitative and quantitative analysis.</p>
          
          <p><b>Methodology & Data Collection:</b></p>
          <ul>
            <li><b>Primary Data:</b> Interviews with 10+ senior managers; surveys with 50+ employees for insights on management practices, culture, and digital adoption.</li>
            <li><b>Secondary Data:</b> Annual reports, company website & press releases, industry reports (Gartner, IDC, Statista), academic journals & articles (Forbes, Business Today, JSTOR).</li>
            <li><b>Data Validation:</b> Cross-referenced primary and secondary data; external expert validation.</li>
          </ul>

          <p><b>Departmental Insights:</b></p>
          <ul>
            <li><b>Marketing:</b> Digital marketing strategies, client acquisition, explainer videos, email marketing, mobile app integration.</li>
            <li><b>Finance:</b> Corporate finance, treasury management, financial reporting, investment advisory.</li>
            <li><b>HR:</b> Recruitment, engagement, performance evaluation, leadership training.</li>
            <li><b>Operations:</b> Client onboarding, project management, service delivery, risk management.</li>
            <li><b>IT:</b> Infrastructure management, software development, systems integration, cybersecurity, AI, cloud, AR/VR, blockchain adoption.</li>
          </ul>

          <p><b>Key Findings & SWOT Highlights:</b></p>
          <ul>
            <li><b>Strengths:</b> Global presence, skilled workforce, innovation focus, financial stability.</li>
            <li><b>Weaknesses:</b> North America dependency, attrition, cultural integration challenges.</li>
            <li><b>Opportunities:</b> Digital services expansion, emerging markets, tech partnerships, ESG initiatives.</li>
            <li><b>Threats:</b> Intense competition, regulatory changes, economic downturns, rapid tech disruption.</li>
          </ul>

          <p><b>Skills & Tools:</b> Data collection, survey design, SWOT analysis, departmental evaluation, strategic reporting. Tools: Excel, PowerPoint, Survey tools, Market Research Platforms.</p>

          <p><b>Conclusion:</b> The project highlighted Infosys’ operational efficiency, employee management, financial strategies, marketing initiatives, and IT-enabled digital transformation. Key takeaways: innovation, employee engagement, client-centric strategies, and global expansion ensure continued success.</p>
        </div>
      </div>
    `;
    modal.style.display = 'block';
    modal.style.opacity = 0;
    setTimeout(() => modal.style.opacity = 1, 50);
    modal.querySelector('.close').addEventListener('click', closeModal);
  }

  function showNewHireModal() {
    const headings = [
      "Project Charter", "Project Scope", "Stakeholder Register Format", "RACI",
      "Risk Register", "Resource Breakdown Structure", "WBS",
      "Communications Management Plan", "Change Log", "Issue Log",
      "Budget Plan", "Quality Management Plan", "Resource Plan",
      "Procurement Plan", "Lessons Learned / Retrospective Report"
    ];

    modal.innerHTML = `
      <div class="modal-content animate-modal">
        <span class="close">&times;</span>
        <h2>New Hire Orientation Program</h2>
        <div class="project-description">
          <p><b>Project Name:</b> New Hire Orientation Program</p>
          <p><b>Role:</b> Project Manager</p>
          <p><b>Duration:</b> February 15, 2025 – June 20, 2025</p>
          <p><b>Team Size:</b> 10 key stakeholders and contributors</p>
          <p><b>Budget:</b> $22,450 (including a 10% contingency)</p>
          <p><b>Overview:</b> Innovations Inc., a leading provider of office interior decorating and renovation solutions with over $12M in annual sales...</p>
          <p><b>Project Objectives:</b> Reduce attrition, improve satisfaction, boost engagement, optimize recruitment costs.</p>
          <p><b>Key Deliverables:</b> Comprehensive agenda, venue booking, catering, manuals, technical setup, tours, Q&A sessions.</p>
          <p><b>Project Scope Highlights:</b> Must-have components and exclusions defined.</p>
          <p><b>Resource & Cost Breakdown:</b> Personnel Costs: $5,200, Direct Costs: $14,600, Total Budget: $22,450.</p>
          <p><b>Risk Management:</b> Identified risks: delay in venue booking, catering issues, IT equipment failure, low attendance, budget overrun.</p>
          <p><b>Stakeholders & Roles:</b> Project Sponsor: Marcus Wilson, Project Manager: Gloria Fisher, plus IT, finance, facilities, marketing, HR roles.</p>
          <p><b>Achievements & Impact:</b> Delivered successful onboarding within 14 weeks, reducing attrition and enhancing engagement.</p>
          <p><b>Lessons Learned:</b> Early stakeholder engagement, pre-event quality checks, contingency planning, clear communication.</p>
          <p><b>Outcome:</b> Enhanced onboarding experience, reduced attrition, improved corporate culture awareness.</p>
        </div>
        <div class="gallery"></div>
      </div>
    `;

    const gallery = modal.querySelector('.gallery');
    headings.forEach((heading, index) => {
      const item = document.createElement('div');
      item.classList.add('gallery-item', 'animate-card');
      item.innerHTML = `
        <h4>${heading}</h4>
        <img src="files/ss${index + 1}.jpg" alt="${heading}" data-title="${heading}" data-src="files/ss${index + 1}.jpg">
      `;
      gallery.appendChild(item);
    });

    const ssModal = document.createElement('div');
    ssModal.classList.add('modal');
    ssModal.innerHTML = `
      <div class="modal-content animate-modal">
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
        ssModal.style.opacity = 0;
        setTimeout(() => ssModal.style.opacity = 1, 50);
        ssModalImg.src = img.dataset.src;
        ssModalTitle.textContent = img.dataset.title;
      });
    });

    ssCloseBtn.addEventListener('click', () => ssModal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === ssModal) ssModal.style.display = 'none';
    });

    modal.style.display = 'block';
    modal.style.opacity = 0;
    setTimeout(() => modal.style.opacity = 1, 50);

    modal.querySelector('.close').addEventListener('click', closeModal);
  }

});

// ========================
// Mesh Background Animation
// ========================
// ========================
// Night Sky Animation with Stars + Wind + Lightning Effect
// ========================
const canvas = document.getElementById("mesh-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

let stars = [];
let t = 0;

// ========== Stars ==========
function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      radius: Math.random() * 1.2,
      alpha: Math.random() * 0.8
    });
  }
}

function drawStars() {
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();

    star.alpha += (Math.random() - 0.5) * 0.03;
    if (star.alpha < 0.1) star.alpha = 0.1;
    if (star.alpha > 0.8) star.alpha = 0.8;
  }
}

// ========== Color Interpolation ==========
function lerpColor(a, b, t) {
  const ah = parseInt(a.replace("#", ""), 16),
        ar = (ah >> 16) & 0xff,
        ag = (ah >> 8) & 0xff,
        ab = ah & 0xff;

  const bh = parseInt(b.replace("#", ""), 16),
        br = (bh >> 16) & 0xff,
        bg = (bh >> 8) & 0xff,
        bb = bh & 0xff;

  const rr = ar + t * (br - ar),
        rg = ag + t * (bg - ag),
        rb = ab + t * (bb - ab);

  return `rgb(${rr|0},${rg|0},${rb|0})`;
}

// ========== Flowing Gradient Background ==========
function drawBackground() {
  let gradient = ctx.createLinearGradient(0, 0, width, height);

  const colors = ["#050B1F", "#000000", "#20001F", "#000A1F"]; // darker shades
  const flowSpeed = 0.002;

  let progress = (t * flowSpeed) % colors.length;
  let index = Math.floor(progress);
  let nextIndex = (index + 1) % colors.length;
  let blend = progress - index;

  let color1 = lerpColor(colors[index], colors[nextIndex], blend);
  let color2 = lerpColor(colors[(index+1) % colors.length], colors[(nextIndex+1) % colors.length], blend);

  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  t++;
}

// ========== Animation ==========
function animate() {
  drawBackground();
  drawStars();
  requestAnimationFrame(animate);
}

// Init
initStars();
animate();

// Resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initStars();
});

// ========================
// Modal Close Contain
// ========================
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target.classList.contains("modal-close") || e.target === modal) {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.display = "none";
      modal.innerHTML = '<div class="modal-content"><span class="modal-close">&times;</span></div>';
    }, 300);
  }
});

// ========================
// Gmail Compose Function
// ========================
function openGmailCompose() {
  const email = "anirudhamohite023@gmail.com";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

  window.open(
    gmailUrl,
    "gmailCompose",
    "width=600,height=500,resizable=yes,scrollbars=yes,status=no"
  );
}

// ========================
// EmailJS Contact Form
// ========================
window.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with your actual public key
  emailjs.init("7afcy1es3MYs7l0lY");

  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_qput7qr", "template_nbr4kaw", this)
      .then(() => {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("❌ Failed to send. Check console for details.");
      });
  });
});
