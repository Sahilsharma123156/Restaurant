/* ─────────────────────────────────────────
   SAVEUR — Contact Page JavaScript
   Handles: form validation, submission
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  const form        = document.getElementById('reservationForm');
  const formContent = document.getElementById('formContent');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  /* ── Validation Rules ──────────────────── */
  const rules = {
    fname:  { el: 'fname',  err: 'fnameErr',  test: v => v.trim().length >= 2 },
    lname:  { el: 'lname',  err: 'lnameErr',  test: v => v.trim().length >= 2 },
    email:  { el: 'email',  err: 'emailErr',  test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    phone:  { el: 'phone',  err: 'phoneErr',  test: v => v.trim().length >= 7 },
    date:   { el: 'date',   err: 'dateErr',   test: v => v !== '' },
    time:   { el: 'time',   err: 'timeErr',   test: v => v !== '' },
    guests: { el: 'guests', err: 'guestsErr', test: v => v !== '' },
    agree:  { el: 'agree',  err: 'agreeErr',  test: (_, el) => el.checked },
  };

  /* ── Real-time validation ──────────────── */
  Object.values(rules).forEach(rule => {
    const el = document.getElementById(rule.el);
    if (!el) return;

    const evts = el.type === 'checkbox' ? ['change'] : ['blur', 'input'];
    evts.forEach(evt => {
      el.addEventListener(evt, () => validateField(rule));
    });
  });

  function validateField(rule) {
    const el  = document.getElementById(rule.el);
    const err = document.getElementById(rule.err);
    if (!el || !err) return true;

    const valid = rule.test(el.value, el);
    el.classList.toggle('error', !valid);
    err.classList.toggle('visible', !valid);
    return valid;
  }

  /* ── Form Submit ───────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.values(rules).forEach(rule => {
      if (!validateField(rule)) allValid = false;
    });

    if (!allValid) {
      // Scroll to first error
      const firstErr = form.querySelector('.error');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErr.focus();
      }
      return;
    }

    // Simulate submission — show loading state
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Confirming…';

    setTimeout(() => {
      formContent.style.display = 'none';
      formSuccess.classList.add('visible');
      window.scrollTo({ top: document.getElementById('reservation').offsetTop - 100, behavior: 'smooth' });
    }, 1200);
  });

});
