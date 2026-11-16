/**
 * Module: Navigation, Mobile Menu & Scroll Effects
 */
export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  });
}
