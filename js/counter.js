/**
 * Module: Animated Stat Counter
 */
export function initCounter() {
  const counters = document.querySelectorAll('.counter-val');
  let started = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800;
      const stepTime = 25;
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
