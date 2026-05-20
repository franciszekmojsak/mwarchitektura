// =============================================
// MW ARCHITEKTURA — Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // Hero Ken Burns effect
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // Mobile nav
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav  = document.querySelector('.nav__mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  }

  document.querySelectorAll('.nav__mobile-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav link
  setActiveNavLink();

  // Portfolio filter
  initProjectFilter();

  // Smooth scroll for hero rating link
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll-reveal for elements
  initScrollReveal();

});

// =============================================
// ACTIVE NAV LINK
// =============================================
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    if (linkPage === path || (path === '' && linkPage === 'index.html')) {
      link.closest('li')?.classList.add('active');
    }
  });
}

// =============================================
// PROJECT FILTER
// =============================================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tiles = document.querySelectorAll('.project-tile');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      tiles.forEach(tile => {
        if (filter === 'all' || tile.dataset.cat === filter) {
          tile.classList.remove('hidden');
        } else {
          tile.classList.add('hidden');
        }
      });
    });
  });
}

// =============================================
// SCROLL REVEAL
// =============================================
function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const els = document.querySelectorAll(
    '.service-card, .review-card, .project-tile, .blog-card, .timeline-item, .service-item, .process-step'
  );

  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}
