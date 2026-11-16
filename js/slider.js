/**
 * Module: Dynamic Dashboard Category Tabs & Multi-Slide Deck Engine
 * Handles:
 * - Switching active category panel (Wedding, Marriage, Pre-Wedding, Fashion)
 * - Independent multi-image sliding within each category
 * - Synchronized dot navigation and arrow controls
 */
export function initHeroSlider() {
  const tabButtons = document.querySelectorAll('.cat-tab-btn');
  const panels = document.querySelectorAll('.category-slide-panel');

  if (!tabButtons.length || !panels.length) return;

  // 1. Tab Switcher Logic
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-target');
      
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel-${targetCategory}`) {
          panel.classList.add('active');
          // Reset inner slide to first image when switching category
          resetPanelSlide(panel);
        }
      });
    });
  });

  // 2. Setup Slide Controls for Each Category Panel
  panels.forEach(panel => {
    setupPanelSlideControls(panel);
  });
}

function resetPanelSlide(panel) {
  const slides = panel.querySelectorAll('.cat-inner-slide');
  slides.forEach((s, idx) => {
    if (idx === 0) s.classList.add('active');
    else s.classList.remove('active');
  });
}

function setupPanelSlideControls(panel) {
  const slides = panel.querySelectorAll('.cat-inner-slide');
  if (slides.length <= 1) return;

  let currentIndex = 0;

  const showSlide = (newIndex) => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (newIndex + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');

    // Update dots in active slide
    slides.forEach(slide => {
      const dots = slide.querySelectorAll('.showcase-dot');
      dots.forEach(dot => {
        const slideIdx = +dot.getAttribute('data-slide');
        if (slideIdx === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    });
  };

  // Next / Prev button click handling inside this panel
  const nextBtns = panel.querySelectorAll('.cat-next');
  const prevBtns = panel.querySelectorAll('.cat-prev');

  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(currentIndex + 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(currentIndex - 1);
    });
  });

  // Dot Click handling
  const allDots = panel.querySelectorAll('.showcase-dot');
  allDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetIdx = +dot.getAttribute('data-slide');
      showSlide(targetIdx);
    });
  });
}
