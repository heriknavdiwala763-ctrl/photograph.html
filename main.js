/**
 * Aakar Films - Interactive Logic & Backend Simulator (JS)
 * Handles:
 * - Dynamic Gallery Filtering
 * - Fullscreen Lightbox Modal
 * - Navbar Scroll Effects & Mobile Navigation
 * - Animated Stats Counting on Scroll
 * - Booking Form Validation & Local Storage Persistence
 * - Toast Feedback System
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatsCounter();
  initPortfolioFilter();
  initLightbox();
  initBookingForm();
});

// 1. Navigation & Scroll Handling
function initNavbar() {
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

  // Smooth close on link click for mobile
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  });
}

// 2. Animated Counter for Hero Stats
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter-val');
  let started = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const stepIncrement = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepIncrement;
        if (current >= target) {
          counter.innerText = target + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        countUp();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// 3. Dynamic Portfolio Category Filtering
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
}

// 4. Fullscreen Lightbox Modal
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title').innerText;
      const tag = item.querySelector('.gallery-tag').innerText;

      lightboxImg.src = img.src;
      lightboxCaption.innerHTML = `<strong>${title}</strong> &bull; <span>${tag}</span>`;
      lightbox.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  // Close when clicked outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}

// 5. Booking Form Backend Simulation with Validation & LocalStorage
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const service = document.getElementById('shootService').value;
    const date = document.getElementById('shootDate').value;
    const message = document.getElementById('clientNotes').value.trim();

    if (!name || !phone || !service || !date) {
      showToast('કૃપા કરીને બધી વિગતો ભરો (Please fill required details)', 'error');
      return;
    }

    // Save inquiry to localStorage (Simulated Database storage)
    const newInquiry = {
      id: 'INQ_' + Date.now(),
      name,
      phone,
      service,
      date,
      message,
      createdAt: new Date().toISOString()
    };

    let existingInquiries = JSON.parse(localStorage.getItem('aakar_inquiries') || '[]');
    existingInquiries.push(newInquiry);
    localStorage.setItem('aakar_inquiries', JSON.stringify(existingInquiries));

    // Show confirmation Toast
    showToast(`આભાર ${name}! તમારું શૂટ બુકિંગ Aakar Films એ કન્ફર્મ કર્યું છે.`, 'success');

    // Reset Form
    form.reset();
  });
}

// Helper: Toast Notifications
function showToast(message, type = 'success') {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
