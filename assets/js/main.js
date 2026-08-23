
/* Jade Wok shared interactions. Everything is front-end demo behavior. */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-menu');
  const backTop = document.querySelector('[data-back-top]');
  const cookie = document.querySelector('[data-cookie]');
  const cookieDismiss = document.querySelector('[data-cookie-dismiss]');

  const updateScrollState = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
    if (backTop) backTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
  }
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if (cookie && cookieDismiss && localStorage.getItem('jade-wok-cookie-dismissed') === 'true') cookie.classList.add('is-hidden');
  if (cookieDismiss) cookieDismiss.addEventListener('click', () => {
    localStorage.setItem('jade-wok-cookie-dismissed', 'true');
    cookie.classList.add('is-hidden');
  });

  document.querySelectorAll('[data-validate-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) { status.textContent = 'Please complete the required fields before continuing.'; status.className = 'form-status error'; }
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.dataset.originalLabel = button.innerHTML; button.innerHTML = 'Preparing demo response…'; }
    window.setTimeout(() => {
      if (status) { status.textContent = form.closest('.form-dark-grid') ? 'Thank you. Your event enquiry has been received in demo mode.' : 'Thank you. Your request has been received in demo mode.'; status.className = 'form-status success'; }
      if (button) { button.disabled = false; button.innerHTML = button.dataset.originalLabel; }
      form.reset();
    }, 550);
  }));

  document.querySelectorAll('.filter-bar').forEach(bar => {
    const buttons = bar.querySelectorAll('[data-filter]');
    const scope = bar.parentElement;
    const items = scope.querySelectorAll('[data-category]');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(item => item.classList.remove('is-active'));
      button.classList.add('is-active');
      const filter = button.dataset.filter;
      items.forEach(item => { item.hidden = filter !== 'all' && item.dataset.category !== filter; });
    }));
  });

  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    const image = lightbox.querySelector('[data-lightbox-image]');
    const caption = lightbox.querySelector('[data-lightbox-caption]');
    document.querySelectorAll('[data-gallery-item]').forEach(tile => tile.addEventListener('click', () => {
      image.src = tile.dataset.full; image.alt = tile.querySelector('img').alt; caption.textContent = tile.dataset.caption;
      lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden', 'false');
    }));
    const close = () => { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); image.src = ''; };
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click', close);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  const testimonials = [
    ['Every course felt considered without ever feeling fussy. The duck is a reason to come back; the welcome is another.', 'Amelia R.'],
    ['The dim sum arrives like a little collection of secrets. Warm, generous and genuinely memorable.', 'Daniel K.'],
    ['A beautiful room with food that has both confidence and restraint. We stayed for tea long after dessert.', 'Sofia M.']
  ];
  const quote = document.querySelector('[data-quote]');
  const author = document.querySelector('[data-author]');
  let quoteIndex = 0;
  const updateQuote = step => { quoteIndex = (quoteIndex + step + testimonials.length) % testimonials.length; if (quote) quote.textContent = testimonials[quoteIndex][0]; if (author) author.textContent = testimonials[quoteIndex][1]; };
  document.querySelector('[data-quote-prev]')?.addEventListener('click', () => updateQuote(-1));
  document.querySelector('[data-quote-next]')?.addEventListener('click', () => updateQuote(1));
});
