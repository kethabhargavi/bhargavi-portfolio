// Basic DOM refs
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const skillFills = document.querySelectorAll('.skill-fill');
const revealEls = document.querySelectorAll('.reveal');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

// Set current year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle (and remember preference)
function applyTheme(isLight){
  if(isLight) body.classList.add('light-mode');
  else body.classList.remove('light-mode');
  themeToggle.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
}
const saved = localStorage.getItem('theme');
applyTheme(saved === 'light');
themeToggle.addEventListener('click', () => {
  const isLight = !body.classList.contains('light-mode');
  applyTheme(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Reveal on scroll & skill animation
function onScrollReveal(){
  const trigger = window.innerHeight * 0.85;
  // reveal blocks
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < trigger){
      el.classList.add('show');
    }
  });

  // animate skills
  skillFills.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.85 && !bar.dataset.done){
      bar.style.width = bar.getAttribute('data-skill');
      bar.dataset.done = "true";
    }
  });
}
window.addEventListener('scroll', onScrollReveal);
window.addEventListener('load', onScrollReveal);

// Simple contact submit (no backend) — show success toast
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Message sent! (This is a demo — wire up a real backend or email service to receive messages.)');
  contactForm.reset();
});
