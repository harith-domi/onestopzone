// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) navLinks.classList.remove('open');
  });
}

// Active nav link
const currentPath = (window.location.pathname.replace(/\/(index(\.html)?)?$/, '') || '/')
  .replace(/\.html$/, '');
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href').split('#')[0].replace(/\.html$/, '') || '/';
  const normalized = currentPath === '' ? '/' : currentPath;
  link.classList.toggle('active', href === normalized);
});

// Contact form submission (front-end only)
const form = document.getElementById('enquiry-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align:center;padding:48px 0">
          <div style="font-size:3rem;margin-bottom:16px">✅</div>
          <h3 style="font-size:1.4rem;font-weight:700;margin-bottom:8px;color:var(--text)">Message Sent!</h3>
          <p style="color:var(--text-muted)">Thank you for reaching out. We'll get back to you within 1 business day.</p>
        </div>`;
    }, 1200);
  });
}

// Stat count-up animation
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const countEls = document.querySelectorAll('[data-count]');
if (countEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      countObserver.unobserve(el);
      if (prefersReducedMotion) {
        el.textContent = target;
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  countEls.forEach(el => countObserver.observe(el));
}

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.service-card, .mv-card, .industry-card, .contact-info-card, .about-feature, .process-step, .testimonial-card, .stats-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
