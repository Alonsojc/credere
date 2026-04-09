/* ==========================================================================
   Credere - Main JS
   ========================================================================== */

(function () {
  'use strict';

  // --- Header scroll effect ---
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile menu ---
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', function () {
    const open = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll animations (Intersection Observer) ---
  var animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav__link[href="#' + id + '"]');

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // --- Contact form ---
  var form = document.getElementById('contactForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      asunto: form.asunto.value,
      mensaje: form.mensaje.value.trim(),
    };

    // Basic validation
    if (!data.nombre || !data.email || !data.asunto) {
      return;
    }

    // Show success state
    // Replace this with your API call (e.g., fetch to your FastAPI backend)
    /*
    fetch('https://api.credere.mx/v1/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(function(res) { return res.json(); })
    .then(function() { showSuccess(); })
    .catch(function() { alert('Hubo un error. Intenta de nuevo.'); });
    */

    // For now, show success immediately (replace with API call above)
    showSuccess();
  });

  function showSuccess() {
    form.innerHTML =
      '<div class="form-success">' +
      '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
      '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>' +
      '<polyline points="22 4 12 14.01 9 11.01"/>' +
      '</svg>' +
      '<h3>Mensaje enviado</h3>' +
      '<p>Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>' +
      '</div>';
  }

  // --- Smooth scroll for Safari (fallback) ---
  if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
})();
