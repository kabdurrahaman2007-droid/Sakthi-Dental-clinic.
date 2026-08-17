// Sakthi Dental Clinic — shared interactivity

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Treatment filter chips (treatments page) ---- */
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('[data-category]');
  if (chips.length && cards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.filter;
        cards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
        });
      });
    });
  }

  /* ---- Contact / lead form validation ---- */
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');

    const validators = {
      name: v => v.trim().length >= 2 || 'Please enter your full name.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
      phone: v => /^[+]?[\d\s-]{7,15}$/.test(v.trim()) || 'Enter a valid phone number.',
    };

    const fieldEl = name => form.querySelector(`[name="${name}"]`);

    const validateField = (name) => {
      const el = fieldEl(name);
      if (!el) return true;
      el.dataset.touched = 'true';
      const wrap = el.closest('.form-field');
      const rule = validators[name];
      if (!rule) return true;
      const result = rule(el.value);
      if (result === true) {
        wrap.classList.remove('has-error');
        return true;
      } else {
        wrap.classList.add('has-error');
        const msg = wrap.querySelector('.error-msg');
        if (msg) msg.textContent = result;
        return false;
      }
    };

    ['name', 'email', 'phone'].forEach(name => {
      const el = fieldEl(name);
      if (el) el.addEventListener('blur', () => validateField(name));
      if (el) el.addEventListener('input', () => { if (el.dataset.touched === 'true') validateField(name); });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const okName = validateField('name');
      const okEmail = validateField('email');
      const okPhone = validateField('phone');

      if (okName && okEmail && okPhone) {
        status.textContent = "Thanks — your message has been received. Our team will call you back shortly.";
        status.classList.add('show', 'success');
        form.reset();
        form.querySelectorAll('.form-field').forEach(f => f.classList.remove('has-error'));
      } else {
        status.classList.remove('show', 'success');
        const firstError = form.querySelector('.has-error input, .has-error textarea');
        if (firstError) firstError.focus();
      }
    });
  }

  /* ---- Current year in footer ---- */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
