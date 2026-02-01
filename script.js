/* script.js
   Accessible mobile nav + smooth scrolling + small enhancements.
   Keeps behavior minimal and progressive.
*/
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });

    // Close mobile nav when a link is activated (improves UX)
    primaryNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth-scroll for in-page links (same-origin + hash)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // ensure keyboard focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll: true});
      }
    });
  });

  // Lightweight focus-visible polyfill: add class when keyboard navigation is detected
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});