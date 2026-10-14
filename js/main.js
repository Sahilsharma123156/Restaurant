/* ─────────────────────────────────────────
   SAVEUR — Main JavaScript
   Handles: nav scroll, hamburger, scroll animations
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Nav ────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        // Only remove 'scrolled' on home page where nav starts transparent
        if (document.body.classList.contains('home-page') || 
            window.location.pathname.endsWith('index.html') || 
            window.location.pathname === '/' ||
            window.location.pathname.endsWith('/')) {
          nav.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  /* ── Hamburger Menu ────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navDrawer  = document.getElementById('navDrawer');

  if (hamburger && navDrawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = navDrawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !navDrawer.contains(e.target)) {
        navDrawer.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on drawer link click
    navDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navDrawer.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Animations ─────────────────── */
  const animEls = document.querySelectorAll('.animate');
  if (animEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  }

  /* ── Set today's date as min on date inputs ── */
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.min = today;
    if (!input.value) input.value = today;
  });

  /* ── Set default time ─────────────────── */
  const timeInput = document.querySelector('input[type="time"]');
  if (timeInput && !timeInput.value) {
    timeInput.value = '19:00';
  }

});
