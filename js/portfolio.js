/**
 * Module: Portfolio Dynamic Filtering & Lightbox Modal
 */
export function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

  // Lightbox Modal
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title').innerText;
      const tag = item.querySelector('.gallery-tag').innerText;

      if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<strong>${title}</strong> &bull; <span>${tag}</span>`;
        lightbox.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}
