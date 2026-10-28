'use strict';

const menuButton = document.querySelector('.menu-toggle');
const menuLabel = document.querySelector('.menu-label');
const navigation = document.querySelector('#nav-links');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const mobile = window.matchMedia('(max-width: 767px)');

function setMenu(open, restoreFocus = false) {
  const isOpen = open && mobile.matches;
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuLabel.textContent = isOpen ? 'Fechar' : 'Menu';
  main.inert = isOpen;
  footer.inert = isOpen;
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !document.body.classList.contains('menu-open')) return;
  setMenu(false);
  // Keep keyboard focus on the selected content when the mobile links close.
  const section = document.querySelector(link.getAttribute('href'));
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (!document.body.classList.contains('menu-open')) return;
  if (event.key === 'Escape') {
    setMenu(false, true);
    return;
  }
  if (event.key !== 'Tab') return;
  const first = document.querySelector('.nav-logo');
  const last = navigation.querySelector('li:last-child a');
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

mobile.addEventListener('change', () => {
  const focusedLink = navigation.contains(document.activeElement);
  const focusedButton = document.activeElement === menuButton;
  setMenu(false, mobile.matches && focusedLink);
  if (!mobile.matches && focusedButton) document.querySelector('.nav-logo').focus();
});

// Keep the full navigation visible if JavaScript is unavailable.
document.body.classList.add('menu-ready');

if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('main > section[id]')];
  const visibleSections = new Map();
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => visibleSections.set(entry.target, entry.isIntersecting));
    const current = sections.find((section) => visibleSections.get(section));
    if (!current) return;
    links.forEach((link) => {
      if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -35% 0px', threshold: 0 });
  sections.forEach((section) => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.about-grid, .exp-item, .skills-layout, .education-layout, .contact-grid').forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('reveal', 'is-pending');
    revealObserver.observe(element);
  });
}
