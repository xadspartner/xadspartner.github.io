// Email configuration
const EMAIL = 'xadspartner@gmail.com';
const SUBJECT = 'Ads & Partnerships – Campaign Request';
const BODY = `Hi,

We'd like to run a campaign on your X network.

1) Brand / Creator:
2) Link (landing / OF / profile):
3) Package (Starter / Growth / Premium+):
4) Preferred date & time (timezone):
5) Target audience (countries / language):
6) Media assets (image/video) + copy:
7) Any restrictions / notes:

Thanks.`;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mailtoBtn = document.getElementById('mailtoBtn');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const copyBriefBtn = document.getElementById('copyBriefBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const yearSpan = document.getElementById('year');

// Set current year
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Theme toggle
function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☾' : '☀';
}

// Initialize theme
setTheme(getTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Mobile menu toggle
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

// Mailto link
if (mailtoBtn) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
  mailtoBtn.href = mailto;
}

// Toast notification
function showToast(message) {
  if (toastMessage) toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Copy to clipboard
async function copyToClipboard(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage || 'Copied!');
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(successMessage || 'Copied!');
  }
}

// Copy email button
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    copyToClipboard(EMAIL, 'Email copied!');
  });
}

// Copy brief button
if (copyBriefBtn) {
  copyBriefBtn.addEventListener('click', () => {
    copyToClipboard(BODY, 'Template copied!');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// Navbar shrink on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// FAQ accordion animation
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', function () {
    if (this.open) {
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== this) other.open = false;
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.feature-card, .package-card, .process-card, .guideline-card, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
